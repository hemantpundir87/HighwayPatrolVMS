import os from 'os';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import logger from './logger';
import { Response } from "express";

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
      rootPath = '/Users/ProjectConfig/ADASv1';
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


// export const generateSetupResponse = (spName: string, dbResult: any,res: Response): ApiResponse => {
//   try {
//     const records = Array.isArray(dbResult?.recordset)
//       ? dbResult.recordset
//       : Array.isArray(dbResult)
//         ? dbResult
//         : [];

//     if (!records.length) {
//       logger.warn(`[${spName}] Empty or invalid DB response.`);
//       return { StatusCode: 500, AlertMessage: 'Invalid database response.', AlertData: [] };
//     }

//     const first = records[0];

//     const alertMessages = records
//       .map((r: { AlertMessage?: string }) => r.AlertMessage)
//       .filter((msg: any): msg is string => !!msg);

//     const uniqueCodes = [
//       ...new Set(
//         records
//           .map((r: { StatusCode?: number }) => r.StatusCode)
//           .filter((c: any): c is number => typeof c === 'number')
//       ),
//     ];

//     const finalStatusCode = Number(
//       uniqueCodes.includes(500)
//         ? 500
//         : uniqueCodes.includes(409)
//         ? 409
//         : uniqueCodes.includes(400)
//         ? 400
//         : uniqueCodes[0] ?? 200
//     );

//     // ✅ Combine multiple 409 messages nicely
//     const summaryMessage =
//       alertMessages.length > 1
//         ? alertMessages.join(' | ')
//         : alertMessages[0] || 'Operation completed successfully.';

//     // ✅ Parse JSON AlertData (only once)
//     let alertData: any = [];
//     try {
//       alertData = first.AlertData ? JSON.parse(first.AlertData) : [];
//     } catch {
//       alertData = first.AlertData || [];
//     }

//     return res.status(finalStatusCode).json([{ AlertMessage: summaryMessage || "Success", status: true, }]);

//     // return {
//     //   StatusCode: finalStatusCode,
//     //   AlertMessage: summaryMessage,
//     //   AlertData: alertData,
//     // };
//   } catch (err: any) {
//     logger.error(`[${spName}] Error in generateSetupResponse:`, err);
//     handleErrorMessageResponse(err, res, 500);

//   }
// };

export const generateSetupResponse = (
  spName: string,
  dbResult: any,
  res: Response
): void => {
  try {
    const records = Array.isArray(dbResult?.recordset)
      ? dbResult.recordset
      : Array.isArray(dbResult)
        ? dbResult
        : [];

    if (!records.length) {
      logger.warn(`[${spName}] Empty or invalid DB response.`);
      res.status(500).json([{ AlertMessage: 'Invalid database response.', status: false }]);
      return;
    }

    const first = records[0];
    const alertMessages = records
      .map((r: { AlertMessage?: string }) => r.AlertMessage)
      .filter((msg: any): msg is string => !!msg);

    const uniqueCodes = [
      ...new Set(
        records
          .map((r: { StatusCode?: number }) => r.StatusCode)
          .filter((c: any): c is number => typeof c === 'number')
      ),
    ];

    const finalStatusCode: number = Number(
      uniqueCodes.includes(500)
        ? 500
        : uniqueCodes.includes(409)
          ? 409
          : uniqueCodes.includes(400)
            ? 400
            : uniqueCodes.length > 0
              ? uniqueCodes[0]
              : 200
    );


    const summaryMessage =
      alertMessages.length > 1
        ? alertMessages.join(' | ')
        : alertMessages[0] || 'Operation completed successfully.';

    res.status(finalStatusCode).json([
      { AlertMessage: summaryMessage, status: finalStatusCode < 400 },
    ]);
  } catch (err: any) {
    logger.error(`[${spName}] Error in generateSetupResponse:`, err);
    handleErrorMessageResponse(err, res, 500);
  }
};


export function handleErrorMessageResponse(errorMessage: string, res: Response, statusCode: number = 500) {
  return res.status(statusCode).json([{ AlertMessage: errorMessage || "RequestError", status: false, }]);
}

export function handleSuccessMessageResponse(alertMessage: string, res: Response) {
  return res.status(200).json([{ AlertMessage: alertMessage || "Success", status: true, }]);
}

function manage_datastatus(data: any) {
  return data.map((item: { DataStatus: any; }) => {
    let DataStatusName = '';
    switch (item.DataStatus) {
      case 1:
        DataStatusName = 'Active';
        break;
      case 0:
        DataStatusName = 'Deleted';
        break;
      default:
        DataStatusName = 'Inactive';
        break;
    }
    return {
      ...item,
      DataStatusName
    };
  });
}

export function handleDatalist(result: any, res: Response) {
  if (result && result.length > 0) {
    let data = result;
    if (Array.isArray(data)) {
      data = manage_datastatus(data);
    }
    return res.status(200).json(data);
  } else {
    return res.status(204).send();
  }
}

export function handleSingleData(data: any, res: Response, statusCode: number = 204) {
  if (!data || typeof data !== 'object') {
    return res.status(statusCode).send([]);
  }
  else {
    return res.status(200).json(data);
  }

}