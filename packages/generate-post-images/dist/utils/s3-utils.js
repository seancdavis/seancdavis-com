"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = uploadFile;
const client_s3_1 = require("@aws-sdk/client-s3");
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
    const s3 = new client_s3_1.S3Client({});
    const params = {
        Body: fs_1.default.readFileSync(srcFilePath),
        Bucket: bucket,
        Key: s3FilePath,
        ContentType: "image/png",
    };
    await s3.send(new client_s3_1.PutObjectCommand(params));
    const msg = `Uploaded meta image to: https://${bucket}.s3.amazonaws.com/${s3FilePath}`;
    console.log(msg);
    return s3FilePath;
}
