# @seancdavis/meta-image-generator

Automatically generates feature and meta images for posts that have not specified an image.

Note: This code is very specific to this project and is tightly-coupled to the script in `www/scripts/generate-images.js`, which can be run via `npm run generate-images` from the `www` directory.

## How it Works

The main script (`dist/index.js`) exports a `generateImages` function which takes a single option: `postsDir`, the directory containing posts with an `.md` file extension.

The process works like this:

1. Look through the `postsDir` for any `.md` file without an `image` ref in the frontmatter.
1. Instantiate a `Post` object for each of these files. (Really, there's already a Post object for every file, but we ignore the rest.)
1. Generate a random generic image to be used for the featured image.
1. Add the title and generate again (same background) for the meta image.
1. Upload both to s3 following the pattern: `posts/[YYMMDD]/[slug][--meta?].png`. `--meta` is appended for the meta image.
1. Store references to both images on the post.
1. Clean up the temporary images.

The GitHub workflow has a step in which it then commits any changes back to the repository on the current branch.

## Developing

When developing, run the TS compiler:

    npm run dev

We're tracking the builds in `dist` because it's used directly in this workspace.

## Testing

I've not written any tests for this. I _way_ over-engineered it, mostly as a TypeScript exercise.

I don't plan on this being around all that long. When I move to a new site, I'll simplify and harden this.

At this time, it's pretty easy to know if it worked or not by doing this:

1. Add a test post without an `image` ref in frontmatter.
1. Run `npm run generate-images` from the `www` project.
1. Check in S3 for the images and look on the post for the stored reference.

### Skip Uploads

To skip an upload during a run:

    SKIP_S3_UPLOAD=true npm run generate-images

### Skip Cleanup

If you want to debug locally, you can skip the cleanup:

    SKIP_CLEANUP=true npm run generate-images

### Skip Update

It can be annoying to keep resetting the test post when debugging.

    SKIP_UPDATE=true npm run generate-images
