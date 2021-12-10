---
title: Connect to Multiple Databases in a Rake Task with Rails
tags:
  - rake
  - ruby-on-rails
description: Sometimes you need access to multiple database within a single rake
  task, for whatever reason. Here's how you do it.
image: /posts/default/default-lime-03.png
---

I've run into a few scenarios in which I need to get data from some other space into my rails app. When the data has been in a different structure, I tend to export it to CSV using some [GUI](http://en.wikipedia.org/wiki/Graphical_user_interface), and then parse the CSV and bring it into my current app.

But, in the case where your data is in a similar structure, it's much simpler to read from the old database, store the data to memory, and then save it to your current database.

We're going to do this within a rake task.

## Connecting to Multiple Databases within a Rake Task

### Database Config

First thing's first: configure your database appropriately. We need a separate entry in your `database.yml` file for each database.

For example, your database config may look something like this:

`config/database.yml` {.filename}

```yaml
default: &default
  adapter: mysql2
  encoding: utf8
  pool: 5
  username: root
  password: root
  socket: /tmp/mysql.sock

development:
  <<: *default
  database: my_app_development

test:
  <<: *default
  database: my_app_test
```

Add your additional entry. It works much better when you append the environment to the end of the name. So, if you're going to run this task in development, call it something like `old_db_development`, like so:

`config/database.yml` {.filename}

```yaml
# ...

old_db_development:
  <<: *default
  database: my_old_db
```

### Connect to Database

You can connect to a database using the following command:

```ruby
ActiveRecord::Base.establish_connection(database_name)
```

where `database_name` is the name of the key in your `database.yml` file.

So, your rake task setup looks something like this:

```ruby
desc 'My import task'
task :import do
  ActiveRecord::Base.establish_connection('old_db_development')
  # logic to store old data to memory

  ActiveRecord::Base.establish_connection('development')
  # logic to import stored data
end
```

## An Example

If that's too abstract, let's look at an example. Let's say you backup your posts every day, and you accidentally deleted a post. Here's how we might restore it.

First, assume the following database config:

`config/database.yml` {.filename}

```yaml
default: &default
  adapter: mysql2
  encoding: utf8
  pool: 5
  username: root
  password: root
  socket: /tmp/mysql.sock

development:
  <<: *default
  database: my_app_development

backup_development:
  <<: *default
  database: my_backup_db
```

The task might look something like this:

`lib/tasks/restore_posts.rake` {.filename}

```ruby
desc 'Restore missing posts'
task :restore_posts do
  # Store old posts in a `posts` array
  ActiveRecord::Base.establish_connection('backup_development')
  old_posts = []
  Post.all.each { |post| old_posts << post }

  # Recreate missing posts from missing ids
  ActiveRecord::Base.establish_connection('development')
  current_posts = Post.all
  missing_ids = old_posts.collect(&:id) - current_posts.collect(&:id)
  missing_posts = old_posts.select { |p| missing_ids.include?(p.id) }
  missing_posts.each { |post| Post.create!(post) }
end
```

_Note: This is a theoretical example. It's not tested._
