"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoBlock = void 0;
const url_utils_1 = require("../../utils/url-utils");
class VideoBlock {
    constructor(params) {
        if (params.video.type === "file") {
            throw new Error("Notion videos not supported. Upload video to YouTube.");
        }
        const videoParams = params.video;
        this.youtubeId = (0, url_utils_1.extractYouTubeId)(videoParams.external.url);
    }
    render() {
        return `{% youtube_embed id="${this.youtubeId}" %}`;
    }
}
exports.VideoBlock = VideoBlock;
