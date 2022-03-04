import path from "path";

import { formatTitle } from "./text-utils.mjs";

import { tmpImagePath } from "./file-utils.mjs";
import { Canvas } from "./canvas.mjs";

/**
 * Generates a meta image file for one news item and stores locally.
 */
export class EventImageGenerator {
  constructor({ __dirname, tmpDir, item: { filePath, data } }) {
    this.__dirname = __dirname;
    this.imgPath = tmpImagePath(filePath, tmpDir);
    this.drawConfig = {
      bgImgPath: path.join(__dirname, "assets/event-background.svg"),
      logo: {
        imgPath: path.join(__dirname, "assets/scd-logo.svg"),
        w: 134,
        h: 141,
      },
      title: {
        rawText: data.title,
        maxFontSize: 110,
        maxLineWidth: 1600,
        color: "#051c28",
      },
      host: {
        text: data.host,
        color: "#051c28",
      },
    };
  }

  async run() {
    this.canvas = new Canvas();
    this.setLogoConfig();
    this.setTitleConfig();
    this.setHostConfig();
    // We need to know the height of all the content before we can determine the
    // y values for each item.
    this.setYValues();
    await this.drawBgImage();
    await this.drawLogo();
    this.drawTitle();
    this.drawHost();
    this.canvas.saveImage(this.imgPath);

    return this.imgPath;
  }

  // --- Config Getters ---

  canvasConfig() {
    return this.canvas.config;
  }

  logoConfig() {
    return this.drawConfig.logo;
  }

  titleConfig() {
    return this.drawConfig.title;
  }

  hostConfig() {
    return this.drawConfig.host;
  }

  // --- Config Setters ---

  setLogoConfig() {
    const x = this.canvasConfig().w / 2 - this.logoConfig().w / 2;

    this.drawConfig.logo = {
      ...this.drawConfig.logo,
      x,
    };
  }

  setTitleConfig() {
    const { fontSize, text } = formatTitle({
      ...this.titleConfig(),
      title: this.titleConfig().rawText,
      context: this.canvas.context,
    });
    const x = this.canvasConfig().w / 2;
    const lineHeight = fontSize * 1.75;

    this.drawConfig.title = {
      ...this.titleConfig(),
      text,
      fontSize,
      lineHeight,
      x,
    };
  }

  setHostConfig() {
    const fontSize = this.titleConfig().fontSize * 0.45;
    this.canvas.setFont({ size: fontSize, family: "DM Serif Display Italic" });
    const x = this.canvasConfig().w / 2;

    this.drawConfig.host = {
      ...this.drawConfig.host,
      fontSize,
      x,
    };
  }

  setYValues() {
    const contentHeight =
      this.logoConfig().h + // Logo height
      this.logoConfig().h + // space between logo and title
      this.titleConfig().lineHeight * this.titleConfig().text.length + // title height
      this.hostConfig().fontSize * 2 + // space between title and host
      this.hostConfig().fontSize; // host

    // This is in an attempt to balance the vertical positioning.
    this.drawConfig.logo.y = this.canvas.config.h / 2 - contentHeight / 2;
    // Text y is measured from the bottom of the text line.
    this.drawConfig.title.y =
      this.logoConfig().y + this.logoConfig().h + this.titleConfig().lineHeight;
    this.drawConfig.host.y =
      this.titleConfig().y + // Logo starting point, which is bottom of the first line
      this.titleConfig().lineHeight * (this.titleConfig().text.length - 1) + // adding additional line height for multi-line titles
      this.hostConfig().fontSize * 2 + // space between
      this.hostConfig().fontSize; // distance to get down to the bottom of the host line
  }

  // --- Draw Utils ---

  async drawBgImage() {
    await this.canvas.setBgImage(this.drawConfig.bgImgPath);
  }

  async drawLogo() {
    const { x, y, w, h, imgPath } = this.logoConfig();
    await this.canvas.drawImage(imgPath, { x, y, w, h });
  }

  drawTitle() {
    const title = this.titleConfig();
    this.canvas.context.textAlign = "center";
    this.canvas.setFont({ size: title.fontSize });
    this.canvas.context.fillStyle = title.color;
    this.canvas.context.fillText(title.text[0], title.x, title.y);
    if (title.text[1]) {
      this.canvas.context.fillText(
        title.text[1],
        title.x,
        title.y + title.lineHeight
      );
    }
  }

  drawHost() {
    const host = this.hostConfig();
    this.canvas.setFont({
      size: host.fontSize,
      family: "DM Serif Display Italic",
    });
    this.canvas.context.fillStyle = host.color;
    this.canvas.context.fillText(host.text, host.x, host.y);
  }
}
