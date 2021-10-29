---
title: Generate Meta Images for Blog Posts with Node.js
description: Manually creating images for blog posts can be super time-consuming. Here's the foundation necessary for automatically generating meta images for content in markdown files.
image: /blog/211007/blue--meta-image.png
tags:
  - javascript
  - node
  - seo
---

I've written two posts recently that I wanted to put together to make something that you could practically apply in the wild. The first post is an intro on how to generate images by drawing on Canvas with Node.js (not yet published). The second is a quick lesson on [generating random markdown files](/blog/generate-random-markdown-files-node/).

What I'd like to do here is bring these together to create a script that will do the following:

1. Look through a directory of markdown files and parse them.
2. Generate meta images for those that don't have an `image` key in the frontmatter.
3. Store an `image` reference back to the post's frontmatter using the filename of the generated image.

## Example Code

The code I'm working with here can all be found [in this example project](https://github.com/seancdavis/seancdavis-com/tree/1c86b1f8e5333d5239caa10fd000be0e371997cb/examples/generate-meta-images).

## Step-by-Step

Usually I take these things step-by-step, building up to the final product. In this case, there's a lot going on.

Instead of the typical step-by-step instructions, we'll going to walk through the finished product and look at each pieces of the puzzle. I've broken up the code to support this approach — every file has one job to do (the classic _[single responsibility principle](/blog/wtf-is-single-responsibility-principle/)_).

That said, if you like following along step-by-step, you can absolutely start from scratch.

## Starting from Scratch

If you are starting from scratch, follow [my handy guide](/blog/new-javascript-project-setup/) to get setup with JavaScript projects.

### Dependencies

