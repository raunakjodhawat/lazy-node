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

  afterAll(() => {
    deleteFile(consoleConstant.outputFileName);
    deleteFile(consoleConstant.errorOutputFileName);
    deleteFile(customOutputFileName);
    deleteFile(customErrorOutputFileName);
  });

  test('[default loggerName]', () => {
    const logger = getLogger({});
    expect(logger.name).toBe("");
  });

  test('[Custom loggerName]', () => {
    const loggerName = "Custom Logger";
    const logger = getLogger({ name: loggerName });
    expect(logger.name).toBe(loggerName);
  });

  test('[default outputFileName & errorOutputFileName filenames]', () => {
    getLogger({ name: 'l2' });
    const nodeVersion = process.version.match(/^v(\d+\.\d+)/)![1].split(".")[0];
    if (nodeVersion !== "16") {
      expect(fs.accessSync(consoleConstant.outputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
      expect(fs.accessSync(consoleConstant.errorOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
    }
  });

  test('[Custom filenames for outputFileName & errorOutputFileName]', () => {
    getLogger({ name: 'l1', outputFileName: customOutputFileName, errorOutputFileName: customErrorOutputFileName });
    const nodeVersion = process.version.match(/^v(\d+\.\d+)/)![1].split(".")[0];
    if (nodeVersion !== "16") {
      expect(fs.accessSync(customOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
      expect(fs.accessSync(customErrorOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
      expect(() => {
        fs.accessSync('./tests/packages/console/randomFile.log', fs.constants.R_OK | fs.constants.W_OK);
      }).toThrow();
    }
  });

  test('[default values of toLogInFile]', () => {
    const logger =getLogger({});
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
      log: randomBoolean(),
      error: randomBoolean(),
      debug: randomBoolean(),
      info: randomBoolean(),
      warn: randomBoolean(),
      trace: randomBoolean(),
      table: randomBoolean()
    }

    const logger = getLogger({ appendTimeStamp: customAppendTimeStamp });
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.appendTimeStamp[functionName]).toBe(customAppendTimeStamp[functionName]);
    });
  });

});
