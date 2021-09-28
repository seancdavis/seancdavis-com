---
title: Setup Ubuntu for Web Development in One Command (and some config)
tags:
  - ubuntu
description: "If you repeat tasks over and over to setup new Ubuntu web development machines, perhaps you'll find some use in a script I wrote to solve this issue."
---

I don't manage a ton of servers, but I've set up enough to get tired of going through the long process over and over. I wanted a better solution.

Most of my servers are hosted by [Digital Ocean](https://www.digitalocean.com/) (which is a fantastic service), and they let you create images. This worked for me for awhile, but every once in awhile you need new software, and an image creates a point in time that an update to that software won't necessarily fix.

So I created [Ripen](https://github.com/seancdavis/ripen) -- a one-command script that will install essentially anything you need. It's a little more involved than that, but it does get you up and running quickly.

Here's a quick reiteration of [the usage section](https://github.com/rocktree/ripen#running-the-script) of the README.

First, make sure you are running as `root`.

    $ sudo su -

This should switch you to the root home directory. Next, install and edit the config file.

    $ wget https://raw.githubusercontent.com/rocktree/ripen/master/ripen.conf
    $ vim ripen.conf

I've added a handful of installation options. They are all relevant when I create a blank Digital Ocean droplet. But if I install [Ubuntu Server](http://www.ubuntu.com/server) on a machine at home, then I already have a lot of the items shown here. For example, I might change all of these items:

`ripen.conf` {.filename}

```bash
# -------------------------------------- User Account

# ...

add_user=false

# ...

# -------------------------------------- Bash Config

# ...

adjust_bash_config=false

# ...

add_bash_profile=false

# -------------------------------------- PostgreSQL

# ...

install_postgresql=false

# -------------------------------------- Swapfile

# ...

add_swapfile=false
```

And, of course, don't forget to fill in the rest of the options for your specific configuration. This is just one example.

And, last, **make sure you delete your config file** - it contains plain text passwords.

    $ rm ripen.conf

If you have changes or want options added, I am accepting pull requests, or you can [create a feature request](https://github.com/seancdavis/ripen/issues/new).
