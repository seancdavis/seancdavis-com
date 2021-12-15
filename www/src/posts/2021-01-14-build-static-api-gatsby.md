---
title: "How to Build a Static API with Gatsby"
description: "Learn how to use Gatsby to deliver content to other front-ends in a super speedy way!"
tags:
  - api
  - gatsby
  - jamstack
image: /posts/210114/meta--gatsby-static-api.jpg
---

This article is part of a series of tutorials on building a _Static API_. You can view the full list of available static API tutorials in [the introductory article](/posts/how-to-build-static-api), which also provides some background on the examples we're using here.

If you'd like additional information on what a static API is, check out [_WTF is a Static API?_](/posts/lets-talk-about-static-apis)

---

We're going to walk through building a static API using [GatsbyJS](https://www.gatsbyjs.org/). Gatsby is a [static site generator](https://www.staticgen.com/) written in [JavaScript](/posts/wtf-is-javascript), built on top of [React](https://reactjs.org/), a JavaScript framework for building out UI components.

If you're a visual learner and prefer the screencast approach, here is a video, which walks through _most of_ the steps in this tutorial.

{% youtube_embed
    id="bvLQ9nD2jLQ",
    title="Building a Static API with GatsbyJS" %}

The written tutorial follows. But if you're just looking for the code reference, [you can find that here](https://github.com/seancdavis/seancdavis-com/tree/main/examples/gatsby-static-api).

---

It's worth mentioning before we get started that, while the best tool for the job is often the one you're familiar with, Gatsby isn't very well-suited for building out static APIs. Its power lies in providing elegance in building complex UI structures and pages with ease.

If you're already working with Gatsby and simply want a way to serve JSON files, then you may only want [an intro into programmatically creating JSON pages with Gatsby](/posts/programmatically-create-json-pages-gatsby/). Note that, while this tutorial has all the code you'll need to get started building a static API with Gatsby, there is some background information in the JSON pages article that will provide further explanation as to _why_ we're taking the approach we are here.

## Step 1: Project Setup

If you don't already have a Gatsby project, let's get setup first. I called my project `gatsby-static-api`, but you can swap that out for whatever you'd like:

    $ gatsby new gatsby-static-api
    $ cd gatsby-static-api

Start the development server to make sure everything is in order:

    $ npm run develop

