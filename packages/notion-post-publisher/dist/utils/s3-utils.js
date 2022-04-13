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
exports.downloadFile = exports.uploadFile = void 0;
const aws_sdk_1 = require("aws-sdk");
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
/**
 * Upload a temporary generated file to s3. This function knows nothing about
 * the post object. It is simply given a local file and a remote key for
 * uploading.
 */
function uploadFile(srcFilePath, s3FilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("--- UPLOAD FILE ---");
        if (process.env.SKIP_S3_UPLOAD)
            return false;
        const bucket = process.env.AWS_BUCKET;
        const s3 = new aws_sdk_1.S3({ apiVersion: "2006-03-01" });
        const params = {
            Body: fs_1.default.readFileSync(srcFilePath),
            Bucket: bucket,
            Key: s3FilePath,
            ContentType: "image/png",
        };
        return new Promise((resolve, reject) => {
            s3.putObject(params, (err) => {
                if (err)
                    return reject(err);
                const msg = `Uploaded image: https://${bucket}.s3.amazonaws.com/${s3FilePath}`;
                console.log(msg);
                resolve(s3FilePath);
            });
        });
    });
}
exports.uploadFile = uploadFile;
/**
 * Downloads a remote image to a local directory.
 */
function downloadFile(url, tmpFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("--- DOWNLOAD FILE ---");
        return new Promise((resolve, reject) => {
            const file = fs_1.default.createWriteStream(tmpFilePath);
            https_1.default.get(url, (response) => {
                response.pipe(file);
                file.on("finish", () => {
                    file.close();
                    resolve(true);
                });
                file.on("error", (err) => {
                    console.error(err.message);
                    reject(err);
                });
            });
        });
    });
}
exports.downloadFile = downloadFile;
