import Logger from '../../../src/console/index.js';

describe('Packages:Console:Log', () => {
    let logger;
    beforeAll(() => {
        logger = new Logger({name: "hello"});
    });
    test('composed of non-numbers throws CustomError', () => {
        logger.log("hell");
    });
})