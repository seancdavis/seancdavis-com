# Sean C Davis Website

Hi, I'm Sean! This is the code for my website. See more information about this entire repo in the README in the project root.

This site _technically_ precedes my Eleventy Starter Kit, [Twenty-Ninety](https://github.com/seancdavis/twenty-ninety). But it follows many of the same patterns. If you have a look at that documentation, you'll get a sense for what is going on here.

## Developing

The site is built using [Eleventy](https://www.11ty.dev/). As part of a monorepo, this is configured to work with [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/). You can then use yarn to install all dependencies from the root of the project.

    $ yarn install

To start up the dev server, change back into this directory (`www`) directory and run the `dev` command:

    $ cd www
    $ npm run dev

The site will be available at [http://localhost:8000](http://localhost:8000).
