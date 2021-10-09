import * as fs from 'fs';
import Logger from '../../../src/console/index.js';
import { consoleConstant } from '../../../src/constants/index.js';

describe('Packages:Console:Log', () => {
  let logger;
  beforeAll(() => {
    logger = new Logger({ name: 'hello' });
  });
  test('[Custom filenames for outputFileName & errorOutputFileName]', () => {
    const outputFileName = './tests/packages/console/out.log';
    const errorOutputFileName = './tests/packages/console/error.log';

    new Logger({ name: 'l1', outputFileName, errorOutputFileName });
    expect(fs.accessSync(outputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
    expect(fs.accessSync(errorOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
    expect(() => {
      fs.accessSync('./tests/packages/console/randomFile.log', fs.constants.R_OK | fs.constants.W_OK);
    }).toThrow();
  });

  test('[default outputFileName & errorOutputFileName filenames]', () => {
    new Logger({ name: 'l2' });
    expect(fs.accessSync(consoleConstant.outputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
    expect(fs.accessSync(consoleConstant.errorOutputFileName, fs.constants.R_OK | fs.constants.W_OK)).toBe(undefined);
  });
});
