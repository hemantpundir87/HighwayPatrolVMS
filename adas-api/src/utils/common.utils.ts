import os from 'os';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import logger from './logger';
import { Response } from "express";
import { ApiResponse, DbRecord } from '../models/api-response.model';

export const generateUUID = (): string => uuidv4();
export const isWindows = (): boolean => process.platform === 'win32';
export const isLinux = (): boolean => process.platform === 'linux';
export const isMac = (): boolean => process.platform === 'darwin';


export const getRootPath = (): string => {
  const envRoot = process.env.ROOT_PATH;
  if (envRoot) return path.normalize(envRoot);

  const platform = process.platform;
  let rootPath: string;

  switch (platform) {
    case 'win32':
      rootPath = 'C:\\ProjectConfig\\ADASv1';
      break;
    case 'linux':
      rootPath = '/home/ProjectConfig/ADASv1';
      break;
    case 'darwin':
      rootPath = `${os.homedir()}/ProjectConfig/ADASv1`;
      break;
    default:
      rootPath = process.cwd();
  }

  return path.normalize(rootPath);
};

export const getLogDirectory = (subDir = ''): string => {
  const root = getRootPath();
  const logsBase = path.join(root, 'logs');
  return path.normalize(subDir ? path.join(logsBase, subDir) : logsBase);
};


export const getISTDateTime = (format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffset);

  const pad = (n: number) => String(n).padStart(2, '0');

  const YYYY = istDate.getUTCFullYear();
  const MM = pad(istDate.getUTCMonth() + 1);
  const DD = pad(istDate.getUTCDate());
  const HH = pad(istDate.getUTCHours());
  const mm = pad(istDate.getUTCMinutes());
  const ss = pad(istDate.getUTCSeconds());

  return format
    .replace('YYYY', String(YYYY))
    .replace('MM', MM)
    .replace('DD', DD)
    .replace('HH', HH)
    .replace('mm', mm)
    .replace('ss', ss);
};

export const getCurrentYear = (): string => {
  return new Date().getFullYear().toString();
};

export const getSystemInfo = () => ({
  platform: os.platform(),
  hostname: os.hostname(),
  arch: os.arch(),
  uptime: os.uptime(),
  nodeVersion: process.version,
  totalMemMB: Math.round(os.totalmem() / 1024 / 1024),
  freeMemMB: Math.round(os.freemem() / 1024 / 1024),
});

export const sanitizeFilename = (name: string): string =>
  name.replace(/[<>:"/\\|?*]+/g, '_');


export const generateSetupResponse = (spName: string, dbResult: any): ApiResponse => {
  try {
    if (!dbResult || !dbResult.recordset || dbResult.recordset.length === 0) {
      logger.warn(`[${spName}] Empty or invalid DB response.`);
      return { StatusCode: 500, AlertMessage: "Invalid database response.", AlertData: [], };
    }

    const records: DbRecord[] = dbResult.recordset;

    const alertMessages: string[] = records
      .map((r) => r.AlertMessage)
      .filter((msg): msg is string => !!msg);

    const uniqueCodes: number[] = [
      ...new Set(records.map((r) => r.StatusCode).filter((c): c is number => typeof c === "number")),
    ];

    const finalStatusCode: number =
      uniqueCodes.includes(500)
        ? 500
        : uniqueCodes.includes(409)
          ? 409
          : uniqueCodes.includes(400)
            ? 400
            : uniqueCodes[0] ?? 200;

    const summaryMessage: string =
      alertMessages.length > 1
        ? "Multiple validation alerts returned from database."
        : alertMessages[0] || "Operation completed successfully.";

    return {
      StatusCode: finalStatusCode,
      AlertMessage: summaryMessage,
      AlertData: alertMessages,
    };
  } catch (err: any) {
    logger.error(`[${spName}] Error in generateSetupResponse:`, err);
    //handleErrorMessageResponse(err.message || err,res,500)
    return { StatusCode: 500, AlertMessage: "Error while processing response.", AlertData: [err.message] };
  }
};

export function handleErrorMessageResponse(errorMessage: string, res: Response, statusCode: number = 500) {
  return res.status(statusCode).json([{ AlertMessage: errorMessage || "RequestError", status: false, }]);
}

export function handleSuccessMessageResponse(alertMessage: string, res: Response) {
  return res.status(200).json([{ AlertMessage: alertMessage || "Success", status: true, }]);
}

export function handleSingleData(data: any, res: Response, statusCode: number = 204) {
  if (!data || typeof data !== 'object') {
    return res.status(statusCode).send([]);
  }
  else {
    return res.status(200).json(data);
  }

}