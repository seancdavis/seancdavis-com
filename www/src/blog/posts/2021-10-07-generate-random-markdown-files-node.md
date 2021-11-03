---
title: Generate Random Markdown Files with Node
description: When writing some script or program that works with markdown files, it's nice to not have to generate them manually. Here's a script to get the job done for you.
image: /blog/211006/orange--random-markdown.png
tags:
  - javascript
  - markdown
  - node
---

Let's write a little [Node.js](/blog/wtf-is-node/) script that generates a series of 10 random markdown files in a `content` directory. We'll consider these to be blog posts, where each post has a `title`, `date`, and `author` displayed as frontmatter, and a `body` that gets rendered as the main content area of the file.

Here's an example of the structure of a post object:

```json
{
  "title": "ab modi atque veniam qui",
  "date": "2020-10-15T11:10:48.279Z",
  "author": "Lillian Zieme",
  "body": "Harum qui est doloribus ad ipsam corrupti rerum repudiandae. Iusto veniam sunt. Fuga rem sint. Illo aliquid laudantium ullam itaque a.\n\nDebitis qui quia. Sapiente et labore eum. Ratione nostrum beatae ea non reprehenderit cumque necessitatibus. Molestias reprehenderit rerum repudiandae sit tenetur occaecati aut. Veniam ipsam qui cupiditate officiis et nostrum et nam.\n\nQuae molestiae earum et ipsum est ea nisi et. Perspiciatis reiciendis minus eos vel magnam ut voluptatibus. Voluptas corrupti incidunt aut id quia velit et magnam. Quibusdam ut laudantium ab minus eos reiciendis. Et rerum ex animi. Ut voluptatem harum quae."
}
```

And when written to a markdown file, would look like this:

```markdown
---
title: ab modi atque veniam qui
date: 2020-10-15T11:10:48.279Z
author: Lillian Zieme
---

Harum qui est doloribus ad ipsam corrupti rerum repudiandae. Iusto veniam sunt. Fuga rem sint. Illo aliquid laudantium ullam itaque a.

Debitis qui quia. Sapiente et labore eum. Ratione nostrum beatae ea non reprehenderit cumque necessitatibus. Molestias reprehenderit rerum repudiandae sit tenetur occaecati aut. Veniam ipsam qui cupiditate officiis et nostrum et nam.

Quae molestiae earum et ipsum est ea nisi et. Perspiciatis reiciendis minus eos vel magnam ut voluptatibus. Voluptas corrupti incidunt aut id quia velit et magnam. Quibusdam ut laudantium ab minus eos reiciendis. Et rerum ex animi. Ut voluptatem harum quae.
```

## Step 1: Setup

First, let's start with a fresh project. I have [a handy guide](/blog/new-javascript-project-setup/) that walks through the process of setting up [JavaScript](/blog/wtf-is-javascript/) projects, if that's not super familiar to you.

For Step 4 in the setup, we're going to install the following dependencies:

    npm install faker glob slugify yaml

Add for Step 5 in the setup, we'll add the following script to `package.json`:

`package.json` {.filename}

```json
{
  "generate": "node scripts/generate.js"
}
```

## Step 2: Generate Random Post Data

Let's begin by adding our script to `scripts/generate.js`. In that file, let's write a single function that generates random post data and logs it to the console.

We'll use the [faker](https://www.npmjs.com/package/faker) JS library that is really helpful when generating random data.

`scripts/generate.js` {.filename}

```js
const faker = require("faker")

function generateRandomPost() {
  return {
    title: faker.lorem.words(5),
    date: faker.date.past(1),
    author: faker.name.findName(),
    body: faker.lorem.paragraphs(3).replace(/\n/gi, "\n\n")
  }
}

console.log(generateRandomPost())
```

And now run the script

    npm run generate

Hooray! That should have printed something like this to your terminal.

```text
{
  title: 'velit et rem ipsam illum',
  date: 2021-08-25T23:09:05.986Z,
  author: 'Andy Trantow',
  body: 'Consequatur sint quidem. Optio quidem voluptas enim sint aspernatur sit ut. Tempore provident dolor. Quo nostrum quisquam velit dolorum.\n' +
    '\n' +
    ' \rEt quaerat nesciunt eveniet cum consequuntur aut porro. Praesentium optio inventore ea. Saepe consequatur dignissimos beatae quibusdam laudantium ab quam. Commodi voluptatem et perspiciatis earum nostrum ab. Maiores vel voluptatibus atque et qui ad tenetur enim rerum.\n' +
    '\n' +
    ' \rCorrupti sed placeat dicta rerum. Impedit doloremque vero saepe sunt labore dolorem quia. Exercitationem culpa ut eum accusantium et minus cum ut.'
}
```

## Step 3: Convert Object to Markdown

Next, we're going to add a function that takes a post object and converts it to markdown.

`scripts/generate.js` {.filename}

```js/1,3-7,18-19
const faker = require("faker")
const yaml = require("yaml")

function formatMarkdown(post) {
  const { body } = post
  delete post.body
  return `---\n${yaml.stringify(post)}---\n\n${body}\n`
}

function generateRandomPost() {
  return {
    title: faker.lorem.words(5),
    date: faker.date.past(1),
    author: faker.name.findName(),
    body: faker.lorem.paragraphs(3).replace(/\n/gi, "\n\n")
  }
}

const post = generateRandomPost()
console.log(formatMarkdown(post))
```

