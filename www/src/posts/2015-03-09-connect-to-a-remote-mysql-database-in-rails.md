---
title: Connect to a Remote MySQL Database in Rails
tags:
  - mysql
  - ruby-on-rails
description: Using a remote database with rails is useful for collaborating on
  projects or for keeping all your data in one place. Here's how to get it set
  up from scratch.
image: /posts/default/default-green-03.png
---

Whether it's to share a development database among team members, or to keep a production database on a server separate from the application, or for any other reason, it can be useful to run a rails app by connecting to a remote database.

## The Remote Database

First, we need to set up the remote database. I'm going to assume that _you have a remote server with MySQL installed and access to the root MySQL user_. I'm also going to assume that you are cool with setting up MySQL first and creating the user and database within the `mysql` program.

_We're talking specifically about MySQL here, but you could apply a similar strategy in rails using [PostgreSQL](http://www.postgresql.org) or another type of database._

### Gathering Information

You're going to need the following:

- MySQL username and password for a user with super privileges
- Public IP address of your server
- Port MySQL is using
- Path to the MySQL socket file on your server

If using a dedicated Ubuntu server, along with the typical `apt` MySQL installation, the last two items can be found in the `/etc/mysql/my.conf` file.

### Logging In

Log in as a user with super privileges:

    $ mysql -u [username] -p

The `-p` means you are going to be prompted for a password. Enter your password (your typing won't show up) and hit `Enter`. You'll know you are in the `mysql` program because you'll see the `mysql>` command prompt.

### Create Database

Next, let's create the database (as the admin user):

    mysql> CREATE DATABASE [db_name]

The `[db_name]` value is the name of your rails database. Since it doesn't exists, you can call it whatever you want.

### Create User

We _could_ use the admin mysql user to connect to this database, but let's keep it a little more secure and create a user for this role:

    mysql> CREATE USER '[username]'@'%' IDENTIFIED BY '[password]';

You can pick the username and password, but make sure you remember them.

Next, you need to give that user _remote_ privileges to your database:

    mysql> GRANT ALL PRIVILEGES ON [db_name].* TO '[username]'@'%' WITH GRANT OPTION;
    mysql> exit;

### Open Up Ports

The last thing to do is make sure the port you are going to use to connect is open. Just as an example, I use `ufw` to manage firewall settings, so I'd do something like:

    $ sudo ufw allow 3306

## Rails App

Now you need to add the remote database setting to your rails app, which you probably know goes in `config/database.yml`. It's going to look something like this:

`config/database.yml` {.filename}

```yaml
[rails_env]:
  adapter: mysql2
  encoding: utf8
  pool: 5
  host: [mysql_ip]
  username: [mysql_username]
  password: [mysql_password]
  port: [mysql_port]
  socket: [path_to_mysql_socket_file]
  database: [db_name]
```

The `rails_env` is likely either `development` or `production`, while the others are values you either just created or found.

You should be up and running now! If you can start your server, then you know you're okay. You can also try to reset or migrate the database.
