"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomBackground = void 0;
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
/**
 * Takes a raw background config object (from config.mjs) and does two things:
 *
 *    1. Uses `titleOptionKeys` to set rich `titleOptions` objects.
 *    2. Resolves the absolute path to the image file.
 *
 * @param {object} bgConfig raw background config object
 */
function resolveBackgroundConfig(bgConfig) {
    const resBgConfig = Object.assign({}, bgConfig);
    // Populate rich title options.
    resBgConfig.titleOptions = bgConfig.titleOptionKeys.map((key) => config_1.default.titles[key]);
    // Resolve the path to the file.
    const bgDir = path_1.default.join(__dirname, "../../src/assets");
    resBgConfig.filePath = path_1.default.join(bgDir, bgConfig.filePath);
    // Return the resulting object.
    return resBgConfig;
}
/**
 * Pulls a random config object from config.backgrounds and resolves it using
 * resolveBackgroundConfig().
 *
 * @returns {object} resolved config for single background image
 */
function getRandomBackground() {
    const { backgrounds } = config_1.default;
    const bgConfig = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    return resolveBackgroundConfig(bgConfig);
}
exports.getRandomBackground = getRandomBackground;
