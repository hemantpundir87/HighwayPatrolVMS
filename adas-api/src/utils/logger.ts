import fs from 'fs';
import path from 'path';
import winston, { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';
import { getLogDirectory, getISTDateTime, sanitizeFilename } from './common.utils';

dotenv.config();

const { combine, timestamp, printf, colorize } = format;

// ----------------------------------------------------
// ✅ Configurable Constants
// ----------------------------------------------------
const MODULE_NAME = process.env.APP_MODULE || 'ADASAPI';
const MAX_FILE_SIZE_MB = Number(process.env.LOG_MAX_MB || 20);
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// Base directory: e.g. C:\ProjectConfig\ADASv1\logs\ADASAPI
const baseLogDir: string = getLogDirectory(MODULE_NAME);

// ----------------------------------------------------
// ✅ Directory Helpers
// ----------------------------------------------------
function ensureTodayDir(basePath: string): string {
  const today = getISTDateTime('YYYY-MM-DD'); // safe folder name (no time)
  const todayDir = path.join(basePath, today);

  try {
    if (!fs.existsSync(todayDir)) {
      fs.mkdirSync(todayDir, { recursive: true });
    }
  } catch (err) {
    console.error(`[Logger] Failed to create directory: ${todayDir}`, err);
  }

  return todayDir;
}

function getLogFilePath(): string {
  const dir = ensureTodayDir(baseLogDir);
  return path.join(dir, 'api.log');
}

// ✅ Rotate file if exceeds limit
function rotateIfNeeded(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size >= MAX_FILE_SIZE_BYTES) {
        const timeStamp = sanitizeFilename(getISTDateTime('YYYY-MM-DD_HH-mm-ss'));
        const newName = filePath.replace(/\.log$/, `_${timeStamp}.log`);
        fs.renameSync(filePath, newName);
      }
    }
  } catch (err) {
    console.error('[Logger] File rotation failed:', err);
  }
}

// ----------------------------------------------------
// ✅ Log Format
// ----------------------------------------------------
const logFormat = printf((info: winston.Logform.TransformableInfo & { timestamp?: string }) => {
  const { level, message, timestamp } = info;
  return `${timestamp ?? ''} [${level.toUpperCase()}] ${message}`;
});

// ----------------------------------------------------
// ✅ Initialize Log File
// ----------------------------------------------------
const logFilePath = getLogFilePath();
rotateIfNeeded(logFilePath);

// ----------------------------------------------------
// ✅ File Transport
// ----------------------------------------------------
const fileTransport = new transports.File({
  filename: logFilePath,
  level: 'debug',
});

// ----------------------------------------------------
// ✅ Logger Class
// ----------------------------------------------------
class Logger {
  private loggerInstance: winston.Logger;
  private logFile: string;

  constructor() {
    this.logFile = logFilePath;

    this.loggerInstance = createLogger({
      level: 'debug',
      format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
      transports: [
        new transports.Console({
          format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), logFormat),
        }),
        fileTransport,
      ],
    });

    // Periodically check file size for rotation
    setInterval(() => {
      rotateIfNeeded(this.logFile);
    }, 60 * 1000); // every 1 minute
  }

  info(message: string, ...args: any[]) {
    this.write('info', message, args);
  }

  warn(message: string, ...args: any[]) {
    this.write('warn', message, args);
  }

  error(message: string, ...args: any[]) {
    this.write('error', message, args);
  }

  debug(message: string, ...args: any[]) {
    this.write('debug', message, args);
  }

  private write(level: string, message: string, args: any[]) {
    const extra = args.length ? JSON.stringify(args) : '';
    this.loggerInstance.log(level, `${message} ${extra}`);
  }
}

// ✅ Export Singleton
export const logger = new Logger();
export default logger;
