import { ExpendRecursivelyTypeFunction } from '../types';

type minAllLogFunctionsType = {
    log: boolean,
    error: boolean,
    debug: boolean,
    info: boolean,
    warn: boolean,
    trace: boolean,
    table: boolean
}

type minLoggerOptionsType = {
    name: string;
    logInFile: allLogFunctionsType;
    displayToConsole: allLogFunctionsType
    logWithTrace: allLogFunctionsType;
    appendTimeStamp: allLogFunctionsType;
    outputFileName: string;
    errorOutputFileName: string;
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


type allLogFunctionsType = ExpendRecursivelyTypeFunction<minAllLogFunctionsType>
type loggerOptionsType = ExpendRecursivelyTypeFunction<minLoggerOptionsType>

export {
    loggerOptionsType,
    functionNamesEnum,
    allLogFunctionsType
};
