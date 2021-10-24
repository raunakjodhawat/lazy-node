import { getLogger } from '../../../src/index';
import { consoleConstant } from '../../../src/constants/consoleConstants';
import { deleteFile, doesFileContain } from '../../utils/index';

const builInConsoleCopy = console;
describe('Packages:Console:functionality', () => {

  afterAll((done: Function) => {
    deleteFile(consoleConstant.outputFileName);
    deleteFile(consoleConstant.errorOutputFileName);

    setTimeout(() => {
      done();
    }, 500);
  });

  beforeAll(() => {
    jest.spyOn(global.console, 'trace');
  });

  beforeEach((done: Function) => {
    deleteFile(consoleConstant.outputFileName);
    deleteFile(consoleConstant.errorOutputFileName);
    console = builInConsoleCopy;
    setTimeout(() => {
      done();
    }, 500);
  });

  test('logger.log()', () => {
    const logger = getLogger({});
    const message = "this is a test message";
    const logs: string[] = [];
    console.log = (message: string) => logs.push(message);
    logger.log(message);
    expect(logs[0]).toMatch(/\[log\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // remove timestamp
    logger.setAppendTimeStamp({log: false});
    logger.log(message);
    expect(logs[1]).toMatch(/\[log\]\(\)\s+:\s+this is a test message/g);

    // add timestamp
    logger.setAppendTimeStamp({log: true});
    logger.log(message);
    expect(logs[2]).toMatch(/\[log\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // with trace prints the trace to stack
    logger.setLogWithTrace({log: true});
    logger.log(message);
    expect(console.trace).toBeCalledTimes(1);

    // remove trace
    logger.setLogWithTrace({log: false});
    logger.log(message);
    expect(console.trace).toBeCalledTimes(1);

    // when not logging into file and not logging to console, should add the logs to console
    logger.setLogInFile({log: false});
    logger.setDisplayToConsole({log: false});
    logger.log(message);
    expect(logs[3]).toMatch(/\[log\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);
  });

  test('logger.error()', () => {
    const logger = getLogger({});
    const message = "this is a test message";
    const logs: string[] = [];
    console.error = (message: string) => logs.push(message);
    // console.trace = (message: string) => logs.push(message);
    logger.error(message);
    expect(logs[0]).toMatch(/\[error\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // remove timestamp
    logger.setAppendTimeStamp({error: false});
    logger.error(message);
    expect(logs[1]).toMatch(/\[error\]\(\)\s+:\s+this is a test message/g);

    // add timestamp
    logger.setAppendTimeStamp({error: true});
    logger.error(message);
    expect(logs[2]).toMatch(/\[error\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // with trace prints the trace to stack
    logger.setLogWithTrace({error: true});
    logger.error(message);
    expect(console.trace).toBeCalledTimes(2);

    // remove trace
    logger.setLogWithTrace({error: false});
    logger.error(message);
    expect(console.trace).toBeCalledTimes(2);

    // when not logging into file and not logging to console, should add the logs to console
    logger.setLogInFile({error: false});
    logger.setDisplayToConsole({error: false});
    logger.error(message);
    expect(logs[3]).toMatch(/\[error\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);
  });

});