[Here are the dependencies to install](https://github.com/seancdavis/seancdavis-com/blob/1c86b1f8e5333d5239caa10fd000be0e371997cb/examples/generate-meta-images/package.json#L12-L19).

    npm install canvas faker glob gray-matter slugify yaml

### Scripts

And the scripts look [like this](https://github.com/seancdavis/seancdavis-com/blob/1c86b1f8e5333d5239caa10fd000be0e371997cb/examples/generate-meta-images/package.json#L5-L8).

`package.json` {.filename}

```json
{
  "scripts": {
    "generate:images": "node scripts/generate-images.js",
    "generate:files": "node scripts/generate-post-files.js"
  }
}
```

### Configuration File

I also wanted to extract the configurable values into a single place. So I created [a `config.js` file](https://github.com/seancdavis/seancdavis-com/blob/1c86b1f8e5333d5239caa10fd000be0e371997cb/examples/generate-meta-images/config.js) in the root of the project.

`config.js` {.filename}

```js
const path = require("path")

module.exports = {
  imagesDir: path.join(__dirname, "./images"),
  postsDir: path.join(__dirname, "./content"),
  randomPostCount: 10
}
```

### Directory Placeholders

Last thing is to create the `content` and `images` directories (or the values you put for those directories in `config.js`), where the markdown files and images will go. In this particular example, [I dropped a `.gitkeep` file in both](https://github.com/seancdavis/seancdavis-com/tree/1c86b1f8e5333d5239caa10fd000be0e371997cb/examples/generate-meta-images/content) and then ignored the [generated markdown and image files](https://github.com/seancdavis/seancdavis-com/blob/1c86b1f8e5333d5239caa10fd000be0e371997cb/examples/generate-meta-images/.gitignore).

## Generating Random Markdown Files

Let's get our hands dirty by starting with generating random markdown files. Let's look at [the script](https://github.com/seancdavis/seancdavis-com/blob/1c86b1f8e5333d5239caa10fd000be0e371997cb/examples/generate-meta-images/scripts/generate-post-files.js) in `scripts/generate-post-files.js`.

`scripts/generate-post-files.js` {.filename}

```js
const { generateRandomPost, writePostToFile } = require("../utils")
const config = require("../config")

Array(config.randomPostCount)
  .fill()
  .map(() => {
    const post = generateRandomPost()
    writePostToFile(post)
  })
```

Doesn't look too complicated, right? Here's what's happening:

1. Pull the `randomPostCount` value from `config.js` and [create an empty array with that many items which we can loop over](/blog/run-loop-n-times-javascript/).
2. For each iteration, generate the content for a random post object using a `generateRandomPost()` helper, then write the random post object to file using a `writePostToFile()` helper.

Let's take a look at what those helpers are doing.

### Generate Random Post

There's not a whole lot to [the `generateRandomPost()` function](https://github.com/seancdavis/seancdavis-com/blob/1c86b1f8e5333d5239caa10fd000be0e371997cb/examples/generate-meta-images/utils/generate-random-post.js) (in `utils/generate-random-post.js`).

`utils/generate-random-post.js` {.filename}

```js
const faker = require("faker")

module.exports = () => {
  return {
    title: faker.lorem.words(5),
    date: faker.date.past(1),
    author: faker.name.findName(),
    body: faker.lorem.paragraphs(3).replace(/\n/gi, "\n")
  }
}
```

It uses [the faker.js library](https://www.npmjs.com/package/faker) to generate some random content that we then shape into the structure of a post object.

### Write Post to File

Once we have a post object, we're ready to write it to file. This is done in `utils/write-post-to-file.js` ([see here](https://github.com/seancdavis/seancdavis-com/blob/1c86b1f8e5333d5239caa10fd000be0e371997cb/examples/generate-meta-images/utils/write-post-to-file.js)).

In this function, we extract the `body` from the post because it is treated as the main content area. The remaining attributes of the post are kept as frontmatter for the markdown file. We then convert the post object to a markdown string and write the string to a file, using a filename-friendly version of the title as the filename.

`utils/write-post-to-file.js` {.filename}

```js
const fs = require("fs")
const path = require("path")
const slugify = require("slugify")
const yaml = require("yaml")

const config = require("../config")

module.exports = post => {
  // Format the markdown by extracting the `body` key and treating the rest of
  // the object as frontmatter.
  const { body } = post
  delete post.body
  const content = `---\n${yaml.stringify(post)}---\n\n${body}\n`
  // Resolve the path to the post file, using the value set in config.js in the
  // project root.
  const basename = slugify(post.title, { strict: true, lower: true })
  const filename = `${basename}.md`
  const filePath = path.join(config.postsDir, filename)
  // Write the markdown string to file.
  fs.writeFileSync(filePath, content)
  return post
}
```

{% callout type="warning" %}
This is not checking for duplicate files. If there is a conflicting filename, this file simply overwrites the file in its way. If using this in a production capacity, you likely don't want to forcefully overwrite files like this.
{% endcallout %}

### Running the Script

Now that you see how it works, if you've copied the code above, you can try it for yourself.

    npm run generate:files

This should place 10 files (or whatever count you have in `config.js`) in your `content` directory.

Here's an example of a file:

`content/a-delectus-non-qui-quo.md` {.filename}

```markdown
---
title: a delectus non qui quo
date: 2021-03-27T23:39:32.902Z
author: Marta Leffler
---

Rerum dolores occaecati iure dolorem quod harum quis. Sint et perferendis et et et. Ipsam qui aut qui modi iste natus placeat et. Officia animi illo labore autem tenetur id. Qui sit rerum cupiditate voluptas inventore repellat error. Labore aut ut consectetur sequi aut ducimus dolorem minus perferendis.

Quia totam ea deserunt consequatur optio eum. Illum voluptatibus consequatur. Mollitia nisi sunt tenetur impedit velit. Et omnis quia eveniet necessitatibus earum.

Nulla voluptatem et libero. Est consequatur tempora qui. Magnam voluptas nemo est id culpa omnis facilis qui.
```

## Generate Missing Images

[The `scripts/generate-images.js` file](https://github.com/seancdavis/seancdavis-com/blob/1c86b1f8e5333d5239caa10fd000be0e371997cb/examples/generate-meta-images/scripts/generate-images.js) has a little more going on, but seems simple at first glance.

`scripts/generate-images.js` {.filename}

```js
const fs = require("fs")
const path = require("path")

const { generateImage, getPosts, writePostToFile } = require("../utils")

const run = async () => {
  // Loop through the posts.
  for (let post of getPosts()) {
    // If the post already has an image reference, continue.
    if (post.image) continue
    // Generate an image for the post.
    const imagePath = await generateImage(post)
    // Store a reference to the image.
    post = { ...post, image: path.basename(imagePath) }
    // Write the new post object back to file.
    await writePostToFile(post)
  }
}

run()
  .then(() => console.log("Done"))
  .catch(err => {
    console.error("\n", err)
    process.exit(1)
  })
```

Here's the logic:

1. We're using the `getPosts()` helper to retrieve all the existing posts (from the `content` directory).
2. If the post has specified an `image` in its frontmatter, we ignore it.
3. Otherwise, generate an image for the post.
4. Then save a reference to that image (using its filename) back to the post file's frontmatter.

### Retrieving Posts

The [the `utils/get-posts.js` helper](https://github.com/seancdavis/seancdavis-com/blob/1c86b1f8e5333d5239caa10fd000be0e371997cb/examples/generate-meta-images/utils/get-posts.js) contains the following logic:

1. Use [the glob library](https://www.npmjs.com/package/glob) to target all `.md` files in the `content` directory.
2. Read each one and use [gray-matter](https://www.npmjs.com/package/gray-matter) to parse it.
3. Put the frontmatter and main content back into the shape that matches our expected post shape (same as we had when generating a random post).
4. Return an array of post objects representing the files in the `content` directory.

Here's the code:

`utils/get-posts.js` {.filename}

```js
const fs = require("fs")
const glob = require("glob")
const matter = require("gray-matter")
const path = require("path")

const config = require("../config")

module.exports = () => {
  // Get post file paths.
  const postsPattern = path.join(config.postsDir, "*.md")
  const postFiles = glob.sync(postsPattern)
  // Loop through the paths to parse the posts.
  const posts = postFiles.map(file => {
    const fileContent = fs.readFileSync(file)
    const { data, content } = matter(fileContent)
    // `body` is set to the content of the post, while the frontmatter object is
    // sent directly.
    return { ...data, body: content }
  })
  // Return the array of objects.
  return posts
}
```

### Generating an Image for a Post

I'm not going to go into detail on this one. There's a lot going on, but it _mostly_ involves some cleaned up code from my post for LogRocket. Suffice to say, it accepts a _post_ object, generates an image for it, saves the image to the filesystem, and returns the path to that image.

### Storing the Image Reference

Back in our image generator script, we've received the file path for the image, so we can simply add that to the post object that we got from `getPosts()`, add the `image` attribute to it, and then call the `writePostToFile()` method (which we used when generating random posts) to write the new structure of the post back to file.

### Run it!

If you put this all together you can run it and see what happens.

    npm run generate:images

This will generate images for any post that isn't already referencing one. If I used the files generated from the `generate:files` script I shared above, I now have an image file at `images/2021-03-27-a-delectus-non-qui-quo.png`. (The date was added to the image filename to help ensure it will be unique)

{% post_image
    src="/blog/211007/2021-03-27-a-delectus-non-qui-quo.png",
    alt="Automatically generated meta image from example post" %}

{% callout type="note" %}
I pulled this from the LogRocket example, which is why the image is styled in this way.
{% endcallout %}

And if I look back at `content/a-delectus-non-qui-quo.md` I now see an `image` reference.

`content/a-delectus-non-qui-quo.md` {.filename}

```markdown
---
title: a delectus non qui quo
date: 2021-03-27T23:39:32.902Z
author: Marta Leffler
image: 2021-03-27-a-delectus-non-qui-quo.png
---

Rerum dolores occaecati iure dolorem quod harum quis. Sint et perferendis et et et. Ipsam qui aut qui modi iste natus placeat et. Officia animi illo labore autem tenetur id. Qui sit rerum cupiditate voluptas inventore repellat error. Labore aut ut consectetur sequi aut ducimus dolorem minus perferendis.

Quia totam ea deserunt consequatur optio eum. Illum voluptatibus consequatur. Mollitia nisi sunt tenetur impedit velit. Et omnis quia eveniet necessitatibus earum.

Nulla voluptatem et libero. Est consequatur tempora qui. Magnam voluptas nemo est id culpa omnis facilis qui.
```

## Put it into the Wild

It takes a lot for this to all come together, but I hope it was helpful for you. I'd be curious to learn how you applied it to your project.

[Let's chat on Twitter](https://twitter.com/seancdavis29).
