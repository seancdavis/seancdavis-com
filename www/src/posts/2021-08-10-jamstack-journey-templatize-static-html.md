---
title: How to Convert Static HTML into Powerful Templates
description: Learn how to take a handful of static HTML files and convert them into templated files that will help you minimize errors and work more efficiently.
image: /posts/210810/210810--static-html-to-templates.jpeg
canonical_url: https://www.stackbit.com/blog/jamstack-journey-templatize-static-html/
tags:
  - repost-stackbit
  - eleventy
  - html
---

You've gone through the design process in building a website, but now you're left with a handful of HTML files, along with some images and one or more CSS and JavaScript files, and you want to know what to do with them? Great! Let's talk about it.

You _could_ deploy (i.e. publish) them, and eventually you will, otherwise no one will see your site. But deploying at this point is only going to get you so far. Inevitably, you're going to want to change something with the site, and then what? Are you going to go all the way through the design process again? That sounds ... _painful._

A more sustainable approach is to take the static HTML content you were given and _templatize it!_ Make it easier for you to work with — to make changes and to create new pages — when the need arises.

## Why templatize a website?

This process has one major benefit — _reusability_. It makes the act of adjusting structure or content relatively trivial when compared with having to work with individual HTML files. That process can be further enhanced by separating content from presentation, so that when all you need to do is change a few words, you know right where to go and never have to mess with any of the code. (We have a detailed guide for that, but you'll want to follow this one first.)

Consider two typical and simple content pages that most sites have — _Terms & Conditions_ and _Privacy Policy_. They often have the same header and footer. It's just the content in the middle of the page that differs (though the _structure_ is likely similar). With those pages as separate HTML files, when you want to change something in a shared section — like the header or footer — you have to make the change in both places.

Expand that example to a site that has hundreds of pages with a similar structure (like blog posts). You'd be making that change hundreds or _thousands_ of times, depending on the size of your site.

Following a software development principle called [_don't repeat yourself_](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (often referred to as _DRY code_), you could build the site with reusable pieces. Then you can make each change once and have it work everywhere. This is the magic of templatizing.

## How templatizing works

When you have no templates and only HTML, the code on each page is unique and lives within its own file. Take a super simple site that has a home page (`index.html`), along with Terms (`terms.html`) and Privacy (`privacy.html`) pages. Your files look like this, where the dark blue boxes represent the code unique to each page:

{% post_image
    src="/posts/210810/210720--templatizing-before.png",
    alt="Before templatizing, each page is unique",
    flatten="true",
    classes="px-8 my-6" %}

Now let's say the header on the home page is unique, but the header on the Terms and Privacy (i.e. _interior_) pages could be shared. And maybe the footer is the same on every page. Then we could make the header and footer into their own files and share them among multiple pages. Like this:

{% post_image
    src="/posts/210810/210720--templatizing-after.png",
    alt="After templatizing, the header and footer can be shared where appropriate",
    flatten="true",
    classes="px-8 my-6" %}

After creating these templates, changes to the footer only need to be made once and every page is updated to reflect the new changes.

This is a super simplistic view to show the power that even small abstractions can add to the longevity of your site. What we'll do here will be slightly different in practice.

But how do we actually do this?

## Static site generators are here to save the day!

Unfortunately, the web isn't built to work with templates. We can't actually just add a `footer.html` file and then tell every page to include it and have the browser work. In the end, the browser expects a _single_ HTML file. In other words, the browser actually _wants_ the non-templatized version of the two scenarios above.

But that's not how we want to work. It's tedious and prone to errors. If you want the footer to look the same everywhere, it should _be_ the same everywhere. Otherwise, you risk making inadvertent changes on random pages. To help with this process we can use a tool called a [static site generator](/posts/wtf-is-ssg/).

[There are many to choose from](https://jamstack.org/generators/), perhaps including some popular ones you may have heard of, such as [Jekyll](https://jekyllrb.com/), [Gatsby](https://www.gatsbyjs.com/), [Next.js](https://nextjs.org/), or [Hugo](https://gohugo.io/). Here we're going to use one called [Eleventy](https://www.11ty.dev/).

## What's so great about Eleventy?

Eleventy isn't as popular as some of its competition, but it is supreme in its approach, which is simplicity. It is modeled after Jekyll, which provides a super low barrier to getting started when compared with the rest of the field. But unlike Jekyll, it is written entirely in JavaScript, which makes it a great fit for folks getting started with building websites.

Eleventy can also be super powerful. It takes more customization as your site grows in complexity, but it can grow with you. [My site](/) has several hundred pages and, at the time of writing this, is built entirely through Eleventy.

Okay, _now_ are you convinced you should templatize those HTML files?

Hooray! Me too.

Let's do it!

## Step 1: The Static Site

Let's work through this process together using a real-world example. We're going to build a super simple version of [the Unmute website](https://www.unmutedstories.com/). (Unmute is a real thing — a side project I'm working on with a few nerdy friends.)

We'll have a unique [home](https://stackbit-jamstack-journey.netlify.app/) [page](https://stackbit-jamstack-journey.netlify.app/) along with two similar content pages, mimicking a [Terms & Conditions page](https://stackbit-jamstack-journey.netlify.app/terms/) and a [Privacy Policy page](https://stackbit-jamstack-journey.netlify.app/privacy/).

Let's say the output of the whatever process you went through to obtain the files for your site left you with [this mess](https://github.com/seancdavis/stackbit-jamstack-journey/tree/2c600cc/02-static-site/www):

- `css/styles.css` to hold all your styling for the site.
- `js/bundle.js` which handles the carousel at the bottom of the home page.
- `images` as a house for all visual assets.
- `index.html` to represent your home page.
- `content-page.html` to represent all other internal pages.

**Gotcha!**
Take note that we're making a big assumption here. We're assuming that you won't need to mess with your `styles.css` or `bundle.js` file. They were bundled up nicely for you by the freelance dev and you won't need to make changes.

In the real world, it can be a tricky process to take big, bulky, obfuscated CSS and JS files and create a method for adding to them. And it gets even more complicated if you ever have to go back to the developer for changes _after_ you've customized one of these.

As a result, we're considering that process outside the scope of this guide. However, if this need arises, I've written a couple relatively simple guides on how to achieve this for both [CSS](/posts/getting-started-with-postcss/) and [JavaScript](/posts/javascript-webpack-build-pipeline/).

## Step 2: Create a New Project

Add the contents of the example static project to some directory on your machine. [Here's a link to download the larger example](https://github.com/seancdavis/stackbit-jamstack-journey/archive/refs/tags/v1-draft.zip). After doing that, you can find the appropriate files in the `02-static-site/www` directory. Move these files into a new directory on your machine. Your folder's contents [should look like this](https://github.com/seancdavis/stackbit-jamstack-journey/tree/88e200d/03-templated-site).

## Step 3: Setup Eleventy

We're going to assume you have a computer that is setup for web development. (If not, [here's a guide](/posts/new-mac-dev-guide/) I wrote on setting up a new Mac for development.)

Once you're ready to go, open up your command line or terminal application, change into the project directory and install Eleventy:

    # navigate to your new project
    cd path/to/my/project

    # setup project for Eleventy
    npm init -y

    # install eleventy
    npm install -D @11ty/eleventy

_Note: If you're tracking your changes with_ [_Git_](https://git-scm.com/)_, this is a great spot to initialize the repository (_`git init`_) and add_ `node_modules` _to a_ `.gitignore` _file. If you're not working with Git, don't worry about this right now._

I like to add a few shortcuts after this installation to make working with sites more consistent across my machine. Open your `package.json` file and add the following to the `scripts` section:

```json
{
  // ...
  "scripts": {
    "build": "eleventy",
    "clean": "rm -rf _site",
    "dev": "eleventy --serve --port 8000"
  }
}
```

[Here's what that file should look like at this point](https://github.com/seancdavis/stackbit-jamstack-journey/tree/1c80367/03-templated-site/package.json#L6-L10).

Now we have a way to run an Eleventy development server. Run the following command:

    # start eleventy server
    npm run dev

You should now have a dev server running at localhost:8000. And you'll notice you now have a new `_site` directory in your project. Eleventy did this automatically for you.

You can open your browser and visit localhost:8000 to see your site, and ... _something doesn't look right._

{% post_image
    src="/posts/210810/210720--unmute-unstyled.png",
    alt="Where the heck are our styles??",
    flatten="true",
    classes="px-4 my-6" %}

That's because we didn't tell Eleventy where our assets are. To do this, we must [add an Eleventy config file](https://www.11ty.dev/docs/config/) at `.eleventy.js`:

```js
module.exports = function (eleventyConfig) {
  // Copy static assets over to _site directory.
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");
  // Return configuration object.
  return {};
};
```

Give the browser a refresh and everything should look good again!

{% post_image
    src="/posts/210810/210720--unmute-styled.png",
    alt="Phew! That's better.",
    flatten="true",
    classes="px-4 my-6" %}

_Note: Throughout this guide, when making changes, you may have to clear the cache on your browser. Most browsers have an option to reload while clearing the cache for that site._

## Step 4: The Default Layout

In Eleventy (and most static site generators), each page is wrapped in a _layout_. A layout is just a fancy term for a template. We're going to begin by creating a default layout. This will be code that every page uses. We do this because, as we'll soon see, Eleventy supports nesting layouts within one another. So what we're going to do here is define our base layout.

In looking at `index.html` and `content-page.html`, the code that is consistent between the two is mostly contained within the `<head>` tag, but also includes a few lines at the very bottom of the file. Here's what it looks like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/images/favicon/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/images/favicon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/images/favicon/favicon-16x16.png"
    />
    <link rel="manifest" href="/images/favicon/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/images/favicon/safari-pinned-tab.svg"
      color="#5bbad5"
    />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
    <title>Stackbit Demo: Unmute</title>
    <link rel="stylesheet" href="/css/styles.css" />
    <script>
      function onInit(callback) {
        if (typeof App !== "undefined") return callback();
        setTimeout(onInit, 250, callback);
      }
    </script>
  </head>
  <body class="font-default">
    <!-- This was the unique code -->

    <script src="/js/bundle.js"></script>
  </body>
</html>
```

Put that code in a new file: `_includes/default.njk`. And in the spot where the unique code existed, add the Nunjucks variable `content`. (More on this in a moment.) Your resulting file should [look like this](https://github.com/seancdavis/stackbit-jamstack-journey/tree/7122194/03-templated-site/_includes/default.njk).

Three items are important to note in this new template:

1.  We changed the file extension from `.html` to `.njk`. This means we're using [Nunjucks](https://mozilla.github.io/nunjucks/) as our templating language. Eleventy supports [a number of](https://www.11ty.dev/docs/languages/) languages. Nunjucks is nice for staying with our theme of using JavaScript. And it's also fairly minimalistic, which is nice for our example.
2.  We added a single Nunjucks variable, `content` and passed a `safe` filter to it. `content` tells Nunjucks to render the content of the each page in that area. That means all of our page content will fall where you see `{% raw %}{{ content | safe }}{% endraw %}`.
3.  The `_includes` directory has some special characteristics that make it easy to ... well, _include_ files. [Read more here](https://www.11ty.dev/docs/config/#directory-for-includes).

Nothing has changed if we refresh the browser because we haven't wired these up yet. When we go to the home page, we're still just looking at `index.html`, which isn't using our new layout yet.

## Step 5: Wrap the home page in the new layout

Let's adjust our home page to use the new layout.

Begin by changing `index.html` to `index.njk`. This is going to help us in the future when we want to use Nunjucks variables or tags in the page.

Now, remove all the code you extracted to create the layout and refresh your browser.

_What the heck?_ You're back to a page without styles. What happened?

What happened is that you removed your references to the CSS and JS files, which were in the `<head>` and near the bottom of the `<body>`, but you didn't tell Eleventy to use a layout. So let's change that. Add the following at the top of your `index.njk` file:

```md
---
layout: default
---
```

Now refresh the browser and you should see your styles come back!

This style code — three hyphens, then some code, then three more hyphens — is called [_frontmatter_](/posts/wtf-is-frontmatter/). It's like _code before the code_. It provides us a space to place meta information about that file that won't ultimately be written to your browser screen.

The last thing to note here is that you will want to either remove or change the comments in your code. Nunjucks comments look a little different than HTML comments (although they will ultimately still be treated as comments, so you can ignore this if you'd like).

Any code between `<!--` and `-->` is an HTML comment. Either remove these or change them to `{% raw %}{#{% endraw %}` and `{% raw %}#}{% endraw %}`.

In the end, [this is what your new `index.njk` file should look like](https://github.com/seancdavis/stackbit-jamstack-journey/tree/b0b554e/03-templated-site/index.njk).

## Step 6: Content Pages

Now let's add a couple plain content pages. Our developer delivered a generic content page to us called `content-page.html`. We want to use that to create multiple pages. In this case, maybe those are Terms & Conditions and Privacy Policy pages.

To do this we first want to make our generic content page a layout. To do that rename `content-page.html` to `content-page.njk` and move it into the `_includes` directory.

Now, here's a really weird and super cool thing about Eleventy — we can nest layouts in other layouts. What that means is that because the content page has code that we've already used in `_includes/default.njk`, we can reuse that with the content page layout.

To do this, remove the shared code from `_includes/content-page.njk` and specify the layout in the frontmatter at the top of the file.

Now you can create two new files, `terms.njk` (or `terms.html` — we aren't doing anything special at this point) and `privacy.njk`. Add some content (I used [a generator](https://app.termsfeed.com/) for the content and you can use what I have) and tell Eleventy to use the "content-page" layout:

```md
---
layout: "content-page"
---
```

Now you can go to localhost:8000/terms and localhost:8000/privacy and you should see your nicely-formatted content.

{% post_image
    src="/posts/210810/210720--terms-page.png",
    alt="Terms Page",
    flatten="true",
    classes="px-4 my-6" %}

Here are the links to these files at this stage:

- [`_includes/content-page.njk`](https://github.com/seancdavis/stackbit-jamstack-journey/tree/b709edb/03-templated-site/_includes/content-page.njk)
- [`terms.njk`](https://github.com/seancdavis/stackbit-jamstack-journey/tree/b709edb/03-templated-site/terms.njk)
- [`privacy.njk`](https://github.com/seancdavis/stackbit-jamstack-journey/tree/b709edb/03-templated-site/privacy.njk)

## Step 7: Extracting Shared Code

Now you're in good shape and have a pattern to create new pages with a nice layout. Any new file you create with the "content-page" layout will now have a header and footer wrapping your content.

But, we still have an opportunity for some improvement. While we are using a layout to create multiple pages, which means we're sharing code, we do still have some duplicated code. Now the home page (`index.njk`) and the content page layout (`_includes/content-page.njk`) have separate footers. Even though they look the same, you'd have to edit the content in both if you wanted to make a global change.

Let's make that easier. Pull the footer content into its own file in the `_includes` directory, `_includes/footer.njk` ([see here](https://github.com/seancdavis/stackbit-jamstack-journey/tree/f1af38f/03-templated-site/_includes/footer.njk)). Then remove that shared code from the home page and content page layout and replace it with [the `include` Nunjucks tag](https://mozilla.github.io/nunjucks/templating.html#include):

{% raw %}

```pug
{% include "footer.njk" %}
```

{% endraw %}

(See the new [`index.njk`](https://github.com/seancdavis/stackbit-jamstack-journey/tree/f1af38f/03-templated-site/index.njk) and [`_includes/content-page.njk`](https://github.com/seancdavis/stackbit-jamstack-journey/tree/f1af38f/03-templated-site/_includes/content-page.njk) files.)

Now you can make the change once and see it work everywhere. For example, you could [add links to the terms and privacy pages](https://github.com/seancdavis/stackbit-jamstack-journey/commit/bf4025d).

_Note: You could have chosen to include the footer directly in the default layout, or even reference in in the default layout. This is entirely up to you and your project. In this case, I'm accounting for some future template that won't want the footer. But if we're sure every page wants the footer, maybe it makes sense to put it in the default layout._

## Other Opportunities

As your site grows, you'll find other opportunities for improvement and abstraction (_abstraction_ being the process of cleaning up code to be shared).

### Shared Images

For example, many of the shapes you see on the pages are SVG elements. They are images, but represented with HTML code. And many of them are used more than once.

You could remove the `<svg>` elements and turn them into their own file in the `_includes` directory. (You could even put them in their own subdirectory so they are grouped together.) Then you can reference them with a Nunjucks tag.

### Unique Titles

You may also run into the opposite issue at some point, where you'll have code or content in a shared space, but you want it to be unique to some particular template. For example, you'll want the title of the page (contained in the `<title>` attribute) to be unique to each page. But that code is nestled up in the default layout.

This is where Nunjucks variables and page frontmatter comes into play. Take the terms page, for example. You could add a `title` attribute in its frontmatter:

```md
---
layout: "content-page"
title: "Terms & Conditions"
---
```

Then, in the `_includes/default.njk` layout, you can use the `title` variable.

{% raw %}

```pug
<title>{{ title }}</title>
```

{% endraw %}

You could make the same change to the `_includes/content-page.njk` body so that you don't have to write the `<h1>` on every page. Something like this:

{% raw %}

```pug
<h1>{{ title }}</h1>
```

{% endraw %}

The world is your oyster when it comes to finding these efficiencies. It's all about how you want to work and how you want the framework (Eleventy) to work for you.

I bucketed a handful of these changes together and did them all at once. [Here are the changes I made](https://github.com/seancdavis/stackbit-jamstack-journey/commit/6e9cb47) and [the files in the project at this point](https://github.com/seancdavis/stackbit-jamstack-journey/tree/6e9cb47/03-templated-site).

## Wrapping Up

Phew! Take a break, give yourself a pat on the back. This process can be a harrowing one, especially the first time around. If you've made it through, you deserve a break and some ice cream.

To quickly recap. What we started with was a jumbled mess of HTML files, handed to you by some developer. We took those files and turned them into layouts (or templates) that we could use to quickly create new pages with the same design.

Where do we go from here?

I'm glad you let me ask that question on your behalf, because we have a great next step! Instead of using `.html` or `.njk` files for our content, you can double-down on frontmatter and markdown to create a truly powerful editing experience that gets all the code out of your way and keeps you focused on only the content.

And, lucky for you, [we have a guide](/posts/jamstack-journey-separate-content) to keep this thing going and to walk you through that process.

But first, go get that ice cream.
