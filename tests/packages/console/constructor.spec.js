import * as fs from 'fs';
import Logger from '../../../src/console/index.js';
import { consoleConstant } from '../../../src/constants/index.js';
import { deleteFile, randomBoolean } from '../../utils/index.js';

const customOutputFileName = './tests/packages/console/out.log';
const customErrorOutputFileName = './tests/packages/console/error.log';
const allLoggerFunctions = ["log", "error", "debug", "info", "warn", "trace"];

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
    const logger = new Logger({});
    expect(logger.name).toBe("");
  });

  test('[Custom loggerName]', () => {
    const loggerName = "Custom Logger";
    const logger = new Logger({ name: loggerName });
    expect(logger.name).toBe(loggerName);
  });

  test('[default outputFileName & errorOutputFileName filenames]', () => {
    new Logger({ name: 'l2' });
    const nodeVersion = process.version.match(/^v(\d+\.\d+)/)[1].split(".")[0];
    if (nodeVersion !== "16") {
      expect(fs.accessSync(consoleConstant.outputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
      expect(fs.accessSync(consoleConstant.errorOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
    }
  });

  test('[Custom filenames for outputFileName & errorOutputFileName]', () => {
    new Logger({ name: 'l1', outputFileName: customOutputFileName, errorOutputFileName: customErrorOutputFileName });
    const nodeVersion = process.version.match(/^v(\d+\.\d+)/)[1].split(".")[0];
    if (nodeVersion !== "16") {
      expect(fs.accessSync(customOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
      expect(fs.accessSync(customErrorOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
      expect(() => {
        fs.accessSync('./tests/packages/console/randomFile.log', fs.constants.R_OK | fs.constants.W_OK);
      }).toThrow();
    }
  });

  test('[default values of toLogInFile]', () => {
    const logger = new Logger({});
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.toLogInFile[functionName]).toBe(true);
    });
  });

  test('[custom values of toLogInFile]', () => {

    const customToLogInFile = {
      log: randomBoolean(),
      error: randomBoolean(),
      debug: randomBoolean(),
      info: randomBoolean(),
      warn: randomBoolean(),
      trace: randomBoolean(),
    }

    const logger = new Logger({ toLogInFile: customToLogInFile });
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.toLogInFile[functionName]).toBe(customToLogInFile[functionName]);
    });
  });

  test('[default values of toDisplayInConsole]', () => {
    const logger = new Logger({});
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.toDisplayInConsole[functionName]).toBe(false);
    });
  });

  test('[custom values of toDisplayInConsole]', () => {

    const customToDisplayInConsole = {
      log: randomBoolean(),
      error: randomBoolean(),
      debug: randomBoolean(),
      info: randomBoolean(),
      warn: randomBoolean(),
      trace: randomBoolean(),
    }

    const logger = new Logger({ toDisplayInConsole: customToDisplayInConsole });
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.toDisplayInConsole[functionName]).toBe(customToDisplayInConsole[functionName]);
    });
  });

  test('[default values of toLogTrace]', () => {
    const logger = new Logger({});
    const traceLoggerFunctions = new Array(allLoggerFunctions);
    traceLoggerFunctions.pop();
    traceLoggerFunctions.forEach((functionName) => {
      expect(logger.toLogTrace[functionName]).toBe(false);
    });
  });

  test('[custom values of toLogTrace]', () => {

    const customToLogTrace = {
      log: randomBoolean(),
      error: randomBoolean(),
      debug: randomBoolean(),
      info: randomBoolean(),
      warn: randomBoolean(),
    }

    const logger = new Logger({ toLogTrace: customToLogTrace });
    const traceLoggerFunctions = new Array(allLoggerFunctions);
    traceLoggerFunctions.pop();
    traceLoggerFunctions.forEach((functionName) => {
      expect(logger.toLogTrace[functionName]).toBe(customToLogTrace[functionName]);
    });
  });

  test('[default values of appendTimeStamp]', () => {
    const logger = new Logger({});
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
    }

    const logger = new Logger({ appendTimeStamp: customAppendTimeStamp });
    allLoggerFunctions.forEach((functionName) => {
      expect(logger.appendTimeStamp[functionName]).toBe(customAppendTimeStamp[functionName]);
    });
  });

});
