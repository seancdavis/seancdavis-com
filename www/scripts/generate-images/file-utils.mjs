import fs from "fs";
import path from "path";
import AWS from "aws-sdk";

/**
 * Given the path to a content item, return a path at which to store a temporary
 * png image.
 *
 * @param filePath string - path to the content item file (not the image)
 * @param tmpDir string - full path to the tmp directory
 * @returns string - full path on where to store image
 */
export function tmpImagePath(filePath, tmpDir) {
  const tmpBasename = path.basename(filePath, path.extname(filePath));
  return path.join(tmpDir, `${tmpBasename}.png`);
}

/**
 * Upload a temporary generated file to s3. Filename of temp file must have a
 * preceding date string as YYYY-MM-DD, as upload path will follow this format:
 *
 *    [prefix]/[date]/[tmpFilename]
 *
 * @param filePath string - full path to the temporary generated file
 * @param prefix string - directory in which to upload the file (content type)
 * @returns upload path in s3 (without preceding slash)
 */
export async function uploadFile(filePath, prefix) {
  if (process.env.SKIP_S3_UPLOAD) return false;

  const bucket = process.env.AWS_BUCKET;
  const basename = path.basename(filePath, path.extname(filePath));
  const dateStr = basename.match(/^\d{4}-\d{2}-\d{2}/)[0];
  const uploadPath = `${prefix}/${dateStr}/${basename}.png`;

  const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  const params = {
    Body: fs.readFileSync(filePath),
    Bucket: bucket,
    Key: uploadPath,
    ContentType: "image/png",
  };

  return new Promise((resolve, reject) => {
    s3.putObject(params, (err) => {
      if (err) return reject(err, err.stack);
      const msg = `Uploaded meta image to: https://${bucket}.s3.amazonaws.com/${uploadPath}`;
      console.log(msg);
      resolve(uploadPath);
    });
  });
}

/**
 * Store a reference to the image uploaded to s3. (Adds a preceding slash, since
 * s3 uploads do not require it.)
 *
 * @param filePath string - full path to the content item
 * @param imagePath string - path to the uploaded image on s3
 * @returns result of fs.writeFileSync()
 */
export function storeImageRef(filePath, imagePath) {
  const rawContent = fs.readFileSync(filePath).toString();
  const newFileContent = rawContent.replace(
    /^---/,
    `---\nimage: /${imagePath}`
  );
  return fs.writeFileSync(filePath, newFileContent);
}
