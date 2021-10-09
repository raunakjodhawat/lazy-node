import { Console } from 'console';
import * as fs from 'fs';

export default class Logger {
    constructor(name, toLogInFile = true, toDisplayInConsole = false, outputFileName, errorOutputFileName) {
        this.toLogInFile = toLogInFile;
        this.toDisplayInConsole = toDisplayInConsole;
        this.output = fs.createWriteStream(outputFileName ? outputFileName : './stdout.log', {flags:'a+'});
        this.errorOutput = fs.createWriteStream(errorOutputFileName ? errorOutputFileName : './stderr.log', {flags:'a+'});
        this.logger = new Console({ stdout: this.output, stderr: this.errorOutput });
        this.name = name ? name : "";
    }

    getMessage(prefix, message) {
        return `[${prefix}](${this.name}):[${(new Date()).toISOString()}]\t: ${message}`;
    }
    log(message, toLogInFile = this.toLogInFile, toDisplayInConsole = this.toDisplayInConsole, withtrace = false) {
        const printMessage = this.getMessage("log", message);
        if(toLogInFile)
            this.logger.log(this.getMessage("log", message));
        if(toDisplayInConsole)
            console.log(printMessage);
    }

    error(errorMessage, toLogInFile = this.toLogInFile, toDisplayInConsole = this.toDisplayInConsole) {
        const printMessage = this.getMessage("error", errorMessage.stack ? errorMessage.stack : errorMessage);
        if(toLogInFile)
            this.logger.error(this.getMessage("error", errorMessage.stack ? errorMessage.stack : errorMessage));
        if(toDisplayInConsole)
            console.error(printMessage);
    }

    debug(message, toLogInFile = this.toLogInFile, toDisplayInConsole = this.toDisplayInConsole) {
        const printMessage = this.getMessage("debug", message);
        if(toLogInFile)
            this.logger.debug(this.getMessage("debug", message));
        if(toDisplayInConsole)
            console.debug(printMessage);
    }

    info(message, toLogInFile = this.toLogInFile, toDisplayInConsole = this.toDisplayInConsole) {
        const printMessage = this.getMessage("info", message);
        if(toLogInFile)
            this.logger.info(printMessage);
        if(toDisplayInConsole)
            console.info(printMessage);
    }

    // Support for multi-message
    warn (message, toLogInFile = this.toLogInFile, toDisplayInConsole = this.toDisplayInConsole) {
        const printMessage = this.getMessage("warn", message);
        if(toLogInFile)
            this.logger.warn(printMessage);
        if(toDisplayInConsole)
            console.warn(printMessage);
    }
    // withtrace
    table() {

    }

    assert() {

    }

}