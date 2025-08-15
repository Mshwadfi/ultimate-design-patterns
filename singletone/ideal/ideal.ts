enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

class Logger {
  private logLevel: LogLevel = LogLevel.DEBUG;
  private static instance: Logger;
  private constructor() {}

  private shouldLog(logLevel: LogLevel): boolean {
    return logLevel >= this.logLevel;
  }

  logDebug(message: string) {
    this.shouldLog(LogLevel.DEBUG) && console.log(`DEBUG: ${message}`);
  }
  logInfo(message: string) {
    this.shouldLog(LogLevel.INFO) && console.log(`INFO: ${message}`);
  }
  logWarn(message: string) {
    this.shouldLog(LogLevel.WARN) && console.log(`WARN: ${message}`);
  }
  logError(message: string) {
    this.shouldLog(LogLevel.ERROR) && console.log(`ERROR: ${message}`);
  }
  setLogLevel(logLevel: LogLevel) {
    this.logLevel = logLevel;
  }
  static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new Logger();
    }
    return this.instance;
  }
}

const logger = Logger.getInstance();
logger.logDebug("debug");
logger.logInfo("info");
logger.logWarn("warn");
logger.logError("error");
