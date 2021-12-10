---
title: List All Databases on MySQL Server
tags:
  - mysql
description: It's not that hard, but I keep forgetting how to do it, so I wrote it down.
image: /posts/default/default-lime-02.png
---

It's pretty simple, but something I've found myself looking for this a few times recently. Log into mysql as you normally would.

    $ mysql -uroot -proot

This will give you the mysql prompt, at which you can enter:

    mysql> SHOW DATABASES;

And you'll get your listing of databases! Make sure you use a semicolon to end that statement. It's easy to get caught up wondering why your command isn't executing.

Also, note you may use lower case here. In other words, this will work, too:

    mysql> show databases;
