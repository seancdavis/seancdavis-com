"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    success(msg) {
        console.log(chalk_1.default.green.bold("[success]"), msg);
    }
    debug(msg) {
        if (process.env.DEBUG) {
            console.log(chalk_1.default.blue.bold("[debug]"), msg);
        }
    }
    error(msg) {
        console.log(chalk_1.default.red.bold("[error]"), msg);
    }
}
exports.Logger = Logger;
