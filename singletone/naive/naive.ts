enum logLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR,
}

class Logger {
  private logLevel: logLevel;
  constructor(logLevel: logLevel) {
    this.logLevel = logLevel;
  }
  shouldLog(level: logLevel): boolean {
    return level >= this.logLevel;
  }

  logDebug(message: string) {
    this.shouldLog(logLevel.DEBUG) && console.log(`DEBUG: ${message}`);
  }
  logInfo(message: string) {
    this.shouldLog(logLevel.INFO) && console.log(`INFO: ${message}`);
  }
  logWarn(message: string) {
    this.shouldLog(logLevel.WARN) && console.log(`WARN: ${message}`);
  }
  logError(message: string) {
    this.shouldLog(logLevel.ERROR) && console.log(`ERROR: ${message}`);
  }
}

const logger = new Logger(logLevel.INFO);
logger.logDebug("debug");
logger.logInfo("info");
logger.logWarn("warn");
logger.logError("error");
