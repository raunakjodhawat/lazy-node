import { Console } from 'console';
import * as fs from 'fs';

import { functionNamesEnum, minRequiredLoggerOptionsType, allLogFunctionsType } from './types';

export default class Logger {
    name: string;
    logInFile: allLogFunctionsType;
    displayToConsole: allLogFunctionsType
    logWithTrace: allLogFunctionsType;
    appendTimeStamp: allLogFunctionsType;
    output: fs.WriteStream;
    errorOutput: fs.WriteStream;
    logger: Console;

    constructor(options: minRequiredLoggerOptionsType) {
        this.name = options.name;
        this.logInFile = options.logInFile;
        this.displayToConsole = options.displayToConsole;
        this.logWithTrace = options.logWithTrace;
        this.appendTimeStamp = options.appendTimeStamp;
        this.output = fs.createWriteStream(options.outputFileName, { flags: 'a+' });
        this.errorOutput = fs.createWriteStream(options.errorOutputFileName, { flags: 'a+' });
        this.logger = new Console({ stdout: this.output, stderr: this.errorOutput });
    }

    protected getMessage(functionName: functionNamesEnum, message: any[]): string {
        if (this.appendTimeStamp[functionName]) return `[${functionName}](${this.name}):[${(new Date()).toISOString()}]\t: ${message}`;
        return `[${functionName}](${this.name})\t: ${message}`;
    }

    protected printLog(functionName: functionNamesEnum, ...message: any[]): void {
        const printMessage = this.getMessage(functionName, message.reduce((acc, curr) => `${acc} ${curr}`, ' '));
        if (this.logInFile[functionName]) {
            if (this.logWithTrace[functionName]) {
                this.logger.trace(printMessage);
            } else {
                this.logger[functionName](printMessage);
            }
        }

        if ((this.displayToConsole[functionName]) || (!this.displayToConsole[functionName] && !this.logInFile[functionName])) {
            if (this.logWithTrace[functionName]) {
                console.trace(printMessage);
            } else {
                console[functionName](printMessage);
            }
        }
    }

    log(...message: any[]) {
        this.printLog(functionNamesEnum.log, ...message);
    }

    error(...message: any[]) {
        this.printLog(functionNamesEnum.error, ...message);
    }

    debug(...message: any[]) {
        this.printLog(functionNamesEnum.debug, ...message);
    }

    info(...message: any[]) {
        this.printLog(functionNamesEnum.info, ...message);
    }

    warn(...message: any[]) {
        this.printLog(functionNamesEnum.warn, ...message);
    }

    table(...message: any[]) {
        this.printLog(functionNamesEnum.table, ...message);
    }

    trace(...message: any[]) {
        this.printLog(functionNamesEnum.trace, ...message);
    }
}
