---
title: How to Separate Content from Website Code
description: It's much easier to maintain a site over time when the content is separate from the code. Walk through that process using a real example with Eleventy.
image: /blog/210824/210824--code-v-content.jpeg
canonical_url: https://www.stackbit.com/blog/jamstack-journey-separate-content/
tags:
  - repost-stackbit
  - eleventy
---

We covered the process of moving from static HTML files to a [static site generator](https://www.seancdavis.com/blog/wtf-is-ssg/) (SSG) [in the precursor to this article](/blog/jamstack-journey-templatize-static-html/). Here we're going to look at taking your SSG game to the next level by transforming it into content-driven engine. Together, these two steps make up a few parts of _The Jamstack Journey_.

Let's dive in!

## How a Content-Driven Website Works

There are two main steps in the process of transforming a templatized site into one that is content-driven:

1. Separate content from presentation
2. Abstract repeatable components

### Separate Content from Presentation

The first step in the process is to separate content from presentation. Your templatized website likely has a number of HTML files representing the content of your site. (In our templatized example, we also used `.njk` files.)

For example, you might have a blog post represented as `my-first-post.html` that looks something like this:

{% post_image
    src="/blog/210824/210824--post-after-templatizing.png",
    alt="Blog post after templatizing",
    flatten="true",
    maxWidth="xs" %}

It doesn't have any layout elements because those have all been abstracted away in your template, but it still has HTML code, which effects the structure — the _presentation_ — of the page.

Converting this to a content driven approach means we can convert the HTML file into a content-based file, like markdown (e.g. `my-first-post.md`). And then that content can be fed into the main post layout. Like this:

{% post_image
    src="/blog/210824/210824--after-transformation.png",
    alt="Blog post after transformation",
    flatten="true",
    classes="px-8 my-6" %}

If this doesn't make sense, don't worry yet. We're going to go through a real-world example.

### Abstract Repeatable Components

This process forces us to develop a _shape_ for our content. Doing so will help us uncover opportunities to further simplify templates by combining and abstracting repeatable structures. If this also has your head spinning, it's okay. We'll look at an example of this in action, too.

## Benefits of a Content-Driven Website

The process of separating content from presentation has a number of benefits. These are the primary reasons I go through through this effort:

- It reduces the potential for introducing new bugs through content. When you force your editors to write HTML code just to add content to your site, you are greatly increasing your risk for new bugs that come from unexpected or bad HTML code.
- Less technical content editors can contribute without learning code.
- It's more pleasant to author content. Markdown is built to get out of your way. Instead of wrapping a top-level heading in an `<h1>` tag, you just precede the line with `#`. There are no paragraph tags — they are inferred.
- Markdown is faster to write, too! (At least once you get the hang of it.)

## What about Content Management Systems?

If we're talking about separating content from presentation, shouldn't we be talking about content management systems (CMS), too?

_(Great question, Sean.)_

Yes, this would be the perfect time to introduce a CMS into your project. What we're doing here is substituting a more formal CMS with markdown files. Think of markdown files as the data coming from your CMS. In fact, you could technically pull content from a CMS _and_ convert it to markdown files. I like this approach because a) it's simpler than wiring up a whole CMS, but b) can still work well with your setup if you choose to use a CMS.

## Step 1: The Templatized Site

With that, let's get started!

