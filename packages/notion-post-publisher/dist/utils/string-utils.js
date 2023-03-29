"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTitleCase = exports.extractYouTubeId = void 0;
/**
 * Extracts the YouTube ID value from a valid YouTube URL.
 *
 * @param url Full URL string
 * @returns ID of the YouTube video
 */
function extractYouTubeId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(shorts\/)|(watch\?))\??(v=)?([^#&?]*).*/;
    const match = url.match(regExp);
    if (!match || match[9].length !== 11) {
        throw new Error(`Not a valid YouTube ID: ${url}`);
    }
    return match[9];
}
exports.extractYouTubeId = extractYouTubeId;
/**
 * Capitalizes the first character in every word in a string.
 *
 * @param str Input string
 * @returns String with first character in every word capitalized
 */
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
exports.toTitleCase = toTitleCase;
