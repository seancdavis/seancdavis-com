---
title: Scrape and Parse A Webpage with Ruby (using Nokogiri)
description: A quick way to pull content from a URL and parse it using Ruby.
tags:
  - ruby
image: /posts/default/default-green-01.png
---

Our goal here is going to be to grab a web page and parse its [HTML](/posts/wtf-is-html/) code, in preparation for doing _something_ with it.

Before we get started, I want you to know that this can be re-interpreted in many ways. I am going to create an overly-simple, but real example so we can see it work. This example is _to pull a list of the top trending articles from Google and output their title._

But, even though I'm using an example to demonstrate, you should know that there are many other options. For example, you could use it in [a rake task](https://github.com/ruby/rake). Or you could [write a command-line script](/posts/command-line-scripts-using-ruby/). Or, you may want to pull news articles from several different place. (I'll likely have a few other posts that take the basics of this and apply it to other real-world scenarios.)

In any case, the world is your oyster! This is just a starting point.

## 01: Setup

To parse HTML, we're going to use [Nokogiri](http://www.nokogiri.org/). So, the first thing to do is to ensure you have Nokogiri installed, whether globally or locally within your project.

## 02: Scrape

Before we get into parsing, let's just make sure we have everything set up. You should be able to run the following and see the HTML output.

```ruby
doc = Nokogiri::HTML(open('https://news.google.com'))

puts doc
```

If you are returned with a bunch of HTML text, then you are good to go!

## 03: Parse

The cool thing with Nokogiri is that we can [search within a document](http://www.nokogiri.org/tutorials/searching_a_xml_html_document) to target specific elements.

For example, let's see how long the string of output is from the original request.

```ruby
doc = Nokogiri::HTML(open('https://news.google.com'))

puts doc.to_s.size
```

I got `602985`, but you may see something slightly different (since the content is always changing).

Now, let's narrow the code down to what's in the `body` only.

```ruby
doc = Nokogiri::HTML(open('https://news.google.com'))

puts doc.css('body').first.to_s.size
```

This time I got `427821`, or a 30% reduction in text.

### Key: Find the closest unique ancestor

The key to making this work well and quickly is to find the closest **unique** ancestor to the elements you're working with.

It being _unique_ is imperative. Often times classes are reused throughout a page, and this Google News page is no different. At the time I'm writing this, the closest shared ancestor of the top six stories is this:

```html
<div class="section-content"></div>
```

The problem is the `section-content` class is used throughout the page, so targeting this one becomes difficult.

If I go up another level, I see a `div` with a class `section-toptop`. A quick search tells me this one is unique.

### Collect the necessary elements within the ancestor

Now that we have that ancestor, let's find what's common among the elements we want to target.

This usually takes some trial and error. But let's get creative. So we know the wrapper is `div.section-toptop`. And we see that (at least at the time I'm writing this) the articles have a class `esc-wrapper`. So let's see exactly how many `esc-wrapper` classes are within `section-toptop`.

```ruby
doc = Nokogiri::HTML(open('https://news.google.com'))

puts doc.css('div.section-toptop div.esc-wrapper').size
```

I get `6`, which is the exact number I'm looking for!

### Dig in to get the content you need

So, now that we have the wrappers for each of our elements, let's dig into them and extract the content we need.

Some more digging leads me to see that each title has a class of `esc-lead-article-title`.

Let's begin by outputting the text within those titles:

```ruby
doc = Nokogiri::HTML(open('https://news.google.com'))

css = 'div.section-toptop div.esc-wrapper .esc-lead-article-title'

doc.css(css).each do |title|
  puts title.text
end
```

This produces the following output for me:

```
Man Accused in Kalamazoo Shootings Has Driven for Uber
Donald Trump's Victory Spurs Renewed Scrambling Among Republicans
Why Clinton, Not Sanders, Probably Won the Hispanic Vote in Nevada
Kerry claims "provisional agreement" on Syrian cease-fire
London Mayor Boris Johnson backs 'Brexit,' boosting anti-EU campaign
Syria: Dozens killed as bombers strike in Homs and Damascus, regime says
```

Pretty cool, huh?

_Note: The reason I can do `.each` on the result of the `css` method is because what is returned is **an array of matches**, regardless of the count._

## 04: Wrapping Up

It's pretty awesome how easy Nokogiri makes all of this. You can see the key is using HTML and [CSS](/posts/wtf-is-css/) selectors to pinpoint the collection of nodes/elements you want to work with.

You probably also noticed that with each time we changed our code, it took a little bit longer. That's because parsing HTML is complex and cumbersome. That will make scaling with this type of method pretty difficult.

But I hope you can see there's a ton you can do now that you can parse any live web page. And I plan to include some more specific (and more useful) examples in the future.

If there's a specific example you'd like to see, [hit me up](https://twitter.com/seancdavis29)
