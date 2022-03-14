import AWS from "aws-sdk";
import fs from "fs";
import path from "path";

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
 * Get the filename (with extension), basename (without extension), date, slug
 * (basename without date) from a filename or file path.
 *
 * @param {string} filePath Full (or partial) path to the file
 * @returns {object} { filename, basename, date, slug }
 */
export function filenameParts(filePath) {
  const filename = path.basename(filePath);
  const basename = path.basename(filePath, path.extname(filePath));
  const dateMatcher = basename.match(/^\d{4}-\d{2}-\d{2}/);
  const date = dateMatcher ? dateMatcher[0] : null;
  const slug = basename.replace(`${date}-`, "");
  return { filename, basename, date, slug };
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
export async function uploadFile(filePath, prefix, uploadDirType = "date") {
  if (process.env.SKIP_S3_UPLOAD) return false;

  const filename = filenameParts(filePath);
  let uploadPath = `${prefix}/`;
  if (uploadDirType) uploadPath += `${filename[uploadDirType]}/`;
  uploadPath += filename.filename;

  const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  const params = {
    Body: fs.readFileSync(filePath),
    Bucket: process.env.AWS_BUCKET,
    Key: uploadPath,
    ContentType: "image/png",
  };

  return new Promise((resolve, reject) => {
    s3.putObject(params, (err) => {
      if (err) return reject(err, err.stack);
      const msg = `Uploaded file to: https://${bucket}.s3.amazonaws.com/${uploadPath}`;
      console.log(msg);
      resolve(uploadPath);
    });
  });
}

/**
 * Given a key (s3 file path), download a file to the tmp directory.
 *
 * @param {string} s3Path S3 key - path to the file
 * @returns {Promise<string>} Full local file path
 */
export async function downloadFile(s3Path) {
  const filename = path.basename(s3Path);
  const tmpFilePath = path.join(process.cwd(), "tmp", filename);

  const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: s3Path.startsWith("/") ? s3Path.slice(1) : s3Path,
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, res) => {
      if (err) return reject(err, err.stack);
      fs.writeFileSync(tmpFilePath, res.Body);
      resolve(tmpFilePath);
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
