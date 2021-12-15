---
title: Transition Between Database Adapters in Rails
description: Transitioning from one database to another, or even to a whole new
  database with a new adapter, can be tough. Here's an easy way to transition
  content.
tags:
  - ruby-on-rails
image: /posts/default/default-pink-01.png
---

For whatever reason, you might just need to transition your Rails app's content from one database type to another (or even just to a new database with the same adapter). I've found that [yaml_db](https://github.com/yamldb/yaml_db) does a great job helping you with this task.

The first thing to do is get `yaml_db` installed.

`Gemfile` {.filename}

```ruby
gem 'yaml_db'
```

Then bundle.

    $ bundle install

To dump the data, just run the appropriate rake task.

    $ bundle exec rake db:data:dump

Then, switch your database over to the new database. _Note: If you're switching adapters, make sure you have the appropriate gem(s) installed._

You'll need to make sure your database is setup. If it isn't, then get on it!

    $ bundle exec rake db:create
    $ bundle exec rake db:migrate

And then you can bring the data into the new database.

    $ bundle exec rake db:data:load

Nice and easy! Be sure to note that if you're doing this to _move_ content, then you may need to go through additional steps to move any uploaded assets.

---

**References:**

- [yaml_db](https://github.com/yamldb/yaml_db)
