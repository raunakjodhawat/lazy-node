import Logger from '../../../src/console/index.js';
import { consoleConstant } from '../../../src/constants/index.js';
import { deleteFile, doesFileContain, getDateCheckRegex, getLastLine } from '../../utils/index.js';

describe('Packages:Console:functionality', () => {

  // afterAll(() => {
  //   deleteFile(consoleConstant.outputFileName);
  //   deleteFile(consoleConstant.errorOutputFileName);
  // });

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
    getLastLine("./stdout.log", (lastLineContent) => {
      expect(lastLineContent).toMatch(/\[log\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\sthis is a test message/g);
      logger.printLog("error", "this", "is", "a", "test", "message");
        getLastLine("./stderr.log", (lastLineContent) => {
          expect(lastLineContent).toMatch(/\[error\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\sthis is a test message/g);
          done();
        });
    });
    
  });

  test('printLog() => toLogInFile [default, true, false]', (done) => {
    const stdoutFunctions = ["log", "info", "debug", "trace", "error", "warn"];
    for(const functionName of stdoutFunctions) {
      const l1 = new Logger({});
      const fileName = ["log", "info", "debug"].indexOf(functionName) !== -1 ? "./stdout.log" : "./stderr.log";
      l1.printLog(`${functionName}`, `by default ${functionName} messages are added to the file`);
      doesFileContain(fileName, `by default ${functionName} messages are added to the file`, (contentPresentInFile) => {
        expect(contentPresentInFile).toBe(true);
        const l2 = new Logger({toLogInFile: {[functionName]: false}});
        l2.printLog(`${functionName}`, `logging ${functionName} messages to file, can be turned off`);
        doesFileContain(fileName, `logging ${functionName} messages to file, can be turned off`, (contentPresentInFile) => {
          expect(contentPresentInFile).toBe(false);
          const l3 = new Logger({toLogInFile: {[functionName]: true}});
          l3.printLog(`${functionName}`, `logging ${functionName} messages to file, can be turned on`);
          doesFileContain(fileName, `logging ${functionName} messages to file, can be turned on`, (contentPresentInFile) => {
            expect(contentPresentInFile).toBe(true);
          });
        });
      });
    }
    setTimeout(() => {
      done();
    }, 200);
  });

});