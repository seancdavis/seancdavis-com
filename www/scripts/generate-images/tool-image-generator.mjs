import fs from "fs";
import path from "path";

import { getFontSize } from "./text-utils.mjs";
import {
  extractTwitterHandle,
  extractDomainName,
  extractGitHubRepoPath,
} from "./url-utils.mjs";

import {
  tmpImagePath,
  filenameParts,
  uploadFile,
  downloadFile,
} from "./file-utils.mjs";
import { Canvas } from "./canvas.mjs";

/**
 * Generates a meta image file for one news item and stores locally.
 */
export class ToolImageGenerator {
  constructor({ __dirname, tmpDir, item: { filePath, data } }) {
    this.__dirname = __dirname;
    this.imgPath = tmpImagePath(filePath, tmpDir);
    this.filePath = filePath;
    this.drawConfig = {
      bgImgPath: path.join(__dirname, "assets/tool-background.svg"),
      title: {
        text: data.title,
        maxFontSize: 110,
        maxContentWidth: 1000,
        color: "#051c28",
        fontSize: null,
        x: null,
        y: null,
      },
      logo: {
        remoteSrc: data.logo,
        localSrc: null,
        uploadSrc: data.logo_to_upload
          ? path.join(__dirname, "../../", data.logo_to_upload)
          : null,
        w: null,
        h: null,
        x: 150,
        y: null,
      },
      sources: {
        color: "#4B6A8A",
        fontSize: null,
        textX: null,
        iconX: 150,
        iconW: null,
        website: {
          icon: "website.svg",
          text: extractDomainName(data.sources?.website),
          textY: null,
          iconY: null,
        },
        github: {
          icon: "github.svg",
          text: extractGitHubRepoPath(data.sources?.github),
          textY: null,
          iconY: null,
        },
        twitter: {
          icon: "twitter.svg",
          text: extractTwitterHandle(data.sources?.twitter),
          textY: null,
          iconY: null,
        },
      },
    };
  }

  async run() {
    this.canvas = new Canvas();
    await this.processLogo();
    this.setTitleConfig();
    this.setLogoConfig();
    this.setSourcesConfig();
    // We need to know the height of all the content before we can determine the
    // y values for each item.
    this.setYValues();
    await this.drawBgImage();
    await this.drawLogo();
    this.drawTitle();
    await this.drawSources();
    this.canvas.saveImage(this.imgPath);

    return this.imgPath;
  }

  // --- Config Getters ---

  canvasConfig() {
    return this.canvas.config;
  }

  titleConfig() {
    return this.drawConfig.title;
  }

  logoConfig() {
    return this.drawConfig.logo;
  }

  sourcesConfig() {
    return this.drawConfig.sources;
  }

  // --- Config Setters ---

  setTitleConfig() {
    const fontSize = getFontSize({
      fontSize: this.titleConfig().maxFontSize,
      context: this.canvas.context,
      text: this.titleConfig().text,
      maxLineWidth: this.titleConfig().maxContentWidth,
    });
    const x = this.logoConfig().localSrc ? fontSize * 1.3 + 200 : 150;

    this.drawConfig.title = {
      ...this.titleConfig(),
      fontSize,
      x,
    };
  }

  setLogoConfig() {
    const w = this.titleConfig().fontSize * 1.3;

    this.drawConfig.logo = {
      ...this.logoConfig(),
      w,
      h: w, // logo must be a square
    };
  }

  setSourcesConfig() {
    const fontSize = this.titleConfig().fontSize * 0.5;
    const iconW = fontSize * 1.5;
    const textX = this.sourcesConfig().iconX + fontSize * 2.25;

    this.drawConfig.sources = {
      ...this.sourcesConfig(),
      fontSize,
      iconW,
      textX,
    };
  }

