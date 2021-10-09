import Logger from '../console/index.js';

const logger = new Logger({ name: 'console:example', toLogInFile: { log: false }, toDisplayInConsole: { log: true, error: true, debug: false } });

logger.multiMessage('jeee', 'ejee');
logger.log('Hello, world');
// Saves to stdout file
// [log](ExampleLogger):[2021-10-09T04:11:49.823Z]	: Hello, world

logger.log('Hello, world', false, true);
// Does not save to file, outputs only to stdout
// [log](ExampleLogger):[2021-10-09T04:13:25.158Z]	: Hello, world

logger.log('Hello, world', true, true);
// Saves to file and prints on console
// [log](ExampleLogger):[2021-10-09T04:14:14.296Z] : Hello, world

logger.error('This is just an error message', true, true);
// Saves to file and prints on console
// [error](ExampleLogger):[2021-10-09T04:15:22.147Z]       : This is just an error message

logger.error(new Error('This is an actual error'), true, true);
// Saves to file and prints on console
/**
 * [error](ExampleLogger):[2021-10-09T04:15:22.148Z]       : Error: This is an actual error
    at file:///Users/raunakjodhawat/code/lazy-node/console/example.js:20:14
    at ModuleJob.run (internal/modules/esm/module_job.js:183:25)
    at async Loader.import (internal/modules/esm/loader.js:178:24)
    at async Object.loadESM (internal/process/esm_loader.js:68:5)
 */

/**
 * Functions that can be used in conjunction with logger
 * log
 * error
 * info
 * warn
 * debug
 */

// Don't log to file
const logger1 = new Logger('ExampleLogger', false);

// don't log to file. Display on Stdout
const logger2 = new Logger('ExampleLogger', false, true);

// Change stdout and stderr file names
const logger3 = new Logger('ExampleLogger', true, true, 'filea.log', 'fileb.log');
