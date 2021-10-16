
# Logger/Console

Fully configurable logger module, that automatically captures all logs inside two seprate files. Along with traditional functionality of `console`, it appends the timestamp and name of the logger as well, so you know what happened and when it happened and you don't have to deep dive into unnecessary noise of server logs, while debugging.

  

Extremely light package, with no external "dev" dependencies. Everything happens via traditional functions/packages exposed by NodeJS

  

### Installation

```javascript

npm  install @raunakjodhawat/lazy-node

or

yarn  add @raunakjodhawat/lazy-node

```

### Usage

```javascript

import { getLogger } from  '@raunakjodhawat/lazy-node';

const  logger = getLogger({name:  'users:getData'});
logger.debug('got users data');

// emits
Trace: [debug](test):[2021-10-15T22:18:20.817Z] : got users data
at  Logger.printLog (/Users/raunakjodhawat/code/lazy-node/dist/console/console.js:100:25)
at  Logger.debug (/Users/raunakjodhawat/code/lazy-node/dist/console/console.js:126:23)
at  file:///Users/raunakjodhawat/code/raunakjodhawat/index.js:4:8
at  ModuleJob.run (internal/modules/esm/module_job.js:183:25)
at  async  Loader.import (internal/modules/esm/loader.js:178:24)
at  async  Object.loadESM (internal/process/esm_loader.js:68:5)
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
```