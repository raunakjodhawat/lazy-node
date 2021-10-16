import Logger from '../../../src/console/index.js';
import { consoleConstant } from '../../../src/constants/index.js';
import { deleteFile, doesFileContain, getDateCheckRegex, getLastLine } from '../../utils/index.js';

describe('Packages:Console:functionality', () => {

  afterAll(() => {
    deleteFile(consoleConstant.outputFileName);
    deleteFile(consoleConstant.errorOutputFileName);
  });

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
    expect(logger.getMessage("debug", message)).toBe("[debug]()\t: this is a test message");
  });

  test('printLog() default values', (done) => {
    const logger = new Logger({});
    logger.printLog("log", "this", "is", "a", "test", "message");
    done();
    // getLastLine("./stdout.log", (lastLineContent) => {
    //   expect(lastLineContent).toMatch(/\[log\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\sthis is a test message/g);
    //   logger.printLog("error", "this", "is", "a", "test", "message");
    //     getLastLine("./stderr.log", (lastLineContent) => {
    //       expect(lastLineContent).toMatch(/\[error\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\sthis is a test message/g);
          
    //     });
    // });
    
  });

});