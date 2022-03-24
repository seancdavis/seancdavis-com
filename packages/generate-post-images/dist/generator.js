"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const canvas_1 = require("canvas");
class Generator {
    constructor({ post, bgConfig, }) {
        this.config = { w: 2400, h: 1260 };
        this.post = post;
        this.background = bgConfig;
        this.loadFont("DMSerifDisplay-Regular.ttf", "DM Serif Display");
        this.loadFont("DMSerifDisplay-Italic.ttf", "DM Serif Display Italic");
        this.canvas = (0, canvas_1.createCanvas)(this.config.w, this.config.h);
        this.context = this.canvas.getContext("2d");
        this.tmpFilePaths = this.setTmpFilePaths();
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const featuredImagePath = yield this.generateFeaturedImage();
            return { featuredImagePath };
        });
    }
    /* ---------- Private Methods ---------- */
    /**
     * Render the background image and store current state as a temp file.
     */
    generateFeaturedImage() {
        return __awaiter(this, void 0, void 0, function* () {
            const { w, h } = this.config;
            const image = yield (0, canvas_1.loadImage)(this.background.filePath);
            this.context.drawImage(image, 0, 0, w, h);
            this.saveAsImage(this.tmpFilePaths.featured);
            return this.tmpFilePaths.featured;
        });
    }
    /**
     * Load a font for canvas to use. This must be done before the canvas is
     * initialized.
     */
    loadFont(filename, family) {
        const fontPath = path_1.default.join(__dirname, "../src/assets/fonts", filename);
        (0, canvas_1.registerFont)(fontPath, { family });
    }
    /**
     * Builds a ref object for the two images to generate. Puts these in a `tmp`
     * directory where the command is run.
     */
    setTmpFilePaths() {
        const tmpDir = path_1.default.join(__dirname, "../tmp");
        const tmpBasename = path_1.default
            .basename(this.post.filePath, path_1.default.extname(this.post.filePath))
            .replace(/^\d{4}-\d{2}-\d{2}-/, "");
        if (!fs_1.default.existsSync(tmpDir))
            fs_1.default.mkdirSync(tmpDir);
        return {
            featured: path_1.default.join(tmpDir, `${tmpBasename}.png`),
            meta: path_1.default.join(tmpDir, `${tmpBasename}--meta.png`),
        };
    }
    /**
     * Store the current canvas as a file at the given file path.
     */
    saveAsImage(filePath) {
        const buffer = this.canvas.toBuffer("image/png");
        return fs_1.default.writeFileSync(filePath, buffer);
    }
}
exports.Generator = Generator;
