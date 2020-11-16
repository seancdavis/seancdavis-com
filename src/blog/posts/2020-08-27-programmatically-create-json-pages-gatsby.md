---
title: Programmatically Creating JSON Pages with GatsbyJS
description: "Learn how to generate static JSON pages from markdown files and external data using the Gatsby static site generator."
tags:
  - gatsby
  - jamstack
image: /blog/200827/meta--gatsby-dynamic-json-pages.jpg
twitter_card: summary_large_image
---

As I've been exploring [static APIs](/lets-talk-about-static-apis) over the past few months, I've been adding tutorials to [an introductory example](/how-to-build-static-api) using various tools and frameworks.

As I look to add [Gatsby](https://www.gatsbyjs.org/) to that list, I wondered ... _How could I programmatically generate JSON pages from a data source with Gatsby?_ It doesn't seem straightforward out of the box because Gatsby is essentially a React app with pre-rendering. It's built to output [HTML](/wtf-is-html), [CSS](/wtf-is-css), and [JavaScript](/wtf-is-javascript) files.

So I went looking for an answer and found [this](https://spectrum.chat/gatsby-js/general/generating-json-file-with-gatsby~c539d9a7-970c-4a52-ac79-18a51f254537) from Gatsby's creator, [Kyle Mathews](https://twitter.com/kylemathews):

> You could create these in your site's gatsby-node.js file. Implement `onPostBuild` and query for the data you need and then write them out to JSON files in the `public` folder e.g.

The code he referenced was this:

```js
exports.onPostBuild = ({ graphql }) = {
  graphql(QUERY).then(result => processAndWriteJSONFiles(result))
}
```

This was seemed like a great way to get started, so that's where we'll begin. We're going to take this approach and walk through how to programmatically generate JSON pages with Gatsby. We'll explore first how to use markdown files as the data source, before closing by quickly exploring how that differs from using an external API data source, like a headless CMS.

## Asking Why

Before we begin, I find it good to stop for a minute and ask, "Why?"

Why are you generating JSON pages using Gatsby? Is it because Gatsby is what you know? Is it because your Gatsby site is going to use this data?

I ask this because Gatsby is really built to shine when it comes to building static web pages. While we can generate JSON files on build, Gatsby is not optimized for that purpose, and we'll run into a few tradeoffs as a result.

For example, this solution won't work in development because it will write the files to the `public` directory, which is used in the build process. To incorporate into dev would is theoretically possible, but it would take additional effort, and we're not going to cover that here.

In other words, before you dig in further, I'd recommend taking a step back and considering _why_ you're taking this approach and if there is another that would make more sense. Not sure about it? [Let's have a conversation](https://twitter.com/seancdavis29).

## The Approach

But if you've got a sound approach, then let's keep going. We're going to solve this in three steps:

1. Write logic into `gatsby-node.js` using `onPostBuild` API.
2. Retrieve data from data source.
3. Write data to file(s).

The first step will make use of [Gatsby's Node APIs](https://www.gatsbyjs.org/docs/node-apis/), specifically the [`onPostBuild` hook](https://www.gatsbyjs.org/docs/node-apis/#onPostBuild). At the time `onPostBuild` is run:

- The rest of the build is complete, files have been written, etc.
- Most other plugins have done their thing.
- GraphQL queries are available to retrieve data.

This will give us what we need to generate our JSON pages. Let's get to it.

## Our Example

For this example, we're going to assume we have blog post data and want to write that data to JSON files. In this case we're only going to work with a single blog post, but we'll write the code so that it's extendible to multiple posts.

Ultimately we want to end up with a result that looks like this:

```json
{
  "title": "My Post",
  "slug": "my-post",
  "date": "2020-06-05T10:31:54.720Z",
  "body": "<p>Hello world!</p>"
}
```

Okay, now we can actually get started. Hooray!

## Generating JSON Pages from Markdown Files

Let's begin by treating our data source as local markdown files.

The code you see below is wrapped up in a GitHub repository at [seancdavis/gatsby-json-pages-from-markdown](https://github.com/seancdavis/gatsby-json-pages-from-markdown).

And if you prefer to watch and listen rather than read, here is the corresponding video tutorial:

{% video_tutorial src="https://www.youtube.com/embed/qvSY-f4fHs8" %}

### Step 1: Setup Project

If you don't have a Gatsby project already, begin by creating one:

    $ gatsby new my-project
    $ cd my-project

### Step 2: Add Data Source Files

Add the blog post data to `src/content/posts/my-post.md`.

`src/content/posts/my-post.md` {.filename}

```md
---
title: My Post
date: 2020-06-05T10:31:54.720Z
---

Hello world!
```

### Step 3: Add Remark Transformer

Use the [gatsby-transformer-remark plugin](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/) to transform our markdown file(s) into data we can query with GraphQL. The first step is to install it:

    $ npm install --save gatsby-transformer-remark

Or, if you prefer Yarn (like I do):

    $ yarn add gatsby-transformer-remark

We'll also want the [gatsby-source-filesystem plugin](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/) to source the data before it is transformed. It's likely your project already has the filesystem plugin. If not, now is the time to install it.

Next, add the plugins to the configuration file:

`gatsby-config.rb` {.filename}

```js
module.exports = {
  plugins: [
    // ...
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/content/posts`
      }
    },
    `gatsby-transformer-remark`
    // ...
  ]
}
```

Notice that the filesystem plugin is pointing to the directory in which we put our markdown file. This is crucial. We need the filesystem plugin to source the data so the Remark plugin can transform it into nodes we can query through GraphQL.

In fact, let's take a minute and test that out to make sure we can query the data.

Start up your development server:

    $ gatsby develop

Then visit Gatsby's [GraphiQL](https://www.gatsbyjs.org/docs/running-queries-with-graphiql/) sandbox, which is usually available at [http://localhost:8000/\_\_\_graphql](http://localhost:8000/___graphql).

Let's query for all markdown files in the `src/content/posts` directory and see what we get.

```graphql
{
  allMarkdownRemark(
    filter: { fileAbsolutePath: { regex: "//src/content/posts//" } }
  ) {
    edges {
      node {
        frontmatter {
          title
          date
        }
        html
        fileAbsolutePath
      }
    }
  }
}
```

If you haven't worked with Gatsby's GraphQL conventions or the Remark plugin, here are a few notes to add some context:

- The Remark plugin creates nodes for every markdown file sourced by gatsby-source-filesystem. Here we use a filter so we only get back the files in the `src/content/posts` directory.
- The Gatsby convention is to nest collection-based queries (more than one result) into an `edges` and then a `node` object. It's a little weird at first, but it's enforced as a convention, so it'll become second nature real quick.
- The Remark plugin shoves all the data from the frontmatter (the top of the markdown file) into a `frontmatter` object. This is how we will get the title and date for our JSON object. Meanwhile it converts the body of the markdown file into HTML and presents it as an `html` field. And finally, we'll use `fileAbsolutePath` as a means to pull out the slug from the filename.

### Step 4: Pull it Together

Now that we know we can query the data properly, we can take that query and put it into our `gatsby-node.js` file, along with the logic to write the JSON files.

The file below is commented with what's going on in the appropriate lines.

`gatsby-node.js` {.filename}

```js
// fs dependency is a Node.js library for working with the filesystem.
const fs = require("fs")
// Path is a Node.js library with utilities for working with file paths.
const path = require("path")

// Use the onPostBuild Node API, which runs after the build has been completed.
// Note that we have to use an async function here because the Remark plugin
// writes the html property asynchronously.
exports.onPostBuild = async ({ graphql }) => {
  // Run the GraphQL query (from example above).
  await graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//src/content/posts//" } }
      ) {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fileAbsolutePath
            html
          }
        }
      }
    }
  `).then(result => {
    // A reference to where we are going to put the files. Note that the public
    // directory already exists because the build has been completed (since
    // we're in the onPostBuild hook).
    const postsPath = "./public/posts"

    // Collect the data for all earworms. This simply digs into the query result
    // and extracts the objects we care about.
    const posts = result.data.posts.edges.map(({ node }) => node)

    // If we don't already have the posts directory inside the public directory,
    // create it.
    if (!fs.existsSync(postsPath)) fs.mkdirSync(postsPath)

    // Loop through each (filtered) result from the query and write them to
    // file.
    posts.map(post => {
      // The slug is pulled from the name of the markdown file.
      const slug = path.basename(
        post.fileAbsolutePath,
        path.extname(post.fileAbsolutePath)
      )

      // We then combine the frontmatter object with the slug and body (the
      // converted HTML) to form our data object. This will give us the shape we
      // want as mentioned when we wrote the original markdown file.
      const data = {
        ...post.frontmatter,
        slug: slug,
        body: post.html
      }

      // Using the slug as the filename, write a file containing the data
      // object, after converting it to JSON format.
      fs.writeFileSync(`${postsPath}/${slug}.json`, JSON.stringify(data))
    })
  })
}
```

