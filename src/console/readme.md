
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

Trace: [debug](test):[2021-10-15T22:18:20.817Z] : I  am  in  node  1
at  Logger.printLog (/Users/raunakjodhawat/code/lazy-node/dist/console/console.js:100:25)
at  Logger.debug (/Users/raunakjodhawat/code/lazy-node/dist/console/console.js:126:23)
at  file:///Users/raunakjodhawat/code/raunakjodhawat/index.js:4:8
at  ModuleJob.run (internal/modules/esm/module_job.js:183:25)
at  async  Loader.import (internal/modules/esm/loader.js:178:24)
at  async  Object.loadESM (internal/process/esm_loader.js:68:5)
```

# Options

## name