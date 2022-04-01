import type { NotionVideoBlock } from "../../types/notion";

import { extractYouTubeId } from "../../utils/url-utils";

export class VideoBlock {
  youtubeId: string;

  constructor(params: NotionVideoBlock) {
    if (params.video.type === "file") {
      throw new Error("Notion videos not supported. Upload video to YouTube.");
    }
    const videoParams = params.video as Extract<
      NotionVideoBlock["video"],
      { type: "external" }
    >;
    this.youtubeId = extractYouTubeId(videoParams.external.url);
  }

  render() {
    return `{% youtube_embed id="${this.youtubeId}" %}\n`;
  }
}
