import * as fs from 'fs';
type allLogFunctionsType = {
    log: boolean,
    error: boolean,
    debug: boolean,
    info: boolean,
    warn: boolean,
    trace: boolean,
    table: boolean
}

type loggerOptionsType = {
    name: string;
    logInFile: allLogFunctionsType;
    displayToConsole: allLogFunctionsType
    logWithTrace: allLogFunctionsType;
    appendTimeStamp: allLogFunctionsType;
    outputFileName: string;
    errorOutputFileName: string;
    output: fs.WriteStream;
    errorOutput: fs.WriteStream;
    logger: Console;
};

enum functionNamesEnum {
    log = 'log',
    error = 'error',
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    trace = 'trace',
    table = 'table'
}

export {
    loggerOptionsType,
    functionNamesEnum,
    allLogFunctionsType
};
