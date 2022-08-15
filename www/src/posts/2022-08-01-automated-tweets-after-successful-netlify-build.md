---
title: Automated Tweets after Successful Netlify Build
description: >-
  This is the (custom) workflow I use to automatically tweet after publishing
  new content to my blog.
tags:
  - github
  - netlify
  - node
image: /posts/220801/automated-tweets-after-successful-netlify-build-yxCVMezW.png
seo:
  image: >-
    /posts/220801/automated-tweets-after-successful-netlify-build-b7L9pQxv--meta.png
---

When I publish new content to this blog, a tweet like this gets published.

<blockquote class="twitter-tweet">
  <p lang="en" dir="ltr">
    Every time I get close to wrapping up a project working with a new designer,
    I’m reminded of the benefit of considering extremes early on. We require so
    much flexibility and variability today that it’s impossible to capture a
    single, idealistic design. https://t.co/qTphiBEbNf
  </p>
  &mdash; Sean C Davis (@seancdavis29)
  <a href="https://twitter.com/seancdavis29/status/1550468441533870080"
    >July 22, 2022</a
  >
</blockquote>
<script
  async
  src="https://platform.twitter.com/widgets.js"
  charset="utf-8"
></script>

I built the workflow to support this from scratch. Let's look at how it works.

## Why Automate Tweets?

For me, this isn't some elaborate and secret plan to get a million followers or massively boost my pageviews. I have a simple rule: When I publish something new, I share it at least once.

I built this workflow to solve a simple issue with timing and context switching.

Before this process was in place, I would draft an article, review/edit it, publish it, then share it. The time between each of those steps varied from post to post, but could be as long as days or weeks.

By the time the article is ready to be shared, I'm often done thinking deeply about it. I've already spent much time _in the zone_, and have moved onto something else. To author a meaningfully contextual message is to refocus my brain on the article, come up with something clever, grab the URL, and publish a tweet. Of course, I also have to wait for the production build to finish and then make sure I remember to actually send the tweet (which I've forgotten a number of times).

After putting this process in place, I can author the tweet while I'm writing the article. As you'll see, I don't even have to know what the URL is going to be. I just leave a short message for the tweet, and once the publishing process completes itself, the tweet is automatically published to Twitter.

No context switching. No reminder setting. I'm onto the next thing while my Twitter account stays active.

## The Post-Build Tweet Publishing Workflow

There are three components that make up the engine that drives this process:

- [netlify-plugin-github-dispatch](https://github.com/seancdavis/seancdavis-com/blob/471f981306604103b219ce43277dda151b69a4e0/packages/netlify-plugin-github-dispatch/index.js) (Netlify build plugin)
- [publish-tweets.yaml](https://github.com/seancdavis/seancdavis-com/blob/471f981306604103b219ce43277dda151b69a4e0/.github/workflows/publish-tweets.yml) (GitHub Action)
- [publish-tweets.mjs](https://github.com/seancdavis/seancdavis-com/blob/471f981306604103b219ce43277dda151b69a4e0/www/scripts/publish-tweets.mjs) (Node.js script)

This is how it works:

1. **`tweet`** **frontmatter:** My blog content is stored in markdown files, which use YAML frontmatter to store meta properties about the post. When I publish a new post, I add a property `tweet` where the value is the body of the tweet to publish. [Here's an example](https://github.com/seancdavis/seancdavis-com/blob/3412346823dd504bc226c728d17e4c0a9fb0c1c3/www/src/posts/2022-07-03-designing-a-website-for-variable-content-using-extremes.md?plain=1#L9-L13) that you can see matches the tweet at the beginning of this article.
1. **Netlify Build Plugin:** When I merge a commit with a new post to the `main` branch, a new Netlify build gets kicked off. When a build [on the ](https://github.com/seancdavis/seancdavis-com/blob/471f981306604103b219ce43277dda151b69a4e0/packages/netlify-plugin-github-dispatch/index.js#L10)[main](https://github.com/seancdavis/seancdavis-com/blob/471f981306604103b219ce43277dda151b69a4e0/packages/netlify-plugin-github-dispatch/index.js#L10)[ branch](https://github.com/seancdavis/seancdavis-com/blob/471f981306604103b219ce43277dda151b69a4e0/packages/netlify-plugin-github-dispatch/index.js#L10) is successful, my [netlify-plugin-github-dispatch](https://github.com/seancdavis/seancdavis-com/blob/471f981306604103b219ce43277dda151b69a4e0/packages/netlify-plugin-github-dispatch/index.js) plugin [uses the GitHub API to release a dispatch](https://github.com/seancdavis/seancdavis-com/blob/471f981306604103b219ce43277dda151b69a4e0/packages/netlify-plugin-github-dispatch/index.js#L58-L64), which triggers the GitHub workflow.
1. **GitHub Workflow:** The [GitHub workflow](https://github.com/seancdavis/seancdavis-com/blob/471f981306604103b219ce43277dda151b69a4e0/.github/workflows/publish-tweets.yml) basically just sets up dependencies and then runs `npm run publish-tweets` from my website's working directory (`www` in the monorepo).
1. **Node.js Script:** The script looks for any posts with a `tweet` property in the frontmatter, verifies that it hasn't been sent yet, then publishes the tweet, appending the URL for the post to the bottom of the tweet text. It then cleans up by removing the `tweet` property for the post (so that the script doesn't try to send the tweet again the next time it runs) and commits the change to the repo.

{% callout type="note" %}
Big thanks to the official [netlify-plugin-github-dispatch](https://github.com/bahmutov/netlify-plugin-github-dispatch) plugin! I borrowed heavily from this code, and slimmed it down to solve my specific problem.
{% endcallout %}

## Early Results

I'm about three months into this workflow and it has been a total game-changer for me. My account is more consistently active on Twitter than ever before.

And even though I don't get much interaction on these tweets, they are helping, and every little bit helps to boost the visibility of each piece of content I'm putting out there, which makes it feel more worthwhile to me.

While you're welcome to take this code and make it work for you. If you do, [let me know](https://twitter.com/messages/compose?recipient_id=23583938). I've been considering building a solution that could be more turnkey, but would need real use cases to work against.
