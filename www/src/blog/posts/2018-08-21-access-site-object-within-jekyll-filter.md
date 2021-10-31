---
title: Access the Site Object within a Jekyll Filter
description: Filters are the way to make liquid work for you, but sometimes we
  want more context than we are given when running them.
tags:
  - jekyll
  - ruby
image: /blog/default/default-green-02.png
---

Jekyll was made to be flexible through the use of [plugins](https://jekyllrb.com/docs/plugins/). One such type of plugin is [a custom Liquid filter](https://jekyllrb.com/docs/plugins/#liquid-filters). Because the [Liquid templating language](https://shopify.github.io/liquid/) is limiting and because Jekyll pushes Liquid as the only templating option for sites built with its framework, it will eventually become necessary to write your own Liquid filter.

Let's say you're going to add a filter that formats a date for consistency across your site. Following the documentation, you can throw that filter in the `_plugins` directory with your Jekyll project:

`_plugins/format_date_filter.rb` {.filename}

```rb
module Jekyll
  module FormatDateFilter
    def format_date(date)
      Date.parse(item.to_s).strftime("%b %-d, %Y")
    end
  end
end

Liquid::Template.register_filter(Jekyll::FormatDateFilter)
```

This makes the filter available in your liquid templates:

{% raw %}

```liquid
{{ page.date | format_date }}
```

{% endraw %}

That's great. But now let's say (for whatever reason) you need access to the jekyll site within your filter.

Within the filter you have access to the `Jekyll` module, which maintains a `site` object on which it stores all the current sites. That means when you call `Jekyll.sites` you get all the current sites:

```rb
Jekyll.sites
# => [#<Jekyll::Site:0x007fb612355fc8>, ...]
```

If you only have one site, all you have to do is grab the first object in the array:

```rb
Jekyll.sites.first
# => #<Jekyll::Site:0x007fb612355fc8>
```

(If you have more than one site, you would have to search through the array of sites to find the appropriate one. But, honestly, I can't think of a useful scenario in which you have more than one site. If the need arose, I'd abstract the necessary logic and create multiple Jekyll projects.)

And that's it. Now you have access to the site object. Now you have access to all the data within the site object, as you would when writing another type of Jekyll plugin.