Once that is running, visit [http://localhost:8000/](http://localhost:8000/) and you should see Gatsby's default starter layout.

## Step 2: Add Data Files

Now that we're rolling with Gatsby, let's add our data source, which we're going to consider to be local YAML files. The data examples come from [the intro article](/posts/how-to-build-static-api).

We're using YAML in this project because that's been my approach throughout the various static API tutorials I've written. It likely makes more sense for you to use a data source familiar to your project. ([See the JSON pages article for a few examples](/posts/programmatically-create-json-pages-gatsby/).)

Let's put these files in a `data` directory, again, for consistency among my other tutorials. But you can put them wherever you'd like, you'll just want to update configuration values accordingly.

`data/earworms/2020-03-29.yml` {.filename}

```yaml
---
song_id: 1
date: 2020-03-29
title: Perfect Illusion
artist: Lady Gaga
spotify_url: https://open.spotify.com/track/56ZrTFkANjeAMiS14njg4E?si=oaaJCMbiTw2NqYK-L7CSEQ
```

`data/earworms/2020-03-30.yml` {.filename}

```yaml
---
song_id: 2
date: 2020-03-30
title: Into the Unknown
artist: Idina Menzel
spotify_url: https://open.spotify.com/track/3Z0oQ8r78OUaHvGPiDBR3W?si=__mISyOgTCy0nzyoumBiUg
```

`data/earworms/2020-03-31.yml` {.filename}

```yaml
---
song_id: 3
date: 2020-03-31
title: Wait for It
artist: Leslie Odom Jr.
spotify_url: https://open.spotify.com/track/7EqpEBPOohgk7NnKvBGFWo?si=eceqQWGATkO1HJ7n-gKOEQ
```

{% callout type="note" %}
If you've looked at other static API articles I've written, I'm typically using `id` as the unique identifier for these data objects. However, Gatsby's GraphQL service reserves `id` as field on these objects. Therefore, we're going to use `song_id` as our unique identifier.
{% endcallout %}

## Step 3: Query Data Files

Next, let's see how we can access the data via GraphQL. You can learn more about Gatsby's use of GraphQL [here](https://www.gatsbyjs.org/docs/graphql/).

    $ npm install --save-dev gatsby-transformer-yaml

Then configure the plugin. Note here that we're also adding configuration for a `gatsby-source-filesystem` plugin. That plugin comes installed by default with Gatsby's default starter. You can have more than one instance of `gatsby-source-filesystem`.

`gatsby-config.js` {.filename}

```js
module.exports = {
  // ...
  plugins: [
    // ...
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `earworms`,
        path: `${__dirname}/data/earworms`,
      },
    },
    `gatsby-transformer-yaml`,
    // ...
  ],
};
```

In this case, we're telling Gatsby to _source_ data files in `data/earworms`. The combination of these two plugins is what will enable us to query the data files through GraphQL.

Stop and restart your dev server. Then [visit GraphiQL](<http://localhost:8000/__graphiql?query=%7B%0A%20%20allEarwormsYaml%20%7B%0A%20%20%20%20edges%20%7B%0A%20%20%20%20%20%20node%20%7B%0A%20%20%20%20%20%20%20%20song_id%0A%20%20%20%20%20%20%20%20date(formatString%3A%20%22YYYY-MM-DD%22)%0A%20%20%20%20%20%20%20%20artist%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20spotify_url%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A>) at [http://localhost:8000/\_\_graphiql](http://localhost:8000/__graphiql) with this query:

```graphql
{
  allEarwormsYaml {
    edges {
      node {
        song_id
        date(formatString: "YYYY-MM-DD")
        artist
        title
        spotify_url
      }
    }
  }
}
```

Run the query, which should show the following on the right-side pane:

```json
{
  "data": {
    "allEarwormsYaml": {
      "edges": [
        {
          "node": {
            "song_id": 1,
            "date": "2020-03-29",
            "artist": "Lady Gaga",
            "title": "Perfect Illusion",
            "spotify_url": "https://open.spotify.com/track/56ZrTFkANjeAMiS14njg4E?si=oaaJCMbiTw2NqYK-L7CSEQ"
          }
        },
        {
          "node": {
            "song_id": 2,
            "date": "2020-03-30",
            "artist": "Idina Menzel",
            "title": "Into the Unknown",
            "spotify_url": "https://open.spotify.com/track/3Z0oQ8r78OUaHvGPiDBR3W?si=__mISyOgTCy0nzyoumBiUg"
          }
        },
        {
          "node": {
            "song_id": 3,
            "date": "2020-03-31",
            "artist": "Leslie Odom Jr.",
            "title": "Wait for It",
            "spotify_url": "https://open.spotify.com/track/7EqpEBPOohgk7NnKvBGFWo?si=eceqQWGATkO1HJ7n-gKOEQ"
          }
        }
      ]
    }
  }
}
```

## Step 4: Write Earworms Listing JSON File

Unlike the typical path for [creating dynamic pages with Gatsby](https://www.gatsbyjs.org/tutorial/part-seven/), this process will look much different. Instead of building _pages_, we're going to copy the results of the query into files and write those files directly in the `public` directory.

This approach has a few caveats. Perhaps the biggest is that **it will only work when _building_ the project**, and not in development mode. I'm sure there is a way to get there, but it's not an easy path, and we're not covering that in this article.

Here is the code:

`gatsby-node.js` {.filename}

```js
const fs = require("fs");

exports.onPostBuild = async ({ graphql }) => {
  graphql(`
    {
      earworms: allEarwormsYaml {
        edges {
          node {
            song_id
            date(formatString: "YYYY-MM-DD")
            artist
            title
            spotify_url
          }
        }
      }
    }
  `).then((result) => {
    // A reference to where we are going to put the files.
    const earwormsPath = "./public/earworms";

    // Collect the data for all earworms
    const earworms = result.data.earworms.edges.map(({ node }) => node);

    // Query result for the index file.
    const allEarworms = {
      result: earworms,
      meta: {
        count: earworms.length,
      },
    };

    // Write the index file.
    fs.writeFileSync(`${earwormsPath}.json`, JSON.stringify(allEarworms));
  });
};
```

Here's what going on:

- Tap into the [`onPostBuild`](https://www.gatsbyjs.org/docs/node-apis/#onPostBuild) Node API from Gatsby, which means that all this code gets run _after_ the build has already completed. We do this because Gatsby is done writing files, but has already created the `public` directory, so everything is setup for us.
- Loop through the results and write a file to `public/earworms.json` containing the results from the query, along with a meta object in which we can stuff query information.

Once you have this code in place, build the project:

    $ npm run build

Then we can serve the `public` directory. Gatsby has a utility for this, but you could also use [http-server](https://www.npmjs.com/package/http-server) or similar.

    $ npm run serve

We put the file at `public/earworms.json`, which means it should be available at [http://localhost:9000/earworms.json](http://localhost:9000/earworms.json). Open that up in the browser and you should see the data. (Note: When _serving_, it's localhost at port **9000**, not 8000, which is what the dev server uses.)

```json
{
  "result": [
    {
      "song_id": 2,
      "date": "2020-03-30",
      "artist": "Idina Menzel",
      "title": "Into the Unknown",
      "spotify_url": "https://open.spotify.com/track/3Z0oQ8r78OUaHvGPiDBR3W?si=__mISyOgTCy0nzyoumBiUg"
    },
    {
      "song_id": 3,
      "date": "2020-03-31",
      "artist": "Leslie Odom Jr.",
      "title": "Wait for It",
      "spotify_url": "https://open.spotify.com/track/7EqpEBPOohgk7NnKvBGFWo?si=eceqQWGATkO1HJ7n-gKOEQ"
    },
    {
      "song_id": 1,
      "date": "2020-03-29",
      "artist": "Lady Gaga",
      "title": "Perfect Illusion",
      "spotify_url": "https://open.spotify.com/track/56ZrTFkANjeAMiS14njg4E?si=oaaJCMbiTw2NqYK-L7CSEQ"
    }
  ],
  "meta": {
    "count": 3
  }
}
```

## Step 5: Create Individual Earworm Files

At the bottom of our `gatsby-node.js` file, within the `onPostBuild` process, we'll add a few more lines of code that will write an individual file for each earworm inside a `public/earworms` directory.

`gatsby-node.js` {.filename}

```js
// Create directory for individual files if it doesn't exist.
if (!fs.existsSync(earwormsPath)) fs.mkdirSync(earwormsPath);

// Write individual files.
earworms.map((worm) => {
  fs.writeFileSync(
    `${earwormsPath}/${worm.song_id}.json`,
    JSON.stringify(worm)
  );
});
```

Once that it is in place, you can rebuild, then serve, and visit `/earworms/[id].json` for any one of the data objects you have. For example, the first song is available at [http://localhost:9000/earworms/1.json](http://localhost:9000/earworms/1.json). Visit that link and you should see the following:

```json
{
  "song_id": 1,
  "date": "2020-03-29",
  "artist": "Lady Gaga",
  "title": "Perfect Illusion",
  "spotify_url": "https://open.spotify.com/track/56ZrTFkANjeAMiS14njg4E?si=oaaJCMbiTw2NqYK-L7CSEQ"
}
```

That's it! Now you have a static API with Gatsby.

As we wrap, I'd like to mention again that if you're taking this approach, I'd suggest taking a step back and considering if Gatsby is the right tool for the job. I've written the article because, in some cases, in absolutely is. If you're already using Gatsby for a project and are using this data within the project, but also want to serve JSON files, then this is a great solution. But if you're just getting started with static APIs and happen to know Gatsby or React, this isn't the best way to go. I'd work with a framework that's a little more suited for delivering simple, static files, like [Eleventy](https://www.11ty.dev/) or [Jekyll](https://jekyllrb.com/).

## References

- [Code on GitHub](https://github.com/seancdavis/seancdavis-com/tree/main/examples/gatsby-static-api)
- [Programmatically Create JSON Pages with Gatsby](/posts/programmatically-create-json-pages-gatsby/)
- [Video tutorial](https://youtu.be/bvLQ9nD2jLQ)
