import * as fs from 'fs';
import Logger from '../../../src/console/index.js';
import { consoleConstant } from '../../../src/constants/index.js';
import { deleteFile, getDateCheckRegex } from '../../utils/index.js';

describe('Packages:Console:functionality', () => {

  test('getMessage(), with default timestamp values', () => {
    const logger = new Logger({});
    const functionName = "log";
    const message = "this is a test message";
    expect(logger.getMessage(functionName, message)).toMatch(/\[log\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\sthis is a test message/g);
  });

  test('getMessage(), with custom timestamp values', () => {
    const logger = new Logger({appendTimeStamp: {log: true, debug: false}});
    const message = "this is a test message";
    expect(logger.getMessage("log", message)).toMatch(/\[log\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\sthis is a test message/g);
    expect(logger.getMessage("debug", message)).not.toMatch(/\[log\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\sthis is a test message/g);
  });

});