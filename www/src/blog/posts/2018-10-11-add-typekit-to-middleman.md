---
title: How To Add Typekit to Middleman Project
description: Add Typekit fonts to your website built with Middleman without
  making an additional request and slowing down performance.
tags:
  - middleman
image: /blog/default/default-green-01.png
---

I wrote in [the Jekyll equivalent of this article](/blog/add-typekit-to-jekyll/) that there are three methods Typekit offers for adding its fonts to your site and making them available to use within your [CSS](/blog/wtf-is-css/) files.

Via an external stylesheet:

```html
<link rel="stylesheet" href="https://use.typekit.net/[tk_id].css" />
```

Using the [`@import` CSS at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@import):

```css
@import url("https://use.typekit.net/[tk_id].css");
```

Or loading with JavaScript:

<!-- prettier-ignore -->
```js
(function(d) {
  var config = {
    kitId: '[tk_id]',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
```

_(Note: `[tk_id]` is the unique ID value for your kit.)_

And if you read that article (although why would you be a crazy person like me and work on projects in both Jekyll and Middleman?), you learned that the problem with each of these is that they make an additional HTTP request for the Typekit assets. (There are other issues concerning [FOUT](https://css-tricks.com/fout-foit-foft/), but we're not going to worry about those here.)

Instead let's focus on how we get around making that additional requests. There are two relatively simple approaches: _the lazy way_ and by _writing a custom Middleman extension_.

## Option 01: The Lazy Way

To avoid the request for the Typekit stylesheet, we could look at the contents of the file and copy them directly into our CSS stack. CSS files from Typekit look something like this:

`https://use.typekit.net/[tk_id].css` {.filename}

```css
/* Lots of comments up here ... */

@import url("https://p.typekit.net/p.css?s=1&k=[tk_id]&ht=tk&f=32226.32227.32230.32231.39710.39712&a=2470098&app=typekit&e=css");

@font-face {
  font-family: "din-2014";
  src: url("https://use.typekit.net/af/4b34d2/00000000000000003b9b0acf/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("woff2"), url("https://use.typekit.net/af/4b34d2/00000000000000003b9b0acf/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("woff"),
    url("https://use.typekit.net/af/4b34d2/00000000000000003b9b0acf/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3")
      format("opentype");
  font-style: italic;
  font-weight: 400;
}

/* More font faces down here ... */

.tk-din-2014 {
  font-family: "din-2014", sans-serif;
}
.tk-unit {
  font-family: "unit", sans-serif;
}
```

You _could_ just copy the contents of this right into our project, and in many cases you'd probably be fine.

But notice the URL used for the actual fonts. They are dynamic and -- being that they are controlled by Typekit -- could change at any point. One day your fonts could be working fine, the next they could be broken and you'll have to remember to go find your Typekit file again and replace it with the new contents.

If you're willing to take on that risk, you can stop here.

## Option 02: Custom Middleman Extension

Alternatively, you could write a [custom Middleman extension](https://middlemanapp.com/advanced/custom-extensions/) to fetch the Typekit CSS file's contents and write them into a file within your project, rather them referencing them externally.

The benefit to the extension approach is that every time you build your project the file is updated with the content Typekit is serving. So if Typekit changes the URLs to their font files all you have to do is rebuild your project and your project is fixed!

First, let's look at what the extension looks like. (I like to put my custom extensions in a `lib` directory.)

`lib/extensions/typekit.rb` {.filename}

```rb
require 'open-uri'

class Typekit < Middleman::Extension

  # Options passed when activating the extension.
  option :url, nil, 'URL to Typekit CSS file.'
  option :output_path, 'source/stylesheets/fonts.css', 'Path to output file, relative to project root.'

  def initialize(app, options_hash = {}, &block)
    # Custom extensions should call super to let Middleman handle the setup
    # before doing any work.
    super
    raise "Missing option: url" if options.url.blank?
    sync_fonts
  end

  private

    def sync_fonts
      # Download CSS from TypeKit.
      fonts_css = open(options.url) { |f| f.read }
      # If CSS is different from what we currently have, write to the fonts partial.
      if !File.exists?(options.output_path) || fonts_css != File.read(options.output_path)
        File.open(options.output_path, 'w+') { |f| f.write(fonts_css) }
      end
    end

end
```

If you've ever written a custom Middleman extension, this is going to look super simple to you, because there's not really much to it. All we're doing is looking at the options passed when activating the extension and using them to download a file from a URL to a local file, which is a simple and common practice in Ruby.

The last thing we have to do is require and activate the extension in the config file.

`config.rb` {.filename}

```rb
require 'lib/typekit'

activate :typekit,
         url: 'https://use.typekit.net/[tk_id].css',
         output_path: 'source/stylesheets/_fonts.scss'

# Rest of config
```

Notice in this example that I'm writing the file to `source/stylesheets/_fonts.scss`. This is a [Sass](https://sass-lang.com/) file that I then consume in the manifest CSS file. I encourage you to use an approach like this otherwise you'll still end up with another request.

But we're not going to cover configuring your asset pipeline here. You can learn more about asset pipelines in Middleman [in the docs](https://middlemanapp.com/advanced/asset-pipeline/).
