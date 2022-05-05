---
title: Ignore Files in 11ty for Faster Development Builds
description: >-
  A super quick and simple way to speed up the development experience on 11ty
  sites as they grow in size and complexity.
tags:
  - eleventy
tweet: >-
  A super simple way to significantly decrease @eleven_ty development builds and
  improve the DX. More than 2x faster in my case.


  Big props to @raymondcamden for this one!
image: /posts/220505/ignore-files-in-11ty-for-faster-development-builds-CIZIso4Q.png
seo:
  image: >-
    /posts/220505/ignore-files-in-11ty-for-faster-development-builds-yoG4ThJ6--meta.png
---

I was recently complaining to [Ray Camden](https://twitter.com/raymondcamden) about the 11ty development experience. My site has grown to several hundred pages and has some complex content relationships. It’s gotten to the point that I have to **wait about 15 seconds** to see content or code changes I’ve made.

When I’m writing content locally, this is an obnoxious waste of time.

Ray suggested I ignore files I knew I wasn’t going to use while developing. Because my post filenames are all prefixed with a date, I could easily do this by adding an `.eleventyignore` file to my project and ignoring posts from previous years:

`.eleventyignore` {.filename}

```txt
src/posts/2012-*.md
src/posts/2013-*.md
src/posts/2014-*.md
src/posts/2015-*.md
src/posts/2016-*.md
src/posts/2017-*.md
src/posts/2018-*.md
src/posts/2019-*.md
src/posts/2020-*.md
```

And then I ignore that file in `.gitignore`:

`.gitignore` {.filename}

```txt
.eleventyignore
```

⚡ This cut my development builds from **15 seconds to 7 seconds!** And reduced subsequent builds to 4 seconds with some caching in my asset pipeline.

It’s not perfect, but a _huge_ improvement. It at least makes this site feel manageable in development once again.
