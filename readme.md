## node-bridge-sdk
Bunch of light weight functional components for your node application. No extra package, goal is to build something beautiful straight from what nodejs provides.

## Getting Started
```
npm i node-bridge-sdk

or

yarn add node-bridge-sdk
```
## Logger/Console [![npm version](https://badge.fury.io/js/node-bridge-sdk.svg)](https://badge.fury.io/js/node-bridge-sdk)

Fully configurable logger module, that automatically captures all logs inside two separate files. Along with traditional functionality of `console`, it appends the timestamp and name of the logger as well, so you know what happened and when it happened and you don't have to deep dive into unnecessary noise of server logs, while debugging.

  

Extremely light package, with no external "dev" dependencies. Everything happens via traditional functions/packages exposed by NodeJS

  

### Installation

```javascript
npm  install node-bridge-sdk
or
yarn  add node-bridge-sdk
```

### Usage

```javascript
import { getLogger } from  'node-bridge-sdk';

const  logger = getLogger({name:  'users:getData'});
// or const logger = getLogger();
logger.debug('got users data');

// emits
[debug](users:getData):[2021-10-16T03:04:01.976Z] : got users data
on console and stdout.log file
```

### Functions
```javascript
logger.log(123, "hello:", `${userId}`);
logger.error(...)
logger.debug(...)
logger.info(...)
logger.warn(...)
logger.trace(...)
logger.table(...)
```
# Options
Other ways to initialize Logger
## name(recommended use)
```javascript
const  logger = getLogger({name:  'users:setData'});
logger.debug('set user data');

// emits
[debug](users:setData):[2021-10-16T01:49:37.304Z] : set user data
```
Name is used while emitting messages. for eg:
`(users:setData)` in the message above

## logInFile
```javascript
const  logger = getLogger({name:  'users:setData'});
logger.debug('set user data');

```
Decides whether to log a message type into `stdout.log` and `stderr.log` file or not. By default all messages are added to the files
```javascript
Default logInFile values
logInFile = {
	log:  true,
	warn:  true,
	error:  true,
	debug:  true,
	info:  true,
	trace:  true,
	table:  true,
}

const  logger = getLogger({name:  "users:setData", logInFile: {debug:  false, error: false}});
logger.debug('I will not be added to file');
logger.log('I will be added to the file, because of default config');
logger.error(new Error('custom error, I wont be added to stderr.log, because you choose not to'));

```
## displayToConsole
```javascript
const  logger = getLogger({name:  "users:setData", displayToConsole: {debug:  false, error: true}});
```

By default all messages are logged into console, you can turn on/off that feature via `displayToConsole` option value

## logWithTrace
```javascript
const  logger = getLogger({name:  "users:setData", logWithTrace: {debug:  false, error: true}});
```
By default **no** messages are logged with trace information, you can turn on/off that feature via `logWithTrace` option value

## appendTimeStamp
```javascript
const  logger = getLogger({name:  "users:setData", appendTimeStamp: {debug:  false, error: true}});
```

By default all messages have timestamp appended to the messages, which are logged in console or in file. However, you are free to adjust showing timestamp per function. Example of timestamp:
`[debug](users:setData):[2021-10-16T01:49:37.304Z] : set user data`

## outputFileName
By default output from `log`, `info`, `trace`, `table` and `debug` is stored in `stdout.log` and output from `error` and `warn` is stored in `stderr.log`. However, you can pass in outputFileName, with the file name that you want.
```javascript
const  logger = getLogger({name:  "users:setData", outputFileName: './my-logger-output.log'});
```

## errorOutputFileName
You can also change the file name where `error` and `warn` messages are stored
```javascript
const  logger = getLogger({name:  "users:setData", outputFileName: './my-logger-error.log'});
```

### Additional features
- If both `displayToConsole` and `logInFile` is false for a function is false, the Logger is smart enough to log the function into the console. 