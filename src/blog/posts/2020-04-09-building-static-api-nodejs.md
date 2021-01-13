---
title: Building a Static API with Node.js
description: Learn how to build a static API with Node.js. We'll write a node build script that converts local YAML files into a set of structured JSON output files.
tags:
  - api
  - jamstack
  - javascript
  - node
---

This is one of several tutorials on how to build a static API. For links to the other tutorials, and for some background on this tutorial, see [the introduction article](/blog/how-to-build-static-api/).

If you'd like further background on what a static API is and why we're going through this exercise, check out [_Let's Talk about Static APIs_](/blog/lets-talk-about-static-apis/).

---

This tutorial is going to walk through how you can build a static API without a static site generator, using a [Node.js](https://nodejs.org/en/) script.

_Shout out!_ I was inspired to go back to the basics for this particular tutorial (i.e. no static site generator) by [an article I read](https://css-tricks.com/creating-static-api-repository/) from [Eduardo Bouças](https://twitter.com/eduardoboucas). The tutorial you're currently reading aims to provide only a glimpse of what you can do with Node-built static APIs. If you find it valuable, I'd suggest checking out Eduardo's article, too, as it goes into much more detail.

Okay, let's get to it!

## Step 1: Project Setup

Since we're using a plain old node script here, there's no fancy command for getting everything setup. So let's begin by creating a directory for our project:

    $ mkdir project-name
    $ cd project-name

### Create `package.json`

Next, create a `package.json` file. You could do this manually, but I like to use Yarn's built-in `init` function:

    $ yarn init

_Note: I prefer [Yarn](https://yarnpkg.com/) over [NPM](https://docs.npmjs.com/cli/npm). You are welcome to use `npm` in the place of `yarn` throughout this tutorial, though you'll have to look up the equivalent commands._

You don't have to fill anything out when going through the `init` prompts. If you hit `return` through the steps, Yarn will fill in sensible defaults.

After completing that step, take a look at the `package.json` file. You should see the values you filled in (or the defaults).

### Install Dependencies

We're going to use three libraries (plus a couple built-in Node libraries) for our build script. Install them:

    $ yarn add js-yaml glob http-server

### Add `.gitignore`

Now we have a ton of files in `node_modules`. Assuming you're using [Git](https://git-scm.com), add [a `.gitignore` file](https://git-scm.com/docs/gitignore). (Note: We're adding the `build` directory here at this time, but won't use that until a little later.)

`.gitignore` {.filename}

```git
# Installed packages
node_modules/

# Build output
build/
```

## Step 2: Data Files

It's time to add our source data. These files come from [the introductory article](/blog/how-to-build-static-api/).

`data/earworms/2020-03-29.yml` {.filename}

```yaml
---
id: 1
date: 2020-03-29
title: Perfect Illusion
artist: Lady Gaga
spotify_url: https://open.spotify.com/track/56ZrTFkANjeAMiS14njg4E?si=oaaJCMbiTw2NqYK-L7CSEQ
```

`data/earworms/2020-03-30.yml` {.filename}

```yaml
---
id: 2
date: 2020-03-30
title: Into the Unknown
artist: Idina Menzel
spotify_url: https://open.spotify.com/track/3Z0oQ8r78OUaHvGPiDBR3W?si=__mISyOgTCy0nzyoumBiUg
```

`data/earworms/2020-03-31.yml` {.filename}

```yaml
---
id: 3
date: 2020-03-31
title: Wait for It
artist: Leslie Odom Jr.
spotify_url: https://open.spotify.com/track/7EqpEBPOohgk7NnKvBGFWo?si=eceqQWGATkO1HJ7n-gKOEQ
```

## Step 3: The Build Script

First, let's get setup. We're going to add two scripts to our `package.json` file. We do this to abstract the `build` and `serve` commands so that all you have to worry about is running `yarn build` or `yarn serve`, which are easier to remember (and can be consistent from project to project).

`package.json` {.filename}

```json
{
  // ...
  "scripts": {
    "build": "node bin/build.js",
    "serve": "http-server build -p 8000"
  }
}
```

The `build` command will run our `build` script, which we haven't created yet. And the `serve` command will run a web server in the `build` directory, which also doesn't exist yet. So let's make that happen.

### The Build Script

Here's the full build script, with comments so you can follow what's happening. There's not a ton to it, really. It runs through our data files and parses them. Then it prepares our build directories and writes the parsed data as JSON files in the appropriate location.

_Note: I like to put scripts in a `bin` directory so they are tucked away from the rest of the code. You're welcome to put this script anywhere you'd like, but will need to adjust the `build` script in your `package.json` file to point to the correct location._

`bin/build.js` {.filename}

```js
const fs = require("fs")
const glob = require("glob")
const path = require("path")
const yaml = require("js-yaml")

// ---------------------------------------- | Parse Data

// Object to store parsed data.
const data = []
// Get filenames of all the YAML files in the data/earworms directory.
const dataFiles = glob.sync(path.join(__dirname, "../data/earworms/*.yml"))
// Loop through the files, read each one, parse it, and store it in the data
// object.
for (const file of dataFiles) {
  const content = fs.readFileSync(file, { encoding: "utf-8" })
  data.push(yaml.load(content))
}

// ---------------------------------------- | Build Directories

// Create main build directory if it doesn't exist.
const buildDir = path.join(__dirname, "../build")
if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir)
// Create the directory to house the individual records, if it doesn't exist.
const indivDir = path.join(__dirname, "../build/earworms")
if (!fs.existsSync(indivDir)) fs.mkdirSync(indivDir)

// ---------------------------------------- | Index Page

// Path to the index page in the build dir.
const indexPath = path.join(buildDir, "earworms.json")
// Data for the index page.
const indexData = JSON.stringify({
  results: data,
  meta: { count: data.length }
})
// Write the file.
fs.writeFileSync(indexPath, indexData)

// ---------------------------------------- | Individual Pages

// Loop through the individual data records.
for (const result of data) {
  // Path to the individual file.
  const indivPath = path.join(indivDir, `${result.id}.json`)
  // Data for the individual file.
  const indivData = JSON.stringify({ result: data, meta: {} })
  // Write the individual file.
  fs.writeFileSync(indivPath, indivData)
}
```

### Making it Executable

You'll notice that in the `package.json` we have the `build` script running `node bin/build.js`. If you want to run it directly, you can make the file executable. On Unix and Unix-like systems, you can use the [`chmod` command](https://en.wikipedia.org/wiki/Chmod) to achieve this:

    $ chmod +x bin/build.js

Then you'll want to add a [hashbang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) to the top of your build script file:

`bin/build.js` {.filename}

```bash
#!/usr/bin/env node

# ...
```

Once that's in place, you can run the command directly:

    $ ./bin/build.js

_Note: There isn't a ton of benefit from that in this case because we're abstracting the command in a `package.json` script anyways._

### Run the Command!

Okay, now you can run the script:

    $ yarn build

If everything went successfully, you should now see a `build` directory with the `earworms.json` file, along with the individual files.

### Check in the Browser

And you can check that everything is looking good by running the server in your build directory and checking the output. To start the server, run the `serve` command:

    $ yarn serve

And then navigate to the appropriate place in your browser. Your index page is at [localhost:8000/earworms.json](http://localhost:8000/earworms.json) and the individual pages are nested under `earworms`, e.g. [localhost:8000/earworms/1.json](http://localhost:8000/earworms/1.json).

## Next Steps

As you can see, there's a lot of power here without doing a ton of work. This just gives you a taste of it.

If this was something I would eventually take into production, I'd likely do a bit more with it first. Here are some ideas:

1. **Clean up builds:** Add a script that cleans (i.e. deletes) built files. This will help ensure you don't end up with stale data in the build output. You _could_ do this as part of the build script, but I like to keep them separate.
2. **Account for errors:** You should account for errors in the build script. One option for this is to wait until you run into an error before catching it. Another is to proactively research the commands we've used and ensure you're catching errors. Being proactive will help your future self know what went wrong without as much digging.
3. **Print output:** As you make progress throughout the build step, it's nice to log some output. This doesn't mean printing every data file you process — that would really slow you down. Maybe you just have a before and after message, like `Processing ## ear worms ...` and then `Done.`.

Following those steps, I'd feel comfortable enough to use the script to build and deploy the API, via a service like [Netlify](https://www.netlify.com/) or [ZEIT](https://zeit.co/).

But if you wanted to take it a step further, here are a couple other ideas for adjustments you could make to the code:

- **Dev server:** Add a development server that watches for file changes and then automatically re-runs the build. You could use something like [chokidar](https://github.com/paulmillr/chokidar).
- **Dynamic or configurable input/output:** We've hard-coded our API to revolve around earworms. But you could write the build script in such a way that it essentially transforms the entire data directory's YAML files into a JSON-based API, with added metadata.

And there's so many more places you could go from there. This is only a start.

So, what are you waiting for? Get building!
