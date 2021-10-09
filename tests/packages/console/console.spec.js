import * as fs from 'fs';
import Logger from '../../../src/console/index.js';
import { consoleConstant } from '../../../src/constants/index.js';
import { deleteFile } from '../../utils/index.js';

const customOutputFileName = './tests/packages/console/out.log';
const customErrorOutputFileName = './tests/packages/console/error.log';

describe('Packages:Console:Log', () => {

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
    const l4 = new Logger({ name: loggerName});
    expect(l4.name).toBe(loggerName);
  });

  test('[default outputFileName & errorOutputFileName filenames]', () => {
    new Logger({ name: 'l2' });
    expect(fs.accessSync(consoleConstant.outputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
    expect(fs.accessSync(consoleConstant.errorOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
  });

  test('[Custom filenames for outputFileName & errorOutputFileName]', () => {
    new Logger({ name: 'l1', outputFileName: customOutputFileName, errorOutputFileName: customErrorOutputFileName });
    expect(fs.accessSync(customOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
    expect(fs.accessSync(customErrorOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
    expect(() => {
      fs.accessSync('./tests/packages/console/randomFile.log', fs.constants.R_OK | fs.constants.W_OK);
    }).toThrow();
  });

  test('[default values of toLogInFile]', () => {
    new Logger({ name: 'l1', outputFileName: customOutputFileName, errorOutputFileName: customErrorOutputFileName });
    expect(fs.accessSync(customOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
    expect(fs.accessSync(customErrorOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
    expect(() => {
      fs.accessSync('./tests/packages/console/randomFile.log', fs.constants.R_OK | fs.constants.W_OK);
    }).toThrow();
  });

});
