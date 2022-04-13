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
exports.ImageBlock = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const s3_utils_1 = require("../../utils/s3-utils");
const date_fns_1 = require("date-fns");
class ImageBlock {
    constructor(params) {
        this.imageUploaded = false;
        this.alt = params.image.caption
            .map((caption) => caption.plain_text)
            .join("");
        this.imageUrl =
            params.image.type === "file"
                ? params.image.file.url
                : params.image.external.url;
        this.tmpFilePath = this.getTmpFilePath();
        this.s3FilePath = this.getS3FilePath();
    }
    /* ----- Attributes ----- */
    /**
     * Builds and returns a temporary file path to use when processing the image.
     */
    getTmpFilePath() {
        const tmpDir = path_1.default.join(__dirname, "../../../tmp");
        if (!fs_1.default.existsSync(tmpDir))
            fs_1.default.mkdirSync(tmpDir, { recursive: true });
        const filename = path_1.default.basename(this.imageUrl).split("?")[0];
        return path_1.default.join(tmpDir, filename);
    }
    /**
     * Determines the path (key) at which to store the image when uploaded to s3.
     */
    getS3FilePath() {
        const date = (0, date_fns_1.format)(new Date(), "yyMMdd");
        const filename = path_1.default.basename(this.tmpFilePath);
        return `uploads/${date}/${filename}`;
    }
    /* ----- Uploader ----- */
    /**
     * Uploads an image to s3 and stores the result as the `url` property. Deletes
     * the temp image after uploading.
     */
    processImage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, s3_utils_1.downloadFile)(this.imageUrl, this.tmpFilePath);
            yield (0, s3_utils_1.uploadFile)(this.tmpFilePath, this.s3FilePath);
            this.imageUploaded = true;
            if (fs_1.default.existsSync(this.tmpFilePath))
                fs_1.default.rmSync(this.tmpFilePath);
        });
    }
    /* ----- Render ----- */
    prerender() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.processImage();
        });
    }
    render() {
        if (!this.imageUploaded) {
            throw new Error("Image not uploaded. Must call prerender() first.");
        }
        return `{% post_image alt="${this.alt}", src="/${this.s3FilePath}" %}`;
    }
}
exports.ImageBlock = ImageBlock;
