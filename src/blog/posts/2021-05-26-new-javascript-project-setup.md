---
title: How I Begin New JavaScript Projects
description: These are the first steps I take when I start a new JavaScript project.
image: /blog/210526/blue--javascript-new.png
tags:
  - javascript
---

I found myself writing and rewriting this process on so many blog posts that it felt like it deserved a post of its own.

These are the steps I take when I am starting a new JavaScript project, whether as a client-side script or a server-side project with [Node.js](/blog/wtf-is-node).

## Step 1: Create the Project Directory

I like to keep all my code projects together on my machine. To do so I created a directory called `workspace` within my home folder.

What's inside the `workspace` directory mimics the structure of repositories on [GitHub](https://github.com/). For example, the code for this website is at [@seancdavis/seancdavis-com](https://github.com/seancdavis/seancdavis-com) on GitHub. That means it lives at `~/workspace/seancdavis/seancdavis-com` on my machine.

{% callout type="note" %}
The tilde character `~` represents your home directory.
{% endcallout %}

The first thing I do when starting a new project is create a directory for the code and navigate to that directory. Here's an example:

    $ cd ~/workspace/seancdavis
    $ mkdir new-project
    $ cd new-project

{% callout type="note" %}
If the code is just a quick proof of concept I'll throw it in the `/tmp` directory, which gets automatically cleaned out. Otherwise, it goes in `~/workspace`.

_What if you don't plan to put the code on GitHub?_ [Put everything on GitHub that isn't a throwaway proof-of-concept on GitHub](/blog/put-everything-on-github)! You won't regret it.
{% endcallout %}

## Step 2: Add `package.json`

Next, I add an empty `package.json` file. The `npm` command has a handy `init` option. And if you pass the `-y` flag to it, you'll end up with a valid-but-mostly-bare `package.json` file.

    $ npm init -y

That will create a `package.json` file that looks something like this:

`package.json` {.filename}

```json
{
  "name": "new-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

{% callout type="note" %}
Sometimes I change the values right away. Other times I leave it alone and come back when I get closer to publishing the project.
{% endcallout %}

## Step 3: Setup Git

Then I initialize the git repository.

    $ git init

And then I make sure I'm ignoring the `node_modules` directory by adding a `.gitignore` file:

`.gitignore` {.filename}

```
node_modules
```

{% callout type="note" %}
It's good idea to do this step before installing any packages. That makes it a lot easier to not accidentally commit code in `node_modules`.
{% endcallout %}

## Step 4: Install Dependencies

Next, install the dependencies you need. Usually I know the first few packages I'm going to start with. This will vary from project to project.

    $ npm install ...

## Step 5: Add Scripts

There's almost always some sort of build or run process for the code. I tend to set those up next. They may change over the course of the project, and that's okay. But it's a place to start.

For example, if it's a Node project, I'll probably start by adding a `build` script that runs the `node` command against an `index.js` file. That would look like this:

`package.json` {.filename}

```json
{
  // ...
  "scripts": {
    "build": "node index.js"
  }
}
```

Then I'd be able to run the build through the `npm` command:

    $ npm run build

## Step 6: Get Building!

Then it's time to get down to business and make that thing awesome. Or play around for awhile and throw it away. Whatever your case may be, I hope you have a little fun along the way!
