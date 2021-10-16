import Logger from './console/console';
import { loggerOptionsType } from './console/types';
import { consoleConstant } from './constants/consoleConstants';


const getLogger = (options: loggerOptionsType) => {
  return new Logger({
    name: (options && options.name) ? options.name : consoleConstant.fileName,
    logInFile: {
        log: (options && options.logInFile && options.logInFile.log !== undefined)? options.logInFile.log: true,
        warn: (options && options.logInFile && options.logInFile.warn !== undefined)? options.logInFile.warn: true,
        error: (options && options.logInFile && options.logInFile.error !== undefined)? options.logInFile.error: true,
        debug: (options && options.logInFile && options.logInFile.debug !== undefined)? options.logInFile.debug: true,
        info: (options && options.logInFile && options.logInFile.info !== undefined)? options.logInFile.info: true,
        trace: (options && options.logInFile && options.logInFile.trace !== undefined)? options.logInFile.trace: true,
        table: (options && options.logInFile && options.logInFile.table !== undefined)? options.logInFile.table: true,
    },
    displayToConsole: {
      log: (options && options.displayToConsole && options.displayToConsole.log !== undefined)? options.displayToConsole.log: true,
      warn: (options && options.displayToConsole && options.displayToConsole.warn !== undefined)? options.displayToConsole.warn: true,
      error: (options && options.displayToConsole && options.displayToConsole.error !== undefined)? options.displayToConsole.error: true,
      debug: (options && options.displayToConsole && options.displayToConsole.debug !== undefined)? options.displayToConsole.debug: true,
      info: (options && options.displayToConsole && options.displayToConsole.info !== undefined)? options.displayToConsole.info: true,
      trace: (options && options.displayToConsole && options.displayToConsole.trace !== undefined)? options.displayToConsole.trace: true,
      table: (options && options.displayToConsole && options.displayToConsole.table !== undefined)? options.displayToConsole.table: true,
    },
    logWithTrace: {
      log: (options && options.logWithTrace && options.logWithTrace.log !== undefined)? options.logWithTrace.log: false,
      warn: (options && options.logWithTrace && options.logWithTrace.warn !== undefined)? options.logWithTrace.warn: false,
      error: (options && options.logWithTrace && options.logWithTrace.error !== undefined)? options.logWithTrace.error: false,
      debug: (options && options.logWithTrace && options.logWithTrace.debug !== undefined)? options.logWithTrace.debug: false,
      info: (options && options.logWithTrace && options.logWithTrace.info !== undefined)? options.logWithTrace.info: false,
      trace: (options && options.logWithTrace && options.logWithTrace.trace !== undefined)? options.logWithTrace.trace: false,
      table: (options && options.logWithTrace && options.logWithTrace.table !== undefined)? options.logWithTrace.table: false,
    },
    appendTimeStamp: {
      log: (options && options.appendTimeStamp && options.appendTimeStamp.log !== undefined)? options.appendTimeStamp.log: true,
      warn: (options && options.appendTimeStamp && options.appendTimeStamp.warn !== undefined)? options.appendTimeStamp.warn: true,
      error: (options && options.appendTimeStamp && options.appendTimeStamp.error !== undefined)? options.appendTimeStamp.error: true,
      debug: (options && options.appendTimeStamp && options.appendTimeStamp.debug !== undefined)? options.appendTimeStamp.debug: true,
      info: (options && options.appendTimeStamp && options.appendTimeStamp.info !== undefined)? options.appendTimeStamp.info: true,
      trace: (options && options.appendTimeStamp && options.appendTimeStamp.trace !== undefined)? options.appendTimeStamp.trace: true,
      table: (options && options.appendTimeStamp && options.appendTimeStamp.table !== undefined)? options.appendTimeStamp.table: true,
    },
    outputFileName: (options && options.outputFileName) ? options.outputFileName : consoleConstant.outputFileName,
    errorOutputFileName: (options && options.errorOutputFileName) ? options.errorOutputFileName : consoleConstant.errorOutputFileName
  });
}

export {
  getLogger,
};
