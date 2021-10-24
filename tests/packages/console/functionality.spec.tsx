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

  test('logger.log()', (done) => {
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

    logger.setLogInFile({log: true});
    logger.log(message);
    setTimeout(() => {
      // test if log get added to the file
      doesFileContain(consoleConstant.outputFileName, logs[4], (response: Boolean) => {
        expect(response).toBe(true);
        done();
      });
    }, 500);
  });

  test('logger.error()', (done) => {
    const logger = getLogger({});
    const message = "this is a test message";
    const logs: string[] = [];
    console.error = (message: string) => logs.push(message);

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

    logger.setLogInFile({error: true});
    logger.error(message);
    setTimeout(() => {
      // test if log get added to the file
      doesFileContain(consoleConstant.errorOutputFileName, logs[4], (response: Boolean) => {
        expect(response).toBe(true);
        done();
      });
    }, 500);
  });

  test.skip('logger.warn()', () => {
    const logger = getLogger({});
    const message = "this is a test message";
    const logs: string[] = [];
    console.warn = (message: string) => logs.push(message);

    logger.warn(message);
    expect(logs[0]).toMatch(/\[warn\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // remove timestamp
    logger.setAppendTimeStamp({warn: false});
    logger.warn(message);
    expect(logs[1]).toMatch(/\[warn\]\(\)\s+:\s+this is a test message/g);

    // add timestamp
    logger.setAppendTimeStamp({warn: true});
    logger.warn(message);
    expect(logs[2]).toMatch(/\[warn\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // with trace prints the trace to stack
    logger.setLogWithTrace({warn: true});
    logger.warn(message);
    expect(console.trace).toBeCalledTimes(3);

    // remove trace
    logger.setLogWithTrace({warn: false});
    logger.warn(message);
    expect(console.trace).toBeCalledTimes(3);

    // when not logging into file and not logging to console, should add the logs to console
    logger.setLogInFile({warn: false});
    logger.setDisplayToConsole({warn: false});
    logger.warn(message);
    expect(logs[3]).toMatch(/\[warn\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);
  });

  test.skip('logger.table()', () => {
    const logger = getLogger({});
    const message = "this is a test message";
    const logs: string[] = [];
    console.table = (message: string) => logs.push(message);

    logger.table(message);
    expect(logs[0]).toMatch(/\[table\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // remove timestamp
    logger.setAppendTimeStamp({table: false});
    logger.table(message);
    expect(logs[1]).toMatch(/\[table\]\(\)\s+:\s+this is a test message/g);

    // add timestamp
    logger.setAppendTimeStamp({table: true});
    logger.table(message);
    expect(logs[2]).toMatch(/\[table\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // with trace prints the trace to stack
    logger.setLogWithTrace({table: true});
    logger.table(message);
    expect(console.trace).toBeCalledTimes(4);

    // remove trace
    logger.setLogWithTrace({error: false});
    logger.table(message);
    expect(console.trace).toBeCalledTimes(4);

    // when not logging into file and not logging to console, should add the logs to console
    logger.setLogInFile({table: false});
    logger.setDisplayToConsole({table: false});
    logger.table(message);
    expect(logs[3]).toMatch(/\[table\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);
  });

  test.skip('logger.trace()', () => {
    const logger = getLogger({});
    const message = "this is a test message";
    const logs: string[] = [];
    console.error = (message: string) => logs.push(message);

    logger.trace(message);
    expect(logs[0]).toMatch(/\[trace\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // remove timestamp
    logger.setAppendTimeStamp({trace: false});
    logger.trace(message);
    expect(logs[1]).toMatch(/\[trace\]\(\)\s+:\s+this is a test message/g);

    // add timestamp
    logger.setAppendTimeStamp({trace: true});
    logger.trace(message);
    expect(logs[2]).toMatch(/\[trace\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // with trace prints the trace to stack
    logger.setLogWithTrace({trace: true});
    logger.trace(message);
    expect(console.trace).toBeCalledTimes(8);

    // remove trace
    logger.setLogWithTrace({trace: false});
    logger.trace(message);
    expect(console.trace).toBeCalledTimes(9);

    // when not logging into file and not logging to console, should add the logs to console
    logger.setLogInFile({trace: false});
    logger.setDisplayToConsole({trace: false});
    logger.trace(message);
    expect(logs[3]).toMatch(/\[trace\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);
  });

  test.skip('logger.debug()', () => {
    const logger = getLogger({});
    const message = "this is a test message";
    const logs: string[] = [];
    console.debug = (message: string) => logs.push(message);

    logger.debug(message);
    expect(logs[0]).toMatch(/\[debug\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // remove timestamp
    logger.setAppendTimeStamp({debug: false});
    logger.debug(message);
    expect(logs[1]).toMatch(/\[debug\]\(\)\s+:\s+this is a test message/g);

    // add timestamp
    logger.setAppendTimeStamp({debug: true});
    logger.debug(message);
    expect(logs[2]).toMatch(/\[debug\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // with trace prints the trace to stack
    logger.setLogWithTrace({debug: true});
    logger.debug(message);
    expect(console.trace).toBeCalledTimes(11);

    // remove trace
    logger.setLogWithTrace({debug: false});
    logger.debug(message);
    expect(console.trace).toBeCalledTimes(11);

    // when not logging into file and not logging to console, should add the logs to console
    logger.setLogInFile({debug: false});
    logger.setDisplayToConsole({debug: false});
    logger.debug(message);
    expect(logs[3]).toMatch(/\[debug\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);
  });

  test.skip('logger.info()', () => {
    const logger = getLogger({});
    const message = "this is a test message";
    const logs: string[] = [];
    console.info = (message: string) => logs.push(message);

    logger.info(message);
    expect(logs[0]).toMatch(/\[info\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // remove timestamp
    logger.setAppendTimeStamp({info: false});
    logger.info(message);
    expect(logs[1]).toMatch(/\[info\]\(\)\s+:\s+this is a test message/g);

    // add timestamp
    logger.setAppendTimeStamp({info: true});
    logger.info(message);
    expect(logs[2]).toMatch(/\[info\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);

    // with trace prints the trace to stack
    logger.setLogWithTrace({info: true});
    logger.info(message);
    expect(console.trace).toBeCalledTimes(12);

    // remove trace
    logger.setLogWithTrace({error: false});
    logger.info(message);
    expect(console.trace).toBeCalledTimes(12);

    // when not logging into file and not logging to console, should add the logs to console
    logger.setLogInFile({info: false});
    logger.setDisplayToConsole({info: false});
    logger.info(message);
    expect(logs[3]).toMatch(/\[info\]\(\)\:\[(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})\.(\d{3})Z\](\s+)\:\s+this is a test message/g);
  });
});