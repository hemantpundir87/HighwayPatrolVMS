import os from 'os';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import logger from './logger';

/**
 * Detects and returns platform-specific root directory.
 */
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

/**
 * Returns log directory path.
 */
export const getLogDirectory = (subDir = ''): string => {
  const root = getRootPath();                  // e.g. C:\ProjectConfig\ADASv1
  const logsBase = path.join(root, 'logs');    // e.g. C:\ProjectConfig\ADASv1\logs

  // If subDir passed (e.g. ADASAPI) → C:\ProjectConfig\ADASv1\logs\ADASAPI
  return path.normalize(subDir ? path.join(logsBase, subDir) : logsBase);
};

/**
 * Returns current IST (India Standard Time) formatted timestamp.
 */
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

/**
 * Generates a unique UUID v4 string.
 */
export const generateUUID = (): string => uuidv4();

/**
 * Standardized API response object.
 */
export const buildResponse = (statusCode: number, message: string, data: any = null) => ({
  StatusCode: statusCode,
  AlertMessage: message,
  AlertData: data,
  Timestamp: getISTDateTime(),
});

/**
 * Platform helpers.
 */
export const isWindows = (): boolean => process.platform === 'win32';
export const isLinux = (): boolean => process.platform === 'linux';
export const isMac = (): boolean => process.platform === 'darwin';

/**
 * System diagnostics snapshot.
 */
export const getSystemInfo = () => ({
  platform: os.platform(),
  hostname: os.hostname(),
  arch: os.arch(),
  uptime: os.uptime(),
  nodeVersion: process.version,
  totalMemMB: Math.round(os.totalmem() / 1024 / 1024),
  freeMemMB: Math.round(os.freemem() / 1024 / 1024),
});

/**
 * Sanitize filename to be Windows-safe.
 */
export const sanitizeFilename = (name: string): string =>
  name.replace(/[<>:"/\\|?*]+/g, '_');


export const generateResponse = (spName: string, dbResult: any) => {
  try {
    if (!dbResult || !dbResult.recordset || dbResult.recordset.length === 0) {
      logger.warn(`[${spName}] Empty or invalid DB response.`);
      return {
        StatusCode: 500,
        AlertMessage: "Invalid database response.",
        AlertData: null,
      };
    }

    const row = dbResult.recordset[0];
    const statusCode = row?.StatusCode || 200;
    const alertMessage = row?.AlertMessage || "Operation completed successfully.";
    let alertData = null;

    if (row?.AlertData) {
      try {
        alertData = JSON.parse(row.AlertData);
      } catch {
        alertData = row.AlertData;
      }
    }

    return {
      StatusCode: statusCode,
      AlertMessage: alertMessage,
      AlertData: alertData,
    };
  } catch (err: any) {
    logger.error(`[${spName}] Error in generateResponse:`, err);
    return {
      StatusCode: 500,
      AlertMessage: "Error while processing response.",
      AlertData: err.message,
    };
  }
};
