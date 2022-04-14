"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractYouTubeId = void 0;
/**
 * Extracts the YouTube ID value from a valid YouTube URL.
 */
function extractYouTubeId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    if (!match || match[7].length !== 11) {
        throw new Error(`Not a valid YouTube ID: ${url}`);
    }
    return match[7];
}
exports.extractYouTubeId = extractYouTubeId;
