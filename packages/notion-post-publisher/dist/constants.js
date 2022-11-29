"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOPICS_DIR = void 0;
const path_1 = __importDefault(require("path"));
const WWW_DIR = path_1.default.join(__dirname, "../../..", "www");
exports.TOPICS_DIR = path_1.default.join(WWW_DIR, "src/topics");
