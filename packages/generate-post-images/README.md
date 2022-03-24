# @seancdavis/meta-image-generator

Automatically generates feature and meta images for posts that have not specified an image.

Note: This code is very specific to this project and is tightly-coupled to the script in `www/scripts/generate-images.js`, which can be run via `npm run generate-images` from the `www` directory.

## How it Works

The main script (`dist/index.js`) exports a `generateImages` function which takes a single option: `postsDir`, the directory containing posts with an `.md` file extension.

It looks in this directory, extracts those who haven't specified an image, then generates both a generic image and a meta image (with title embedded). It uploads both images to the appropriate location on S3 and stores the reference back on the post.

## Developing

When developing, run the TS compiler:

    npm run dev

We're tracking the builds in `dist` because it's used directly in this workspace.
