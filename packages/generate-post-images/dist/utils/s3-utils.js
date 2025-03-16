"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const aws_sdk_1 = require("aws-sdk");
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
            const msg = `Uploaded meta image to: https://${bucket}.s3.amazonaws.com/${s3FilePath}`;
            console.log(msg);
            resolve(s3FilePath);
        });
    });
}
exports.uploadFile = uploadFile;
