import path from "path";

import { formatTitle } from "./text-utils.mjs";

import { tmpImagePath } from "./file-utils.mjs";
import { Canvas } from "./canvas.mjs";

/**
 * Generates a meta image file for one news item and stores locally.
 */
export class NewsImageGenerator {
  constructor({ __dirname, tmpDir, item: { filePath, data } }) {
    this.__dirname = __dirname;
    this.imgPath = tmpImagePath(filePath, tmpDir);
    this.drawConfig = {
      bgImgPath: path.join(__dirname, "templates/news-background.svg"),
      title: {
        rawText: data.title,
        maxFontSize: 110,
        maxLineWidth: 1600,
        color: "#051c28",
      },
      badge: {
        bg: {
          color: "#2260bf",
        },
        text: {
          text: "seancdavis.com",
          color: "#FFFFFF",
        },
      },
    };
  }

  async run() {
    this.canvas = new Canvas();
    this.setTitleConfig();
    this.setBadgeConfig();
    // We need to know the height of all the content before we can determine the
    // y values for each item.
    this.setYValues();
    await this.drawBgImage();
    this.drawTitle();
    this.drawBadge();
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

  badgeTextConfig() {
    return this.drawConfig.badge.text;
  }

  badgeBgConfig() {
    return this.drawConfig.badge.bg;
  }

  // --- Config Setters ---

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

  setBadgeConfig() {
    this.setBadgeTextConfig();
    this.setBadgeBgConfig();
  }

  setBadgeTextConfig() {
    const fontSize = this.titleConfig().fontSize * 0.55;
    this.canvas.setFont(fontSize);
    const w = this.canvas.context.measureText(
      this.badgeTextConfig().text
    ).width;
    const x = this.canvasConfig().w / 2;

    this.drawConfig.badge.text = {
      ...this.drawConfig.badge.text,
      fontSize,
      x,
      w,
    };
  }

  setBadgeBgConfig() {
    const paddingX = this.badgeTextConfig().fontSize * 1.167;
    const paddingY = this.badgeTextConfig().fontSize * 0.5;
    // Because this is a rectangle, the background position is the top left of
    // the rectangle, whereas the text position is the center of the text.
    const x =
      this.badgeTextConfig().x - this.badgeTextConfig().w / 2 - paddingX;
    const w = this.badgeTextConfig().w + paddingX * 2;
    const h = this.badgeTextConfig().fontSize + paddingY * 2;

    this.drawConfig.badge.bg = {
      ...this.drawConfig.badge.bg,
      paddingX,
      paddingY,
      x,
      w,
      h,
    };
  }

  setYValues() {
    const contentHeight =
      this.titleConfig().fontSize * (this.titleConfig().text.length + 0.5) +
      this.badgeBgConfig().h;

    // Title is placed at 25% of the content's height above center. This felt
    // more balanced than centering completely, which made the title feel like
    // it was too close to the top.
    this.drawConfig.title.y = this.canvas.config.h / 2 - contentHeight / 4;
    // The extra 0.5 is the margin between the title and the badge.
    this.drawConfig.badge.text.y =
      this.titleConfig().y +
      this.titleConfig().lineHeight * (this.titleConfig().text.length + 0.5);
    // Like badge background x value, this is calculated from the badge text's
    // position, which is the center of the text, while the background's y is
    // the top of the rectangle.
    this.drawConfig.badge.bg.y =
      this.badgeTextConfig().y -
      this.badgeTextConfig().fontSize -
      this.badgeBgConfig().paddingY +
      2;
  }

  // --- Draw Utils ---

  async drawBgImage() {
    await this.canvas.setBgImage(this.drawConfig.bgImgPath);
  }

  drawTitle() {
    const title = this.titleConfig();
    this.canvas.context.textAlign = "center";
    this.canvas.setFont(title.fontSize);
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

  drawBadge() {
    const bg = this.badgeBgConfig();
    this.canvas.context.fillStyle = bg.color;
    this.canvas.context.fillRect(bg.x, bg.y, bg.w, bg.h);

    const text = this.badgeTextConfig();
    this.canvas.setFont(text.fontSize);
    this.canvas.context.fillStyle = text.color;
    this.canvas.context.fillText(text.text, text.x, text.y);
  }
}