Run it again and you should now see a nicely-formatted markdown string that we'll be able to write to file.

`content/quia-quia-occaecati-aperiam-quia.md` {.filename}

```markdown
---
title: quia quia occaecati aperiam quia
date: 2021-05-20T06:22:30.025Z
author: Melba Cremin
---

Consectetur tenetur voluptatum. Ut totam ut facilis quae. Quis architecto sunt sit possimus perspiciatis quo. Veritatis praesentium omnis vero reprehenderit. Eos exercitationem voluptatibus molestiae deleniti ex earum debitis sint ullam. Et nemo id itaque.

Non laboriosam odio non. Sapiente qui quis fuga neque aliquid quia. Fugiat ea amet accusamus expedita eveniet dolorem architecto. Voluptatem in aliquam. Modi deserunt eos inventore eaque.

Autem reiciendis veritatis nihil fugiat officia enim maxime. Aperiam est sit excepturi adipisci et sed facere officiis. Ipsum maiores tenetur impedit nihil tempora. Et eligendi est deleniti quidem voluptas ab.
```

## Step 4: Write to File

Next, let's add a function that calls these other two functions and then writes the resulting markdown string to file. It will create the filename based on the title of the post using the [slugify](https://www.npmjs.com/package/slugify) JS library.

`scripts/generate.js` {.filename}

```js/1-3,6,23-32,34
const faker = require("faker")
const fs = require("fs")
const path = require("path")
const slugify = require("slugify")
const yaml = require("yaml")

const postsDir = path.join(__dirname, "../content")

function formatMarkdown(post) {
  const { body } = post
  delete post.body
  return `---\n${yaml.stringify(post)}---\n\n${body}\n`
}

function generateRandomPost() {
  return {
    title: faker.lorem.words(5),
    date: faker.date.past(1),
    author: faker.name.findName(),
    body: faker.lorem.paragraphs(3).replace(/\n/gi, "\n\n")
  }
}

function generateFile() {
  // Get the content
  const post = generateRandomPost()
  const markdownContent = formatMarkdown(post)
  // Resolve the filename
  const basename = slugify(post.title, { strict: true, lower: true })
  const filePath = path.join(postsDir, `${basename}.md`)
  // Write the file
  fs.writeFileSync(filePath, markdownContent)
}

generateFile()
```

{% callout type="warning" %}
This is _not_ protecting against duplicate files. If we generate a title we already have that would result in a duplicate slug, the new content will overwrite the old.
{% endcallout %}

{% callout type="note" %}
I like to extract configurable variables and place them near the top. That's why `postsDir` is so far removed from `generateFile()`. I find it makes the values easier to swap in and out.

For something you want to maintain over time, you'd probably use a library like [Yargs](https://www.npmjs.com/package/yargs) to allow input when running the script.
{% endcallout %}

Run the script and ... _it doesn't work!_ You probably saw an error message like this:

```
Error: ENOENT: no such file or directory, open '/path/to/content/nihil-quod-eius-repellendus-earum.md'
```

That's because the directory we told the script to write the files to a directory that doesn't exist.

{% callout type="tip" %}
You could create the directory, add it to `.gitignore` (if you don't want to track the files in it), and put a `.gitkeep` file in there to be confident the directory is going to exist.

To have _the most_ confidence you should write the logic into the script, but I'm being lazy just to keep things simple.
{% endcallout %}

After you create the `content` directory (or add the logic to the script) and run again, you should see a file in there.

## Step 5: Add the Loop

Last, let's add a total number of files we want to generate, and then iterate that number of times, creating a file for each.

`scripts/generate.js` {.filename}

```js/7,35
const faker = require("faker")
const fs = require("fs")
const path = require("path")
const slugify = require("slugify")
const yaml = require("yaml")

const postsDir = path.join(__dirname, "../content")
const numPosts = 10

function formatMarkdown(post) {
  const { body } = post
  delete post.body
  return `---\n${yaml.stringify(post)}---\n\n${body}\n`
}

function generateRandomPost() {
  return {
    title: faker.lorem.words(5),
    date: faker.date.past(1),
    author: faker.name.findName(),
    body: faker.lorem.paragraphs(3).replace(/\n/gi, "\n\n")
  }
}

function generateFile() {
  // Get the content
  const post = generateRandomPost()
  const markdownContent = formatMarkdown(post)
  // Resolve the filename
  const basename = slugify(post.title, { strict: true, lower: true })
  const filePath = path.join(postsDir, `${basename}.md`)
  // Write the file
  fs.writeFileSync(filePath, markdownContent)
}

Array(numPosts).fill().map(generateFile)
```

Run it again and you should see 10 files in the `content` directory (11 if you haven't cleared out the first one).

## Code Reference

I created a more elaborate example project that generates meta images for each post. Take a look [here](https://github.com/seancdavis/seancdavis-com/tree/2741fbaa7b6da7f0f186fed5d2a4dcc4d174c943/examples/generate-meta-images). There is some detail in the README file. And there's more going on, but the general pattern is the similar.
