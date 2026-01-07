import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

/**
 * Upload a temporary generated file to s3. This function knows nothing about
 * the post object. It is simply given a local file and a remote key for
 * uploading.
 */
export async function uploadFile(srcFilePath: string, s3FilePath: string) {
  if (process.env.SKIP_S3_UPLOAD) return false;

  const bucket = process.env.AWS_BUCKET;

  const s3 = new S3Client({});
  const params = {
    Body: fs.readFileSync(srcFilePath),
    Bucket: bucket!,
    Key: s3FilePath,
    ContentType: "image/png",
  };

  await s3.send(new PutObjectCommand(params));
  const msg = `Uploaded meta image to: https://${bucket}.s3.amazonaws.com/${s3FilePath}`;
  console.log(msg);
  return s3FilePath;
}
