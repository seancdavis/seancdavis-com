import { S3 } from "aws-sdk";
import https from "https";
import fs from "fs";

/**
 * Upload a temporary generated file to s3. This function knows nothing about
 * the post object. It is simply given a local file and a remote key for
 * uploading.
 */
export async function uploadFile(srcFilePath: string, s3FilePath: string) {
  if (process.env.SKIP_S3_UPLOAD) return false;

  const bucket = process.env.AWS_BUCKET;

  const s3 = new S3({ apiVersion: "2006-03-01" });
  const params = {
    Body: fs.readFileSync(srcFilePath),
    Bucket: bucket!,
    Key: s3FilePath,
    ContentType: "image/png",
  };

  return new Promise((resolve, reject) => {
    s3.putObject(params, (err) => {
      if (err) return reject(err);
      const msg = `Uploaded image: https://${bucket}.s3.amazonaws.com/${s3FilePath}`;
      console.log(msg);
      resolve(s3FilePath);
    });
  });
}

/**
 * Downloads a remote image to a local directory.
 */
export async function downloadFile(
  url: string,
  tmpFilePath: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(tmpFilePath);
    https.get(url, (response) => {
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
