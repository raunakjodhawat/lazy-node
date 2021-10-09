import { Console } from 'console';
import * as fs from 'fs';

import { consoleConstant } from '../constants/index.js';

export default class Logger {
  constructor({
    name = '',
    toLogInFile = {
      log: true,
      error: true,
      debug: true,
      info: true,
      warn: true,
      trace: true,
    },
    toDisplayInConsole = {
      log: false,
      error: false,
      debug: false,
      info: false,
      warn: false,
      trace: false,
    },
    toLogTrace = {
      log: false,
      error: false,
      debug: false,
      info: false,
      warn: false,
    },
    appendTimeStamp = {
      log: true,
      error: true,
      debug: true,
      info: true,
      warn: true,
      trace: true,
    },
    outputFileName = consoleConstant.outputFileName,
    errorOutputFileName = consoleConstant.errorOutputFileName,
  }) {
    this.name = name;
    this.toLogInFile = toLogInFile;
    this.toDisplayInConsole = toDisplayInConsole;
    this.toLogTrace = toLogTrace;
    this.appendTimeStamp = appendTimeStamp;
    this.output = fs.createWriteStream(outputFileName, { flags: 'a+' });
    this.errorOutput = fs.createWriteStream(errorOutputFileName, { flags: 'a+' });
    this.logger = new Console({ stdout: this.output, stderr: this.errorOutput });
  }

  getMessage(functionName, message) {
    if (this.appendTimeStamp[functionName]) return `[${functionName}](${this.name}):[${(new Date()).toISOString()}]\t: ${message}`;
    return `[${functionName}](${this.name})\t: ${message}`;
  }

  printLog(functionName, ...message) {
    const printMessage = this.getMessage(functionName, message.join(' '));
    if (this.toLogInFile[functionName]) {
      if (this.toLogTrace[functionName]) {
        this.logger.trace(printMessage);
      } else {
        this.logger[functionName](printMessage);
      }
    }

    if ((this.toDisplayInConsole[functionName]) || (!this.toDisplayInConsole[functionName] && !this.toDisplayInConsole[functionName])) {
      if (this.toLogTrace[functionName]) {
        console.trace(printMessage);
      } else {
        console[functionName](printMessage);
      }
    }
  }

  log(...message) {
    this.printLog('log', ...message);
  }

  error(...message) {
    this.printLog('error', ...message);
  }

  debug(...message) {
    this.printLog('debug', ...message);
  }

  info(...message) {
    this.printLog('info', ...message);
  }

  warn(...message) {
    this.printLog('warn', ...message);
  }

  table() {
    this.printLog('table', ...message);
  }

  trace(...message) {
    const printMessage = this.getMessage(functionName, message.join(' '));
    if (this.toLogInFile[functionName]) this.logger.trace(printMessage);
    if ((this.toDisplayInConsole[functionName]) || (!this.toDisplayInConsole[functionName] && !this.toDisplayInConsole[functionName])) console.trace(printMessage);
  }
}
