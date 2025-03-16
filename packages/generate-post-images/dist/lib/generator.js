"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const canvas_1 = require("canvas");
const text_utils_1 = require("../utils/text-utils");
class Generator {
    constructor({ post, config, }) {
        this.post = post;
        const tmpFilePaths = this.getTmpFilePaths();
        this.config = { ...config, tmpFilePaths };
        this.loadFont("DMSerifDisplay-Regular.ttf", "DM Serif Display");
        this.loadFont("DMSerifDisplay-Italic.ttf", "DM Serif Display Italic");
        this.canvas = (0, canvas_1.createCanvas)(this.config.width, this.config.height);
        this.context = this.canvas.getContext("2d");
    }
    /* ---------- Rendering Utils ---------- */
    /**
     * Render the background image to the canvas.
     */
    async renderBackground() {
        const { width, height, filePath } = this.config;
        const image = await (0, canvas_1.loadImage)(filePath);
        this.context.drawImage(image, 0, 0, width, height);
    }
    /**
     * Renders the title to the canvas.
     */
    async renderTitle() {
        // Determine font size and number of lines.
        const { fontSize, text } = (0, text_utils_1.formatTitle)(this.post.data.title, this.context, {
            maxFontSize: this.config.maxFontSize,
            maxLineWidth: this.config.maxLineWidth,
            minSingleLineFontSize: this.config.minSingleLineFontSize,
        });
        // Determine y value for the first line. The Y for text is measured as the
        // bottom of the line.
        //
        // If a single line, Y is the middle of the canvas PLUS half the font size.
        //
        // If two lines, then it's half the canvas MINUS half the space between the
        // lines (for which we'll use the font size).
        const centerY = this.config.height / 2;
        let y = text.length === 1 ? centerY + fontSize / 2 : centerY - fontSize / 2;
        // X is the center, if center aligned, or half the difference between the
        // maxLineWidth and canvas width (i.e. the padding).
        const x = this.config.textAlign === "center"
            ? this.config.width / 2
            : (this.config.width - this.config.maxLineWidth) / 2;
        if (this.config.highlight) {
            // Highlight the first line, if necessary.
            this.renderHighlight({ x, y, fontSize, text: text[0] });
        }
        else {
            // Otherwise, set a shadow for the text.
            this.context.shadowColor = "rgba(0, 0, 0, .25)";
            this.context.shadowBlur = 4;
            this.context.shadowOffsetY = 4;
        }
        // Render the first line.
        this.context.textAlign = this.config.textAlign;
        this.context.font = `bold ${fontSize}pt 'DM Serif Display'`;
        this.context.fillStyle = this.config.highlight
            ? this.config.highlightTextColor
            : this.config.textColor;
        this.context.fillText(text[0], x, y);
        // Render the second line, if necessary.
        if (text[1]) {
            // 1 for the space between, 1 because y is set as the bottom of the line.
            y += fontSize * 2;
            // Highlight, if necessary.
            if (this.config.highlight) {
                this.renderHighlight({ x, y, fontSize, text: text[1] });
            }
            this.context.fillStyle = this.config.highlight
                ? this.config.highlightTextColor
                : this.config.textColor;
            this.context.fillText(text[1], x, y);
        }
    }
    /**
     * Renders a highlight rectangle for a given line of a title.
     */
    renderHighlight(title) {
        this.context.fillStyle = this.config.highlightColor;
        const titleWidth = this.context.measureText(title.text).width;
        const paddingX = title.fontSize / 2;
        const paddingY = title.fontSize / 3;
        const w = titleWidth + paddingX * 2;
        const h = title.fontSize + paddingY * 2;
        const x = (this.config.textAlign === "center"
            ? title.x - titleWidth / 2
            : title.x) - paddingX;
        let y = title.y - title.fontSize - paddingY;
        // This is a positioning-adjustment factor. I ran against a few different
        // font sizes and it does a good job balancing the space above and below the
        // text.
        y += title.fontSize * 0.0425;
        this.context.fillRect(x, y, w, h);
    }
    /* ---------- File Utils ---------- */
    /**
     * Store the current canvas as a file at the given file path.
     *
     * @param filePath Absolute path to where the canvas snapshot should be stored.
     * @returns The input file path
     */
    saveAsImage(filePath) {
        const buffer = this.canvas.toBuffer("image/png");
        fs_1.default.writeFileSync(filePath, buffer);
        return filePath;
    }
    /* ---------- Init Utils ---------- */
    /**
     * Load a font for canvas to use. This must be done before the canvas is
     * initialized.
     */
    loadFont(filename, family) {
        const fontPath = path_1.default.join(__dirname, "../../src/assets/fonts", filename);
        (0, canvas_1.registerFont)(fontPath, { family });
    }
    /**
     * Builds a ref object for the two images to generate. Puts these in a `tmp`
     * directory where the command is run.
     */
    getTmpFilePaths() {
        const tmpDir = path_1.default.join(__dirname, "../../tmp");
        if (!fs_1.default.existsSync(tmpDir))
            fs_1.default.mkdirSync(tmpDir);
        return {
            featured: path_1.default.join(tmpDir, `${this.post.__metadata.slug}.png`),
            meta: path_1.default.join(tmpDir, `${this.post.__metadata.slug}--meta.png`),
        };
    }
}
exports.Generator = Generator;