  setYValues() {
    const numSources = ["website", "twitter", "github"].filter(
      (source) => this.sourcesConfig()[source].text
    ).length;

    let contentHeight =
      this.titleConfig().fontSize * 2.5 + // Extra numbers here are for spacing
      this.sourcesConfig().fontSize * 2.5 * numSources; // And here

    // Title
    this.drawConfig.title.y = this.canvasConfig().h / 2 - contentHeight / 3;
    this.drawConfig.logo.y =
      this.titleConfig().y - this.titleConfig().fontSize * 1.1;

    let nextY = this.titleConfig().y + this.titleConfig().fontSize * 2.5;

    // Website
    if (this.sourcesConfig().website.text) {
      this.drawConfig.sources.website.textY = nextY;
      this.drawConfig.sources.website.iconY =
        this.sourcesConfig().website.textY -
        this.sourcesConfig().fontSize * 1.2;
      nextY += this.sourcesConfig().fontSize * 2.5;
    }
    // Twitter
    if (this.sourcesConfig().twitter.text) {
      this.drawConfig.sources.twitter.textY = nextY;
      this.drawConfig.sources.twitter.iconY =
        this.sourcesConfig().twitter.textY -
        this.sourcesConfig().fontSize * 1.2;
      nextY += this.sourcesConfig().fontSize * 2.5;
    }
    // GitHub
    if (this.sourcesConfig().github.text) {
      this.drawConfig.sources.github.textY = nextY;
      this.drawConfig.sources.github.iconY =
        this.sourcesConfig().github.textY - this.sourcesConfig().fontSize * 1.2;
      nextY += this.sourcesConfig().fontSize * 2.5;
    }
  }

  // --- Draw Utils ---

  async drawBgImage() {
    await this.canvas.setBgImage(this.drawConfig.bgImgPath);
  }

  async drawLogo() {
    if (!this.logoConfig().remoteSrc) return;
    const { x, y, w, h, localSrc } = this.logoConfig();
    await this.canvas.drawImage(localSrc, { x, y, w, h });
  }

  drawTitle() {
    const title = this.titleConfig();
    this.canvas.setFont({ size: title.fontSize });
    this.canvas.context.fillStyle = title.color;
    this.canvas.context.fillText(title.text, title.x, title.y);
  }

  async drawSources() {
    const sources = ["website", "twitter", "github"];
    const { color, fontSize, textX, iconX, iconW } = this.sourcesConfig();
    for (const source of sources) {
      if (!this.sourcesConfig()[source].text) continue;
      const { icon, text, iconY, textY } = this.sourcesConfig()[source];
      // Draw the icon
      await this.canvas.drawImage(path.join(this.__dirname, "assets", icon), {
        x: iconX,
        y: iconY,
        w: iconW,
        h: iconW,
      });
      // Draw the text.
      this.canvas.setFont({ size: fontSize });
      this.canvas.context.fillStyle = color;
      this.canvas.context.fillText(text, textX, textY);
    }
  }

  // --- Logo Uploader ---

  async processLogo() {
    if (this.logoConfig().uploadSrc) await this.uploadLogo();
    // If there was nothing to upload and no other log reference set, we're done
    // working with the logo.
    if (!this.logoConfig().remoteSrc) return;
    this.drawConfig.logo.localSrc = await downloadFile(
      this.logoConfig().remoteSrc
    );
  }

  async uploadLogo() {
    const { slug } = filenameParts(this.filePath);
    const uploadPath = await uploadFile(
      this.logoConfig().uploadSrc,
      `tools/${slug}`,
      false
    );
    this.storeLogoRef(uploadPath);
    fs.unlinkSync(this.logoConfig().uploadSrc);
  }

  storeLogoRef(s3Path) {
    this.drawConfig.logo.remoteSrc = s3Path;
    const rawContent = fs.readFileSync(this.filePath).toString();
    const newFileContent = rawContent
      .replace(/logo_to_upload\: (.*)\n/, "") // remove tmp ref
      .replace(/^---/, `---\nlogo: /${s3Path}`); // add new ref
    return fs.writeFileSync(this.filePath, newFileContent);
  }
}
