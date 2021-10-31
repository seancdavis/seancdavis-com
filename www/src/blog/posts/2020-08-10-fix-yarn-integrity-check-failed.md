---
title: How to Fix "Integrity check failed ..." Yarn Error
description: What to do when running into integrity check errors with Yarn.
tags:
  - yarn
image: /blog/default/default-lime-03.png
---

Seeing an error like this?

    error https://registry.yarnpkg.com/...:
    Integrity check failed for "..."
    (computed integrity doesn't match our records, got "sha512-... sha1-...")

Yarn suggests clearing the cache, which you can do with:

    $ yarn cache clean

That didn't work for me because the integrity checksum was stored in the `yarn.lock` file. One option is to delete that file and regenerate it by running:

    $ yarn install

That didn't work for me either, and it's not a great practice. In that case you're potentially updating all packages when really you just have a single issue with a single package.

Instead, I ran the following command:

    $ yarn --update-checksums

This updated all the integrity checksums and then I was able to install the remainder of the packages and get the project working.

---

**References**:

- [GitHub Issue: yarn install sporadically fails with integrity check failure](https://github.com/yarnpkg/yarn/issues/6407)
