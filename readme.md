## Lazy-Node
Bunch of light weight functional components for your node application. No extra package, goal is to build something beautiful straight from what nodejs provides.

## Getting Started
```
npm i @raunakjodhawat/lazy-node

or

yarn add @raunakjodhawat/lazy-node
```
## Console
Light weight addition to traditional console, without any extra overhead. 
Adds time of console message, type of console function call, a prefix to console message and obviously the orignal message.

All these functionalities are 100% configurable, as described (here)[./console/example.js]
```
import Logger from "./index.js";

const logger = new Logger("homepage:leftNav");

logger.log('Hello, world');
// [log](homepage:leftNav):[2021-10-09T04:11:49.823Z]	: Hello, world

logger.warn('Hello, world');
// [warn](homepage:leftNav):[2021-10-09T04:11:50.823Z]	: Hello, world
```