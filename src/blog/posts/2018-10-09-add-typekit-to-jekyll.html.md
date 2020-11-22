---
title: How To Add Typekit to Jekyll Project
description: "Add Typekit fonts to your website built with Jekyll without making an additional request and slowing down performance."
tags:
  - jekyll
---

Typekit is a powerful way to add custom fonts to your project. There are three methods Typekit offers for adding its fonts to your site and making them available to use within your [CSS](/wtf-is-css) files. And there is a(t least one) problem with each method. First, let's look at the options:

The first way is to link to an external stylesheet:

```html
<link rel="stylesheet" href="https://use.typekit.net/[tk_id].css" />
```

Next, you can use the [`@import` CSS at-rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) directly within a CSS file:

```css
@import url("https://use.typekit.net/[tk_id].css");
```

And last you can use JavaScript to load the code asynchronously:

<!-- prettier-ignore -->
~~~js
(function(d) {
  var config = {
    kitId: '[tk_id]',
    scriptTimeout: 3000,
    async: true
  },
  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
~~~

The problem with each of these is that they make an additional request for the Typekit assets. (There's an additional issue with the first and the third approaches in that you have some extra work to do to avoid [FOUT](https://css-tricks.com/fout-foit-foft/)).

How do we get around making that additional request?

## Option 01: The Simple Approach

To avoid the request for the Typekit stylesheet, we could look at the contents of the file and copy them directly into our CSS stack. For example, one of my kit's main CSS file looks like this:

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

## Option 02: Easier Recovery

Alternatively, you could write a Jekyll plugin to go fetch the Typekit CSS file's contents and write them into a file within your project, rather them referencing them externally. The benefit to this approach is that every time you build your project the file is updated with the content Typekit is serving. So if Typekit changes the URLs to their font files all you have to do is rebuild your project and voila! it's fixed!

The first thing I'd do is abstract the variables to a site config object so you don't have to dig into the plugin if it changes:

`_config.yml` {.filename}

```yml
typekit:
  src: https://use.typekit.net/[tk_id].css
  dest: _assets/stylesheets/_fonts.scss
```

And the plugin could look something like this:

`_plugins/hooks/typekit_hook.yml` {.filename}

```rb
require 'open-uri'

Jekyll::Hooks.register(:site, :after_init) do |site|
  # Require typekit config options.
  if site.config.dig('typekit', 'src').nil? || site.config.dig('typekit', 'dest').nil?
    raise "Missing required Typekit config."
  end
  # Download CSS from TypeKit.
  typekit_url = site.config.dig('typekit', 'src')
  css_content = open(typekit_url) { |f| f.read }
  # If CSS is different from what we currently have, write to file.
  css_file = site.config.dig('typekit', 'dest')
  unless css_content == File.read(css_file)
    File.open(css_file, 'w+') { |f| f.write(css_content) }
  end
end
```

There's nothing else to do. Jekyll loads plugins automatically from the `_plugins` directory, so the next time you build your project, this will take effect.

Notice in this example that I'm writing the file to `_assets/stylesheets/_fonts.scss`. This is a [Sass](https://sass-lang.com/) file that I then consume in the manifest CSS file. I encourage you to use an approach like this otherwise you'll still end up with another request.

But we're not going to cover configuring your asset pipeline here. If you don't have an asset pipeline in your Jekyll project, check out [Jekyll Assets](https://github.com/envygeeks/jekyll-assets).
