# Sean C Davis

Hi, I'm Sean! This is my website. I prefer to work out in the open and share my work with anyone who may benefit from it. This repo has the code and content that powers my site, including some of the examples I use in blog posts.

## Contributing

I welcome any form of contribution to this site, including:

- Share some love [on Twitter](https://twitter.com/seancdavis29)
- Guest posts via [a pull request](https://github.com/seancdavis/seancdavis-com/pulls)
- Comments, questions, feedback, and bug reports via [GitHub Issues](https://github.com/seancdavis/seancdavis-com/issues)
- Fixes to silly typos, adjustments to outdated code examples, or other wild ideas via [a pull request](https://github.com/seancdavis/seancdavis-com/pulls)

## Developing

The site is built using [Eleventy](https://www.11ty.dev/). But it's actually a bit more that that. It has a demos and other code examples. So it's become a monorepo. Therefore, the best way to get started is to first install [PNPM](https://pnpm.js.org/). I use [Homebrew](https://brew.sh/) to do that:

    $ brew install pnpm

And then install the dependencies

    $ pnpm install

Note: If you don't plan on working in any of the JavaScript-based code examples, you should be fine by running `npm install` from the root. You may run into version discrepancies, which may or may not cause problems.

To start up the dev server, change into the `www` directory and run the `dev` command:

    $ cd www
    $ npm run dev

The site will be available at [http://localhost:8000](http://localhost:8000).

This site _technically_ precedes my Eleventy Starter Kit, [Twenty-Ninety](https://github.com/seancdavis/twenty-ninety). But it follows many of the same patterns. If you have a look at that documentation, you'll get a sense for what is going on here.

## License

I don't use a typical software license. I'm here to make the web better and to have some fun doing it! You can [read my license page](https://www.seancdavis.com/license/) for those fine-grained, nitty-gritty, legal(ish) details.
