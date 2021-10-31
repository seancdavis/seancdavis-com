---
title: Identify Liquid Bottlenecks by Profile Jekyll Builds
description: It's easy to let Liquid templates get away and bog down build
  times. Here's a quick way to find out which templates are the culprits.
tags:
  - jekyll
  - ruby
image: /blog/default/default-lime-01.png
---

The [Liquid templating language](https://shopify.github.io/liquid/) is made to be flexible through the use of filters, includes, and assigns. When working with a Jekyll project, especially one using dynamic data, that flexibility becomes the key factor in being able to scale the site while keep code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

But using liquid filters, includes, and assigns can quickly get out of hand and bog down your build times, making it difficult to scale your site.

Fortunately, there's a really great (and simple) way to figure out which templates are the problem. You can do this by profiling your build while it's running. Simply pass the `--profile` argument to the command and take a look at the output.

    $ bundle exec jekyll build --profile

That should lead to something like this:

    Filename                             | Count |    Bytes |  Time
    -------------------------------------+-------+----------+------
    _layouts/default.html                |   234 | 5046.84K | 4.897
    _includes/_head.html                 |   238 |  870.35K | 3.813
    _includes/_footer-script.html        |   238 |   34.63K | 0.845
    _layouts/song.html                   |    30 |  405.89K | 0.292
    _layouts/video.html                  |    25 |  281.09K | 0.291
    _layouts/article.html                |    38 |  348.48K | 0.263
    _layouts/tag.html                    |    72 |  230.42K | 0.232
    _includes/_video-card.html           |    37 |  164.96K | 0.137
    _includes/_article-card.html         |    47 |  153.30K | 0.136
    _includes/_tabs.html                 |    57 |   64.73K | 0.115
    _includes/_media-label.html          |   152 |  134.77K | 0.106
    _includes/_tags_list.html            |   104 |   23.54K | 0.102
    _layouts/author.html                 |    13 |   80.32K | 0.100
    ...

In this example, we can see the first three files take significantly longer to build than the rest. While that may be because they're being used frequently and not because they are inefficient, it at least provides a path forward on where to spend time optimizing the site.
