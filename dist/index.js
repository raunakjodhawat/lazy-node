"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
var console_1 = __importDefault(require("./console/console"));
var getLogger = function (options) {
    return new console_1.default(options);
};
exports.getLogger = getLogger;
//# sourceMappingURL=index.js.map