Following the templatizing tutorial, we were left with [this code](https://github.com/seancdavis/stackbit-jamstack-journey/tree/6e9cb47140e5818b7b97ff314b8f89f9162b88ed/03-templated-site). That's where we're going to begin for this exercise.

Add the contents of the example templatized project to some directory on your machine. [Here's a link to download the larger example](https://github.com/seancdavis/stackbit-jamstack-journey/archive/refs/tags/v1-draft.zip). After doing that, you can find the appropriate files in the `03-templated-site` directory. Move these files into a new directory on your machine. Your folder's contents [should look like this](https://github.com/seancdavis/stackbit-jamstack-journey/tree/5c82f41/04-content-driven-site).

Now we're ready to get started. We're going to do a series of abstractions to get to our final content-driven site. What we'll focus on below are four steps that represent a smaller part of a larger effort. The code I'll share in the end will have made more abstractions, but we'll aim to arm you with the tools you need to get there.

To make sure everything is in order before we get going, it'd be safe to reinstall your dependencies and then start the development server.

    npm install
    npm run dev

Then visit localhost:8000 in your browser and you should see the site.

## Step 2: Simplify Pages

The easiest step in this process is setting up our interior pages. Right now, our privacy and terms pages are `.njk` files, which means they are littered with HTML code. The beauty of Eleventy is that if we simply change the file extension in these files to `.md` they will work immediately.

Give it a try. Rename `privacy.njk` to `privacy.md` and `terms.njk` to `terms.md`. Notice that you don't even have to do anything and they work perfectly fine! That's the magic of markdown. Technically, HTML is valid markdown code.

But, even though it works, we have an opportunity to drastically simplify this content by removing the HTML. I ran the HTML code [through an online converter](https://www.browserling.com/tools/html-to-markdown). You could do the same or you could reference the new files ([Terms here](https://raw.githubusercontent.com/seancdavis/stackbit-jamstack-journey/63eb311e7d6a0bbd8f4d942ecbc9a8bb4b8997a2/04-content-driven-site/terms.md), and [Privacy here](https://raw.githubusercontent.com/seancdavis/stackbit-jamstack-journey/63eb311e7d6a0bbd8f4d942ecbc9a8bb4b8997a2/04-content-driven-site/privacy.md)).

⚠️ **Notice that the little YAML markdown snippet at the top of these files did not change.** That piece is still relevant so that Eleventy knows which template to use and how to pass on the title of each page to that template.

After these changes, your code [should look like this](https://github.com/seancdavis/stackbit-jamstack-journey/tree/63eb311/04-content-driven-site) and you should be able to visit localhost:8000/terms and localhost:8000/privacy with both looking as they did before you made the change.

## Step 3: Shared Global Data

We could jump to the home page next, but that one is a doozy, so let's move on to something a little simpler first — shared global data. There is often content that you want to share across multiple pages or templates. Eleventy is built to support this with its [global data files](https://www.11ty.dev/docs/data-global/).

One example I see in looking at the site as it is right now are the details about the next event. So what I would do is place these details in their own data file in `_data/next_event.json`. Create that file and add the details:

```json
{
  "date": "October 1, 2021",
  "time": "7 PM ET",
  "location": "Virtual",
  "cost": "Free"
}
```

We're using these in two places today — the home page jumbotron and the header in the content page. Since both files (`index.njk` and `_includes/content-page.njk`) are using the Nunjucks templating language, you can render this value using a [Nunjucks variable](https://mozilla.github.io/nunjucks/templating.html#variables).

For example, the code in the content page template would look like this:

```html
{% raw %}
<span class="hidden lg:inline-block lg:mr-2 xl:mr-3">
  {{ next_event.date }}
</span>
<span class="hidden lg:inline-block lg:mx-2 xl:mx-3">
  {{ next_event.time }}
</span>
<span class="hidden xl:inline-block lg:mx-2 xl:mx-3">
  {{ next_event.location }}
</span>
<span class="hidden lg:inline-block lg:mx-2 xl:mx-3">
  {{ next_event.cost }}
</span>
{% endraw %}
```

The home page can follow a similar pattern. [Here is a summary of the changes I made](https://github.com/seancdavis/stackbit-jamstack-journey/commit/737599767da0ce5ad044985499811dd1d76c01bb).

It's a good idea to keep this pattern in mind and employ it whenever you find opportunities to share _content_ (not code) among multiple pages or templates. For example, another use case might be to build a list of social media account URLs so that you can separate the links from the markup and style of the icons.

Give your browser another look to make sure that those values were updated as you'd expect.

## Step 4: The Home Page

Let's take a look at the home page next. We won't abstract this in quite the same way as the interior pages. This is because when we templatized the site, we used a super generic template and put all the unique stuff directly in the home page.

What we want to do here is now extract the content from the home page so that it is trivial to edit without scrolling through the hundreds of lines of code. But we're in a good position to do that.

First, move your `index.njk` file to `_includes/home.njk`. Doing this effectively removes our home page. We still need that index page. But now we want it to be a content page. So let's create a new file in the root of the project and call in `index.md`.

Refresh your browser and see that there's nothing there! That's because Eleventy is now reading this as your home page, but there's no content and you haven't specified a layout. So let's do that. Change the file to look like this:

```md
---
layout: home
---
```

Now refresh your browser and we're back.

Then we can move through the file meticulously and extract elements one at a time until we have separated all our content from the template.

For example, say we wanted to adjust the copy under "Unmute yours" in the jumbotron.

{% post_image
    src="/blog/210824/210824--unmute-jumbotron.png",
    alt="Unmute website jumbotron" %}

Maybe we make a new object for `jumbotron` and then add a `body` section to it. Your `index.md` file would look like this:

```md
---
layout: home
jumbotron:
  body: |-
    Join us for an evening of storytelling with some of your favorite fellow
    nerds. We'll laugh. We'll cry. We may even hear a story without any
    industry jargon!
---
```

And you could replace the section in `_includes/home.njk` to look like this:

```pug
{% raw %}
<p class="max-w-md mb-8 mx-auto md:mx-0">
  {{ jumbotron.body }}
</p>
{% endraw %}
```

This is a long and often tedious process, but it's a game-changer when it comes to editing your site down the road. I'll leave the rest up to you and share where I ended up after going through the exercise. But first I want to talk about the process of abstracting components.

## Step 5: Abstracting Components

Extracting content from your pages and templates requires that you define the structure of your data. In Step 4, we could see the beginning of that structure — e.g. `jumbotron` was going to be its own section, presumably with multiple properties within it.

The resulting structure can help you determine where you can tighten up your template code further by looking for repeatable patterns.

For example, in this home page, each of the speakers has a similar shape to its content. So, even though you could define each speaker individually, it probably makes sense to develop a repeatable pattern, like this:

```yaml
speakers:
  - name: Speaker Name
    position: Title / Company
    fun_fact: Fun Fact
    image: /images/speakers/speaker-01.png
    social:
      twitter: "#"
      facebook: "#"
      instagram: "#"
  - name: Speaker Name
    position: Title / Company
    fun_fact: Fun Fact
    image: /images/speakers/speaker-02.png
    social:
      twitter: "#"
      facebook: "#"
  - name: Speaker Name
    position: Title / Company
    fun_fact: Fun Fact
    image: /images/speakers/speaker-03.png
    social:
      twitter: "#"
  - name: Speaker Name
    position: Title / Company
    fun_fact: Fun Fact
    image: /images/speakers/speaker-04.png
    social:
      twitter: "#"
      facebook: "#"
      instagram: "#"
```

This repeatable pattern hints that we could also abstract the code. Instead of having individual HTML for each speaker, we could create another _include_ template and render the content of each speaker.

Our `_includes/home.njk` file would include this:

```pug
{% raw %}
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-{{ lineup.speakers.length }}">
  {% for speaker in speakers %}
    {% include "speaker.njk" %}
  {% endfor %}
</div>
{% endraw %}
```

And then `_includes/speaker.njk` could look like this:

```pug
{% raw %}
<div class="mx-4 mb-8 lg:mb-0 template-home--speaker">
  <span class="block mb-2">
    <img src="{{ speaker.image }}" alt=""/>
  </span>
  <strong class="block mb-2 text-lg">{{ speaker.name }}</strong>
  <span class="block text-sm">
    <em>{{ speaker.position }}</em>
  </span>
  <span class="block text-sm">{{ speaker.fun_fact }}</span>

  <div class="flex items-center justify-center mt-4">
    {% if speaker.social.twitter %}
      <a href="{{ speaker.social.twitter }}" class="mx-1 hover:opacity-75 transition-all duration-300">
        <span class="inline-block bg-red text-white rounded-full p-2 overflow-hidden h-8 w-8 component--icon">
          {% include "svg/twitter.svg" %}
        </span>
      </a>
    {% endif %}
    {% if speaker.social.facebook %}
      <a href="{{ speaker.social.facebook }}" class="mx-1 hover:opacity-75 transition-all duration-300">
        <span class="inline-block bg-red text-white rounded-full p-2 overflow-hidden h-8 w-8 component--icon">
          {% include "svg/facebook.svg" %}
        </span>
      </a>
    {% endif %}
    {% if speaker.social.instagram %}
      <a href="{{ speaker.social.instagram }}" class="mx-1 hover:opacity-75 transition-all duration-300">
        <span class="inline-block bg-red text-white rounded-full p-2 overflow-hidden h-8 w-8 component--icon">
          {% include "svg/instagram.svg" %}
        </span>
      </a>
    {% endif %}
  </div>
</div>
{% endraw %}
```

That's 30-some lines of HTML, instead of more than 100! And if you want to change the presentation of a speaker, you only have to change it in one place.

[Here are the changes I made to the home page](https://github.com/seancdavis/stackbit-jamstack-journey/commit/b12ed710e55919ce73181c85f110c5ec027eac9a). And [here is what the resulting code looks like](https://github.com/seancdavis/stackbit-jamstack-journey/tree/b12ed71/04-content-driven-site). At this point, you have a website that is not just easy to edit its structure or presentation, but it's also trivial to create new pages or adjust values on the home page without searching through a bunch of HTML code to get there.

Go ahead, try it! Create a new `.md` file. Give it a `content-page` layout (like Terms and Privacy) and `title`, then see it come to life!

Now that you now how to templatize a static HTML site _and_ you can separate its content from presentation, you have two very important tools necessary to create rock solid websites with the Jamstack.
