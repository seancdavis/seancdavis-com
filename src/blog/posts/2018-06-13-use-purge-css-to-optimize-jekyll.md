---
title: "Use PurgeCSS To Optimize Stylesheet with Jekyll"
description: "Typically your application's stylesheet bundle contains several rules your site doesn't need. Here's how to use PurgeCSS to remove those unused styles when you're working on a Jekyll site."
tags:
  - css
  - jekyll
  - optimization
---

Stylesheets are notorious for quickly getting out of hand. Even if you stay super organized, you're going to end up with several rules that your site doesn't need.

And if you use a [CSS](/blog/wtf-is-css/) framework, like [Bootstrap](http://getbootstrap.com/) or [Foundation](https://foundation.zurb.com/), there are likely _tons_ of unused styles (because there are so many setting the boilerplate for you/).

Tools like [PurgeCSS](https://www.purgecss.com/) can be really helpful for cleaning up unused CSS rules. The problem is, in today's world, many of our projects are built either as single page apps (SPAs), using JavaScript to generate the content, or as dynamic, database-driven web applications, where the content can't be predicted. But when you're working with a static site generator (like [Jekyll](https://jekyllrb.com/)) solving this problem is much more obtainable because know all (or at least _most of_) the content after we build our site to flat [HTML](/blog/wtf-is-html/) files.

So, assuming we're using Jekyll, let's take a look at how we can incorporate PurgeCSS to clean up our stylesheet after we build.

## Install & Test PurgeCSS

First, let's get PurgeCSS on our machine:

    $ npm install -g purgecss

Then, build your Jekyll project:

    $ bundle exec jekyll build

My site gets built to `_site`.

### Jekyll Assets

I am using [Jekyll Assets](https://github.com/envygeeks/jekyll-assets) for the asset pipeline in my project. By default, the assets are output to an `assets` directory during the build.

I've named my main stylesheet `application.scss`, which means it will be built to `_site/assets/application-[hash].css`, where the hash is some fingerprinted digest that Jekyll Assets appends to the manifested file to bust the cache of any previously-generated asset.

### Testing PurgeCSS

We can test that PurgeCSS will work for us by running the following command:

    $ purgecss --css PATH/TO/STYLESHEET --content PATH/TO/BUILT/HTML/FILES

For my build settings, I've shown you where the stylesheet is. For the HTML files, I use a wildcard to glob all HTML files in my built project. Therefore, my command typically looks something like this:

    $ purgecss --css _site/assets/application-3159232e1e2881678879b9d3d049d8d34bca88e19be1b1d571025aff16239133.css --content _site/**/*.html

**Again, this may be different for you based on your asset and build configuration.**

But, you should have seen your stylesheet reduce in size at an alarmingly fast rate (which is why I love PurgeCSS). The first time I ran this my stylesheet when from 499 KB to 24 KB! (There are several reasons why it could be reduced so much, but those aren't important now. If you get any reduction, we'll call it a win!)

## Writing a Plugin

The next step is to add this task to the build process. We can do this via a [hook plugin](https://jekyllrb.com/docs/plugins/). We want this plugin to identify the stylesheet (since its name changes during each build) and then run the command.

Let's take a look at the plugin I'm using and then we can walk through some of its important features.

`_plugins/hooks/purgecss.rb` {.filename}

{% raw %}

```ruby
Jekyll::Hooks.register(:site, :post_write) do |_site|
  # Temp file to store options. Command line would not accept a series of
  # whitelist classes, and there are a few classes purgecss is missing.
  config_file = 'tmp/purgecss.js'
  # Make sure the tmp directory exists.
  FileUtils.mkdir('tmp') unless Dir.exist?('tmp')
  # Delete existing config file, if it exists.
  File.delete(config_file) if File.exist?(config_file)
  # Configuration JS to write to the file. (Docs: https://www.purgecss.com/configuration)
  config_text = """module.exports = #{{
    # Wildcard glob of the site's HTML files.
    content: ['_site/**/*.html'],
    # CSS file in the expected output directory.
    css: [Dir.glob('_site/assets/*.css').first],
    # We'll get to this shortly ...
    whitelist: %w(wl-class-1 wl-class-2)
  }.stringify_keys.to_json}"""
  # Write configuration file.
  File.open(config_file, 'w+') { |f| f.write(config_text) }
  # Run purgecss command.
  system("purgecss --config #{config_file} --out _site/assets")
end
```

{% endraw %}

Notice that the hook happens after the site has been written (`Jekyll::Hooks.register(:site, :post_write)`). This is to ensure all the HTML files and the stylesheet are already in place.

Next, we generate a config file for PurgeCSS. I found that was easier than working with the CLI for PurgeCSS. Notice that I can define my configuration in ruby and then convert it to JSON to be written to the file using `.stringify_keys.to_json`:

{% raw %}

```ruby
config_text = """module.exports = #{{
  content: ['_site/**/*.html'],
  css: [Dir.glob('_site/assets/*.css').first],
  whitelist: %w(wl-class-1 wl-class-2)
}.stringify_keys.to_json}"""
```

{% endraw %}

Then we can write the config file:

```ruby
File.open(config_file, 'w+') { |f| f.write(config_text) }
```

And then we're ready to run the `purgecss` command by passing the config file location:

```ruby
system("purgecss --config #{config_file} --out _site/assets")
```

That's it! Build your site and you should see a stylesheet that is similar in size to the one you saw after you ran the command directly.

## Identifying Your Whitelist

When you test your build (whether on a server or by [running a local server](/blog/run-local-web-server-ruby/) in your build directory/) you naymay likely have some selectors that didn't come through.

If any of your selectors are added to the DOM with JavaScript, PurgeCSS is not going to catch them. For me those selectors were fairly predictable, so I manually added them to the whitelist config. In my example the whitelist adds `.wl-class-1` and `.wl-class-2` to PurgeCSS so it automatically adds rules for those selectors, even if it doesn't find the appropriate elements in thte HTML files.

Notice that the whitelist is an array of strings without the leading `.` for the class. This is because the whitelist **is only a list of class selectors**. So, you should be using class selectors for you CSS. This is good practice anyways, as it doesn't tie specific styles to elements within a particular context or scope, which can be difficult to debug and messy to override.

## Prepping for Production

When you're ready to go to production, there are two items we have to address.

First, make sure installing `purgecss` is part of the build process if your site is being built on an external server. For example, I'm using [Netlify](/blog/wtf-is-netlify/), so I have prepended my build task with `npm i -g purgecss` so the build process has the `purgecss` command available to it.

And lastly, you're going to see an error with the integrity of the manifest stylesheet in production. Why? Because we changed the file after it was generated, which is what the [integrity attribute](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) is built to catch.

In this case, I've chosen not to pursue how to regenerate that hash and have chosen to avoid it altogether by removing it from the resulting `<link>` tag in my HTML files. This can be accomplished like so:

{% raw %}

```liquid
{% asset application.scss !integrity %}
```

{% endraw %}

I hope this process went smoothly for you and now you have a much smaller CSS file to deliver to your users in production.

---

**References**

- [Jekyll Assets](https://github.com/envygeeks/jekyll-assets)
- [PurgeCSS](https://www.purgecss.com/)
