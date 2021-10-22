import * as fs from 'fs';
import * as path from 'path';
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
  
  afterAll(async() => {
    await deleteFile(consoleConstant.outputFileName);
    await deleteFile(consoleConstant.errorOutputFileName);
    await deleteFile(customOutputFileName);
    await deleteFile(customErrorOutputFileName);
  });

  beforeEach(async () => {
    await deleteFile(consoleConstant.outputFileName);
    await deleteFile(consoleConstant.errorOutputFileName);
    await deleteFile(customOutputFileName);
    await deleteFile(customErrorOutputFileName);
  });

  test('Logger can have an object or nothing as the input', () => {
    const l1 = getLogger({});
    expect(l1.name).toBe("");
    const l2 = getLogger();
    expect(l2.name).toBe("");
  });

  test('by default logger name is empty string', () => {
    const logger = getLogger({});
    expect(logger.name).toBe("");
  });

  test('Logger name can be changed with options.name value as input', () => {
    const loggerName = "Custom Logger";
    const logger = getLogger({ name: loggerName });
    expect(logger.name).toBe(loggerName);
  });

  test('[default outputFileName & errorOutputFileName filenames]', (done: Function) => {
    // initializing & calling logger, should create new files
    const logger = getLogger({ name: 'l2' });
    expect(() => {
      fs.accessSync(consoleConstant.outputFileName, fs.constants.R_OK | fs.constants.W_OK);
    }).toThrow();
    expect(() => {
      fs.accessSync(consoleConstant.errorOutputFileName, fs.constants.R_OK | fs.constants.W_OK);
    }).toThrow();
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
      expect(logger.logInFile[functionName]).toBe(true);
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
      expect(logger.logInFile[functionName]).toBe(customToLogInFile[functionName]);
    });
  });

  test('[default values of toDisplayInConsole]', () => {
    const logger = getLogger({});
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.displayToConsole[functionName]).toBe(true);
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
      expect(logger.displayToConsole[functionName]).toBe(customToDisplayInConsole[functionName]);
    });
  });

  test('[default values of toLogTrace]', () => {
    const logger = getLogger({});
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.logWithTrace[functionName]).toBe(false);
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
      expect(logger.logWithTrace[functionName]).toBe(customToLogTrace[functionName]);
    });
  });

  test('[default values of appendTimeStamp]', () => {
    const logger = getLogger({});
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.appendTimeStamp[functionName]).toBe(true);
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
      expect(logger.appendTimeStamp[functionName]).toBe(customAppendTimeStamp[functionName]);
    });
  });

});
