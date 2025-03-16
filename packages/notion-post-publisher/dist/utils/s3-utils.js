"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = uploadFile;
exports.downloadFile = downloadFile;
const aws_sdk_1 = require("aws-sdk");
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
/**
 * Upload a temporary generated file to s3. This function knows nothing about
 * the post object. It is simply given a local file and a remote key for
 * uploading.
 */
async function uploadFile(srcFilePath, s3FilePath) {
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
}
/**
 * Downloads a remote image to a local directory.
 */
async function downloadFile(url, tmpFilePath) {
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
}
