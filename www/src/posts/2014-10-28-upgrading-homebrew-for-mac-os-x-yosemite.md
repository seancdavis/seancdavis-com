---
title: Upgrading Homebrew for Mac OS X Yosemite
tags: []
description: A new operating system means taking a few minutes to upgrade
  Homebrew. Here is how I went through the process.
image: /posts/default/default-pink-01.png
---

You've installed Mac OS X Yosemite, and now it's time for that feared task -- upgrading Homebrew.

At first, `brew` wouldn't work at all. I saw this error:

    /usr/local/bin/brew:
    /usr/local/Library/brew.rb:
    /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby:
    bad interpreter: No such file or directory

This was fixed by changing `1.8` on the first line of `/usr/local/Library/brew.rb` to "Current." Found that trick [here](http://blog.ic3man.gr/2014/06/homebrew-ruby-bad-interpreter-no-such-file-or-directory/).

Next, I went to upgrade Homebrew.

    $ brew upgrade

## Issues

### Bundler & OpenSSL

Then I ran into an error with Bundler and OpenSSL, since Apple has ditched OpenSSL for their own encryption library. My error from running `bundle install` was:

    Symbol not found: _SSLv2_client_method (LoadError)

This was fixed by relinking `gcc` and reinstalling the version of Ruby I was using.

    $ export CC=/usr/bin/gcc
    $ rbenv install 2.1.0

    rbenv: /Users/sean/.rbenv/versions/2.1.0 already exists
    continue with installation? (y/N) y

### RMagick, Nokogiri & Libiconv

When trying to run a Rails project, I started with this issue related to RMagick:

    This installation of RMagick was configured with ImageMagick 6.8.8
    but ImageMagick 6.8.9-8 is in use. (RuntimeError)

Removing the bundle and _trying_ to reinstall, like so:

    $ rm -rf .bundle
    $ bundle install

Led to another error, this time from nokogiri:

    Building nokogiri using packaged libraries.
    -----
    libiconv is missing.
    please visit http://nokogiri.org/tutorials/installing_nokogiri.html
    for help with installing dependencies.
    -----

    extconf failed, exit code 1

This was fixed using the following commands:

    $ xcode-select --install
    $ gem uninstall nokogiri
    $ gem install nokogiri
    $ rbenv rehash

**Here are a few important notes regarding this issue:**

- I use `rbenv` for managing rubies, which may change your process.
- You'll (likely) needed to have gone through the reinstallation of your Ruby.
- You'll also probably have to uninstall and reinstall the bundle for every Ruby project using this version of Ruby.

### Postgres

I had installed postgres via Homebrew and the upgrade to Yosemite removed some directories. Follow [this advice](http://stackoverflow.com/a/26001639/2241124) I was able to get postgres running again.

    $ mkdir /usr/local/var/postgres/pg_tblspc
    $ mkdir /usr/local/var/postgres/pg_twophase
    $ mkdir /usr/local/var/postgres/pg_stat_tmp

It may start automatically after that. If not, you can run:

    $ brew info postgres

And at the bottom, you'll see some instructions on how to proceed. Something like this:

    To have launchd start postgresql at login:
        ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
    Then to load postgresql now:
        launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
    Or, if you don't want/need launchctl, you can just run:
        postgres -D /usr/local/var/postgres

Feel free to [let me know](http://twitter.com/seancdavis29) if you run into other quick fixes I should add to this article.
