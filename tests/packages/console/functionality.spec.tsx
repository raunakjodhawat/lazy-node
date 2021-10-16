import { getLogger } from '../../../src/index';
import { consoleConstant } from '../../../src/constants/consoleConstants';
import { deleteFile } from '../../utils/index';

describe('Packages:Console:functionality', () => {

  afterAll(() => {
    deleteFile(consoleConstant.outputFileName);
    deleteFile(consoleConstant.errorOutputFileName);
  });

  test('logger.log()', () => {
    const logger = getLogger({});
    const message = "this is a test message";
    // expect(logger.log(message)).toMatch(/\[log\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\sthis is a test message/g);
  });

  test.skip('getMessage(), with custom timestamp values', () => {
    const logger = getLogger({appendTimeStamp: {log: true, debug: false}});
    const message = "this is a test message";
    // expect(logger.log(message)).toMatch(/\[log\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\sthis is a test message/g);
    // expect(logger.debug(message)).not.toMatch(/\[debug\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\sthis is a test message/g);
    // expect(logger.debug(message)).toBe("[debug]()\t: this is a test message");
  });

  test.skip('printLog() default values', (done) => {
    const logger = getLogger({});
    // logger.printLog("log", "this", "is", "a", "test", "message");
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