Run a build to see this in action.

    $ gatsby build

And take a look at `public/posts/my-post.json`. You should see the same JSON structure as mentioned at the beginning of the article.

Then run `gatsby serve` and you can check it out in the browser, likely at [http://localhost:9000/posts/my-post.json](http://localhost:9000/posts/my-post.json).

---

That's it! You did it!

But one last thing before we go is a note on taking the same approach, but using an external API as the data source.

## Accounting for External Data

If we wanted to achieve the same result, but our data source comes from an API, our approach is exactly the same.

This section also has a repository ([seancdavis/gatsby-json-pages-external-data](https://github.com/seancdavis/gatsby-json-pages-external-data)) and a video:

{% video_tutorial src="https://www.youtube.com/embed/LI6RtnW062U" %}

Consider if our post data lived in a headless CMS like [Sanity](https://www.sanity.io/). Instead of querying with `allMarkdownRemark`, we'd use `allSanityPost`. And the resulting data structure is a little different. Otherwise, it all looks pretty much the same.

After installing the [gatsby-source-sanity](https://www.gatsbyjs.org/packages/gatsby-source-sanity/) plugin, adjust the code in `gatsby-node.js` to look like this:

`gatsby-node.js` {.filename}

```js
const fs = require("fs")
const path = require("path")

exports.onPostBuild = async ({ graphql }) => {
  await graphql(`
    {
      posts: allSanityPost {
        edges {
          node {
            title
            date
            slug {
              current
            }
            body
          }
        }
      }
    }
  `).then(result => {
    const postsPath = "./public/posts"

    const posts = result.data.posts.edges.map(({ node }) => node)

    if (!fs.existsSync(postsPath)) fs.mkdirSync(postsPath)

    posts.map(post => {
      const data = { ...post, slug: post.slug.current }
      fs.writeFileSync(`${postsPath}/${data.slug}.json`, JSON.stringify(data))
    })
  })
}
```

If you have external data that doesn't have a Gatsby plugin you'll have to write your own support for it. That process is outside the scope of what we're talking about here.

---

Otherwise, that's it! As always, I hope this helped you in some way!

## References

- [Markdown Data Source Repository](https://github.com/seancdavis/gatsby-json-pages-from-markdown)
- [Markdown Data Source Video Tutorial](https://youtu.be/qvSY-f4fHs8)
- [Sanity Data Source Repository](https://github.com/seancdavis/gatsby-json-pages-external-data)
- [Sanity Data Source Video Tutorial](https://youtu.be/LI6RtnW062U)
