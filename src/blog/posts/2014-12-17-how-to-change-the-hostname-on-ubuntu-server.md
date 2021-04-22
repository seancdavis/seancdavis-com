---
title: How to Change the Hostname on Ubuntu Server
tags: []
description: Got an ugly command prompt? Learn how to change the name of your computer.
---

To change the hostname on an Ubuntu server, you need to edit two files:

1. `/etc/hostname`
2. `/etc/hosts`

You'll need root permissions to edit. So, for #1:

    $ sudo vim /etc/hostname

> Note: Replace `vim` with the editor of your choice.

This file should just contain your hostname, so you can change the old name to the new name, then save and quit.

Next file:

    $ sudo vim /etc/hosts

You probably see something like this near the top of the file:

`/etc/hosts` {.filename}

```apacheconf
127.0.0.1       localhost
127.0.1.1       old_server_name

# ...
```

Here change what you find at `old_server_name` to your new hostname.

And reboot.

    $ sudo reboot
