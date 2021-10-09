import Logger from "./console/index.js";

const logger = new Logger({name: "console:example", toLogInFile: {log: false}, toDisplayInConsole: {log: true}, toLogTrace: {log: true}});

logger.log("asd", "asdsww", "34534");