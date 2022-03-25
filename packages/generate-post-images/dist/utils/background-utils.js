"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
 *    1. Uses `titleOptionKeys` to set a title attributes directly on the object
 *    2. Resolves the absolute path to the image file.
 *
 * @param {object} bgConfig raw background config object
 */
function resolveBackgroundConfig(bgConfig) {
    // Choose a random title object.
    const titleKey = getRandomItem(bgConfig.titleOptionKeys);
    const titleConfig = config_1.default.titles[titleKey];
    // Set the properties on this object, removing titleOptionKeys.
    const { titleOptionKeys } = bgConfig, bgConfigProps = __rest(bgConfig, ["titleOptionKeys"]);
    const resBgConfig = Object.assign(Object.assign({}, bgConfigProps), titleConfig);
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
    const bgConfig = getRandomItem(config_1.default.backgrounds);
    return resolveBackgroundConfig(bgConfig);
}
exports.getRandomBackground = getRandomBackground;
/**
 * Given an array of objects, return a random object from the array.
 *
 * @param {array} arr An array of objects
 * @returns {object} A random object from the array
 */
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
