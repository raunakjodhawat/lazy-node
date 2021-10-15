import { Console } from 'console';
import * as fs from 'fs';

import { consoleConstant } from '../constants/consoleConstants';
import { functionNamesEnum, loggerOptionsType, allLogFunctionsType } from './types';

export default class Logger {
    name: string;
    logInFile: allLogFunctionsType;
    displayToConsole: allLogFunctionsType
    logWithTrace: allLogFunctionsType;
    appendTimeStamp: allLogFunctionsType;
    output: fs.WriteStream;
    errorOutput: fs.WriteStream;
    logger: Console;

    constructor({
        name = consoleConstant.fileName,
        logInFile = {
            log: true,
            warn: true,
            error: true,
            debug: true,
            info: false,
            trace: false,
            table: false,
        },
        displayToConsole = {
            log: true,
            warn: true,
            error: true,
            debug: true,
            info: true,
            trace: true,
            table: true,
        },
        logWithTrace = {
            log: false,
            error: false,
            debug: true,
            info: false,
            warn: false,
            trace: true,
            table: false
        },
        appendTimeStamp = {
            log: true,
            error: true,
            debug: true,
            info: true,
            warn: true,
            trace: true,
            table: false
        },
        outputFileName = consoleConstant.outputFileName,
        errorOutputFileName = consoleConstant.errorOutputFileName,
    }: loggerOptionsType) {
        this.name = name;
        this.logInFile = logInFile;
        this.displayToConsole = displayToConsole;
        this.logWithTrace = logWithTrace;
        this.appendTimeStamp = appendTimeStamp;
        this.output = fs.createWriteStream(outputFileName, { flags: 'a+' });
        this.errorOutput = fs.createWriteStream(errorOutputFileName, { flags: 'a+' });
        this.logger = new Console({ stdout: this.output, stderr: this.errorOutput });
    }

    getMessage(functionName: functionNamesEnum, message: any[]) {
        if (this.appendTimeStamp[functionName]) return `[${functionName}](${this.name}):[${(new Date()).toISOString()}]\t: ${message}`;
        return `[${functionName}](${this.name})\t: ${message}`;
    }

    printLog(functionName: functionNamesEnum, ...message: any[]) {
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
