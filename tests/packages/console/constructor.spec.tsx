import * as fs from 'fs';
import { getLogger } from '../../../src/index';
import { consoleConstant } from '../../../src/constants/consoleConstants';
import { deleteFile, randomBoolean } from '../../utils/index';
import { functionNamesEnum } from '../../../src/console/types';

const customOutputFileName = './tests/packages/console/out.log';
const customErrorOutputFileName = './tests/packages/console/error.log';
const allLoggerFunctions = [functionNamesEnum.log, functionNamesEnum.debug, functionNamesEnum.error, functionNamesEnum.info, functionNamesEnum.table, functionNamesEnum.trace, functionNamesEnum.warn];

/**
 * This file tests all the parameters of the constructor of Console class
 */
describe('Packages:Console:Constructor', () => {
  
  afterAll((done: Function) => {
    deleteFile(consoleConstant.outputFileName);
    deleteFile(consoleConstant.errorOutputFileName);
    deleteFile(customOutputFileName);
    deleteFile(customErrorOutputFileName);

    setTimeout(() => {
      done();
    }, 500);
  });

  beforeEach((done: Function) => {
    deleteFile(consoleConstant.outputFileName);
    deleteFile(consoleConstant.errorOutputFileName);
    deleteFile(customOutputFileName);
    deleteFile(customErrorOutputFileName);
    setTimeout(() => {
      done();
    }, 1000);
  });

  test('Logger can have an object or nothing as the input', () => {
    const l1 = getLogger({});
    expect(l1.getName()).toBe("");
    const l2 = getLogger();
    expect(l2.getName()).toBe("");
  });

  test('by default logger name is empty string', () => {
    const logger = getLogger({});
    expect(logger.getName()).toBe("");
  });

  test('Logger name can be changed with options.name value as input', () => {
    const loggerName = "Custom Logger";
    const logger = getLogger({ name: loggerName });
    expect(logger.getName()).toBe(loggerName);
  });

  test('[default outputFileName & errorOutputFileName filenames]', (done: Function) => {
    // initializing & calling logger, should create new files
    const logger = getLogger({ name: 'l2' });
    logger.log("test if", "files were", "created");
    setTimeout(() => {
      expect(fs.accessSync(consoleConstant.outputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
      expect(fs.accessSync(consoleConstant.errorOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
      done();
    }, 200);

  });

  test('[Custom filenames for outputFileName & errorOutputFileName]', (done: Function) => {
    const l1 = getLogger({ name: 'l1', outputFileName: customOutputFileName, errorOutputFileName: customErrorOutputFileName });
    expect(() => {
      fs.accessSync(customOutputFileName, fs.constants.R_OK | fs.constants.W_OK);
    }).toThrow();
    expect(() => {
      fs.accessSync(customErrorOutputFileName, fs.constants.R_OK | fs.constants.W_OK);
    }).toThrow();

    l1.log("Hello, world");
    setTimeout(() => {
      expect(fs.accessSync(customOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
      expect(fs.accessSync(customErrorOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
      done();
    }, 200);
  });

  test('[default values of toLogInFile]', () => {
    const logger = getLogger({});
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getLogInFile()[functionName]).toBe(true);
    });
  });

  test('[custom values of toLogInFile]', () => {

    const customToLogInFile = {
      [functionNamesEnum.log]: randomBoolean(),
      [functionNamesEnum.error]: randomBoolean(),
      [functionNamesEnum.warn]: randomBoolean(),
      [functionNamesEnum.info]: randomBoolean(),
      [functionNamesEnum.trace]: randomBoolean(),
      [functionNamesEnum.debug]: randomBoolean(),
      [functionNamesEnum.table]: randomBoolean(),
    }

    const logger = getLogger({ logInFile: customToLogInFile });
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getLogInFile()[functionName]).toBe(customToLogInFile[functionName]);
    });
  });

  test('[default values of toDisplayInConsole]', () => {
    const logger = getLogger({});
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getDisplayToConsole()[functionName]).toBe(true);
    });
  });

  test('[custom values of toDisplayInConsole]', () => {
    const customToDisplayInConsole = {
      [functionNamesEnum.log]: randomBoolean(),
      [functionNamesEnum.error]: randomBoolean(),
      [functionNamesEnum.warn]: randomBoolean(),
      [functionNamesEnum.info]: randomBoolean(),
      [functionNamesEnum.trace]: randomBoolean(),
      [functionNamesEnum.debug]: randomBoolean(),
      [functionNamesEnum.table]: randomBoolean(),
    }

    const logger = getLogger({ displayToConsole: customToDisplayInConsole });
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getDisplayToConsole()[functionName]).toBe(customToDisplayInConsole[functionName]);
    });
  });

  test('[default values of toLogTrace]', () => {
    const logger = getLogger({});
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getLogWithTrace()[functionName]).toBe(false);
    });
  });

  test('[custom values of toLogTrace]', () => {
    const customToLogTrace = {
      [functionNamesEnum.log]: randomBoolean(),
      [functionNamesEnum.error]: randomBoolean(),
      [functionNamesEnum.warn]: randomBoolean(),
      [functionNamesEnum.info]: randomBoolean(),
      [functionNamesEnum.trace]: randomBoolean(),
      [functionNamesEnum.debug]: randomBoolean(),
      [functionNamesEnum.table]: randomBoolean(),
    }

    const logger = getLogger({ logWithTrace: customToLogTrace });
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getLogWithTrace()[functionName]).toBe(customToLogTrace[functionName]);
    });
  });

  test('[default values of appendTimeStamp]', () => {
    const logger = getLogger({});
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getAppendTimeStamp()[functionName]).toBe(true);
    });
  });

  test('[custom values of toDisplayInConsole]', () => {

    const customAppendTimeStamp = {
      [functionNamesEnum.log]: randomBoolean(),
      [functionNamesEnum.error]: randomBoolean(),
      [functionNamesEnum.warn]: randomBoolean(),
      [functionNamesEnum.info]: randomBoolean(),
      [functionNamesEnum.trace]: randomBoolean(),
      [functionNamesEnum.debug]: randomBoolean(),
      [functionNamesEnum.table]: randomBoolean(),
    }

    const logger = getLogger({ appendTimeStamp: customAppendTimeStamp });
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getAppendTimeStamp()[functionName]).toBe(customAppendTimeStamp[functionName]);
    });
  });

  test('Test Getters', () => {
    const customOptions = {
      name: 'temp',
      logInFile: {
        [functionNamesEnum.log]: randomBoolean(),
        [functionNamesEnum.error]: randomBoolean(),
        [functionNamesEnum.warn]: randomBoolean(),
        [functionNamesEnum.info]: randomBoolean(),
        [functionNamesEnum.trace]: randomBoolean(),
        [functionNamesEnum.debug]: randomBoolean(),
        [functionNamesEnum.table]: randomBoolean(),
      },
      displayToConsole: {
        [functionNamesEnum.log]: randomBoolean(),
        [functionNamesEnum.error]: randomBoolean(),
        [functionNamesEnum.warn]: randomBoolean(),
        [functionNamesEnum.info]: randomBoolean(),
        [functionNamesEnum.trace]: randomBoolean(),
        [functionNamesEnum.debug]: randomBoolean(),
        [functionNamesEnum.table]: randomBoolean(),
      },
      logWithTrace: {
        [functionNamesEnum.log]: randomBoolean(),
        [functionNamesEnum.error]: randomBoolean(),
        [functionNamesEnum.warn]: randomBoolean(),
        [functionNamesEnum.info]: randomBoolean(),
        [functionNamesEnum.trace]: randomBoolean(),
        [functionNamesEnum.debug]: randomBoolean(),
        [functionNamesEnum.table]: randomBoolean(),
      },
      appendTimeStamp: {
        [functionNamesEnum.log]: randomBoolean(),
        [functionNamesEnum.error]: randomBoolean(),
        [functionNamesEnum.warn]: randomBoolean(),
        [functionNamesEnum.info]: randomBoolean(),
        [functionNamesEnum.trace]: randomBoolean(),
        [functionNamesEnum.debug]: randomBoolean(),
        [functionNamesEnum.table]: randomBoolean(),
      },
      outputFileName: customOutputFileName,
      errorOutputFileName: customErrorOutputFileName
    }
    const logger = getLogger(customOptions);
    expect(logger.getName()).toBe("temp");
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getLogInFile()[functionName]).toBe(customOptions.logInFile[functionName]);
    });
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getDisplayToConsole()[functionName]).toBe(customOptions.displayToConsole[functionName]);
    });
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getLogWithTrace()[functionName]).toBe(customOptions.logWithTrace[functionName]);
    });
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getAppendTimeStamp()[functionName]).toBe(customOptions.appendTimeStamp[functionName]);
    });
  });

  test('test setters', () => {
    const logger = getLogger({});
    
    expect(logger.getName()).toBe("");
    logger.setName("test:logger");
    expect(logger.getName()).toBe("test:logger");

    const customValues = {
      [functionNamesEnum.log]: randomBoolean(),
      [functionNamesEnum.error]: randomBoolean(),
      [functionNamesEnum.warn]: randomBoolean(),
      [functionNamesEnum.info]: randomBoolean(),
      [functionNamesEnum.trace]: randomBoolean(),
      [functionNamesEnum.debug]: randomBoolean(),
      [functionNamesEnum.table]: randomBoolean(),
    };
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getLogInFile()[functionName]).toBe(true);
    });
    logger.setLogInFile(customValues);
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getLogInFile()[functionName]).toBe(customValues[functionName]);
    });

    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getDisplayToConsole()[functionName]).toBe(true);
    });
    logger.setDisplayToConsole(customValues);
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getDisplayToConsole()[functionName]).toBe(customValues[functionName]);
    });

    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getLogWithTrace()[functionName]).toBe(false);
    });
    logger.setLogWithTrace(customValues);
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getLogWithTrace()[functionName]).toBe(customValues[functionName]);
    });

    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getAppendTimeStamp()[functionName]).toBe(true);
    });
    logger.setAppendTimeStamp(customValues);
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.getAppendTimeStamp()[functionName]).toBe(customValues[functionName]);
    });
  });

});
