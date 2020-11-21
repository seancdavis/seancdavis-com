---
title: Decreased Jekyll Build Times 5x with a Custom Asset Pipeline
description: "My team and I ditched the jekyll-assets gem for a homegrown asset pipeline and decreased build times by a factor of five. This is how we did it."
tags:
  - babel
  - css
  - gulp
  - javascript
  - jekyll
  - sass
---

_The background to this story:_

My team and I were asked to use Jekyll on a handful of new projects that would transition one of our clients from an Angular application to [the Jamstack](/wtf-is-jamstack.html). One of these projects has _hundreds_ of pages, while another has _thousands_. While we overcame several build performance hurdles during the process, perhaps none were more significant than the issue with faced in building our front-end assets. So let's talk about that, shall we?

## Jekyll Out-of-the-Box

Out-of-the-box Jekyll ships with [support for Sass](https://jekyllrb.com/docs/assets/), but requires a plugin to process JavaScript. Jekyll recommends using their self-supported [jekyll-coffeescript gem](https://github.com/jekyll/jekyll-coffeescript), but with [ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_2015_support_in_Mozilla), the advantages of CoffeeScript are diminishing and the introduction of another dependency was unnecessary for a team transitioning to a new tech stack. In other words, what Jekyll provides us with out of the box was simply not going to support our front-end asset needs.

## Ruby Gem Offerings

When looking around for other JS build pipelines that we could hook into Jekyll, one of the first finds was [the jekyll-assets gem](https://github.com/envygeeks/jekyll-assets) along with articles like [this one on how to work with jekyll-assets](https://philna.sh/blog/2016/06/28/asset-pipelines-with-jekyll-assets/).

This gem seemed to be far-and-away the most popular for working with assets inside Jekyll. And, as a bonus, it was built atop [Sprockets](https://github.com/rails/sprockets), which my team of [Ruby on Rails](https://rubyonrails.org/) developers really liked. Thus, we were off to the races using jekyll-assets.

_(I'd bet you can guess what happens next.)_

## Jekyll and jekyll-assets

As the project matured, build times slowed. The project with hundreds of pages and the other with thousands of pages were both taking about 30 seconds to build _in development_. This is significant because it meant every time a developer made a a change, they'd have to wait 30 seconds to see that change on screen. Even if it was just a simple text change.

While a big part of this was a direct result of Jekyll re-building the entire site on every change, we were sure there was something we were doing to slow it down further. Or, perhaps better stated, there was something we could do to decrease the build times.

As you may imagine, our developers were not happy (even though every one of us contributed to the lagging builds). We knew there were several factors as to why the builds were slowing, and we knew there were many approaches we could take to speed it up. Amidst conversations on those approaches, a theory emerged that jekyll-assets was a major problem.

## A Quick Test

So we did a test. We ripped out jekyll-assets along with all of our front-end assets, such that all we had left were a bunch of disgusting [Liquid](https://shopify.github.io/liquid/) templates. We ran a build and ... it took about five seconds. If my elementary math skills are serving me right, that's about **six times faster** without and asset pipeline (i.e. without jekyll-assets). Or, said another way, jekyll-assets was taking about 85% of the total build time. On a site with thousands of pages, that's completely unacceptable.

## The Hypothesis

The next step seemed like it should be to look for another asset pipeline gem. The problem is all the gems we could find were missing a component we believed critical to the success of an asset pipeline: **It shouldn't run if it doesn't have to.**

We developed a hypothesis: If we built an asset pipeline that ran conditionally based on developer behavior and the availability of previously built assets, we could decrease _most_ local build times by a significant factor.

We also had a funny feeling that even when the asset build ran it wouldn't take 85% of the build time, but we couldn't know for sure until we built the thing.

## Project Goals

So we set out to build a custom asset pipeline for these Jekyll projects. And since we were doing it anyways, we worked a couple extra goals into the project, ultimately ending up with this list:

- Only run the build when necessary.
- Support ES6 code.
- Concatenate multiple JS files into individual bundles based on a separate configuration file.
- Minify JS bundle(s).
- Compile Sass (SCSS) to [CSS](/wtf-is-css) code, with support for [node-sass-tilde-importer](https://www.npmjs.com/package/node-sass-tilde-importer).
- Add cache digests to help with cache invalidation.
- Provide a means to build `<script>` and `<link>` tags in liquid templates.

## A New Gem

We ended up [creating a new Ruby gem](https://github.com/crdschurch/jekyll-asset-pipeline) with these three features:

1. **The build tool:** Built upon [my five-part series on compiling ES6 code with Gulp and Babel](/compile-es6-code-gulp-babel-part-1.html), the build tool can be run on its own via a `package.json` script. But it needs some help to hook into the Jekyll build process.
2. **Jekyll hooks:** A series of hooks that are responsible for figuring out whether or not to run the build and, if it should run the build, play the role of triggering the build process. It only runs the build if told to do so, or if the built files are missing or out of date. The hooks are also responsible for passing along the appropriate cache digest to the ...
3. **Jekyll tags:** A couple plugins that output `<script>` and `<link>` tags for our liquid templates. This must receive the cache digest from the hooks to ensure the filenames are correct.

## The Results

We proved our hypothesis true! When the asset build didn't need to run because the files were already in place, the build took about six seconds—about a second for the tags and hooks to run—speeding up _most_ builds by a factor of five.

To our surprise, the build process with Gulp was quite efficient and, when the build did run, it would increase the total Jekyll build time to about 10 seconds, still faster than our original build by a factor of three.

## Using The Gem

This gem is an open source gem and is available at [https://github.com/crdschurch/jekyll-asset-pipeline](https://github.com/crdschurch/jekyll-asset-pipeline) for use in any project. It unfortunately shares the name of another gem (oops!) so it must be installed by pointing to the GitHub repository, but it's there for the taking. (Further documentation for the gem is in its README.)

It is opinionated to serve the two projects mentioned here, and it's a little rough around the edges. But I imagine you will find some benefit to it. And if you feel like making a change to it, well, that's the value of open source projects.

And as usual, if you find bugs, or have questions or suggestions, you can always _bug_ me—if not [on GitHub](https://github.com/seancdavis), then [on Twitter](https://twitter.com/seancdavis29).
