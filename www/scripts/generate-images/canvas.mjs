import canvas from "canvas";
import fs from "fs";
import path from "path";

export class Canvas {
  constructor() {
    this.config = { w: 2400, h: 1260 };
    this.loadFont("DMSerifDisplay-Regular.ttf", "DM Serif Display");
    this.canvas = canvas.createCanvas(this.config.w, this.config.h);
    this.context = this.canvas.getContext("2d");
  }

  /**
   * Load a font for canvas to use. This must be done before the canvas is
   * initialized.
   *
   * @param filename string - The name of the font file in src/assets/fonts
   * @param family string - Name of the font family
   */
  loadFont(filename, family) {
    const fontPath = path.join(process.cwd(), "src/assets/fonts", filename);
    canvas.registerFont(fontPath, { family });
  }

  /**
   * Set the font for the current context.
   *
   * @param fontSize number - Font size value (put)
   */
  setFont(fontSize) {
    this.context.font = `bold ${fontSize}pt 'DM Serif Display'`;
  }

  /**
   * Render the background image on the canvas.
   *
   * @param context 2D context for canvas
   * @param imgPath string - full path to background image
   * @returns result of context.drawImage()
   */
  async setBgImage(imgPath) {
    const bgImage = await canvas.loadImage(imgPath);
    return this.context.drawImage(bgImage, 0, 0, this.config.w, this.config.h);
  }

  /**
   * Writes the canvas to file as a PNG.
   *
   * @param filePath string - full path to destination image file
   * @returns result of fs.writeFileSync()
   */
  saveImage(filePath) {
    const buffer = this.canvas.toBuffer("image/png");
    return fs.writeFileSync(filePath, buffer);
  }
}
