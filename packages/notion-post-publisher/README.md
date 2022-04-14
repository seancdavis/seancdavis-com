# @seancdavis/notion-post-publisher

This is a highly-opinionated package built to provide an automated workflow to publish posts to the `www` project using Notion.

## How it Works

The process is managed by a GitHub Action (Notion Post Publisher) that can be found in the `.github` directory in the root of the monorepo. It works like this:

1. Action runs a script in the `www` project that uses the `dist/index.js` file to kick off the publishing process, providing it configurable values.
1. The main script here looks at a specific Notion database (using environment variables) and retrieves posts in the `Draft: Ready` state.
1. Posts are then processed. After some light validation, the Notion page's properties are converted to frontmatter content, and the body is generated using opinionated mappers that transform Notion blocks into HTML/Nunjucks code supported by the `www` project. (Specific rules found below.)
1. Content for the post is then written to file in the `www` directory.
1. The GitHub workflow makes use of another action, which then opens a pull request with these new file changes.
1. Opening a pull request then triggers another workflow, which will generate an image for the post.
1. And if the post has any pending tweets, those won't be sent until after a successful Netlify build.

## Body Mapping Rules

A full list of supported blocks can be found in `src/lib/blocks`.

For the most part, Notion blocks are mapped to HTML as would be expected. There are a few types of blocks for which the `www` project supports Nunjucks shortcodes. In those cases, we use the shortcode.

There are a few special cases, laid out below.

### Images

Images are automatically uploaded to S3 at a path `uploads/[date]/[filename]`. That reference is then used with the `post_image` shortcode.

While both `file` and `external` Notion images are supported, because we use the filename directly, the URL must have an extension. This will happen automatically for `file` images, but not for `external` images. There is no expected error in place at this time. It may fail silently.

Images use the caption as the `alt` attribute. Rich text is not supported in captions.

### Handling Children

Notion is powerful (and clever) in the way it handles children. This script has limited support for children.

`callout` and `quote` blocks both support children. These children are flattened to a single level. They are then processed as blocks and the result used within the output markdown/nunjucks code.

The result is simpler, but similar to what you'd see in Notion — e.g. all children of a callout would end up in the same callout in the post.

### Callouts

Callouts have another special rule. They can have types. For the most part, that only changes the label text on the callout. The exception is the `warning` callout, which will have a yellow background.

These types are built using an emoji map, as Notion callouts support a consistent emoji option. The current supported map is this:

- ⚠️: `warning`
- ⚡: `tip`
- 📋: `tl;dr`
- 💡: `idea`

### Prerendering

Some blocks have a need for asynchronous processing. For example, an image block downloads the image and uploads it to S3. This must be done asynchronously.

These blocks have an async `prerender()` function and a check in their `render()` function to ensure the prerender function has been run before rendering. This is why there is so much goofy async logic throughout this code.

## TypeScript Notes

This was written in TypeScript as a learning exercise. Source files are written to a `dist` directory, and then consumed by the `www` project script.

The Notion types are difficult to work with. For that reason, I've redefined a few types. Though there may be exceptions, shared types can be found in the `src/types` directory.
