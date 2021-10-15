import Logger from './console/console';
import { loggerOptionsType } from './console/types';


const getLogger = (options: loggerOptionsType) => {
  return new Logger(options);
}

export {
  getLogger,
};
