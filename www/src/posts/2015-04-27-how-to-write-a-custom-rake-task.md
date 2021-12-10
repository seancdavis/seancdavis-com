---
title: How to Write a Custom Rake Task
tags:
  - rake
  - ruby-on-rails
description: Rake provides a great way to automate repetitive or complex tasks.
  Here's a look at creating a simple and a more complex task.
image: /posts/default/default-orange-01.png
---

[Rake](https://github.com/ruby/rake) is a nice, powerful tool for automating tasks in a ruby project.

We've chatted here about [how to accept arguments within a rake task](/posts/4-ways-to-pass-arguments-to-a-rake-task/), and I suspect that will be of use coming out of this discussion. However, for the purposes of getting started with rake, let's consider some simple examples.

## Setup

First, you need to get setup. If your project doesn't already have rake installed, then you'll need to add it to your project. I wrote [an article on just that topic](/posts/add-rake-to-any-project/).

## Rake Syntax

Rake tasks follow this convention:

```ruby
desc '...'
task :name do
  # task code ...
end
```

Rake tasks have three main parts:

- description
- name
- code block

The description (`desc`) gives a brief description of what the task does, which comes in handy when you start adding a handful of tasks. The name is a unique way in which you identify the task. And last, the code block is the code that is executed when the task is run.

In addition, note that although rake tasks are written in ruby, their file extension **is `.rake`, NOT `.rb`**.

### List Available Tasks

At any point you can see the available tasks by running:

    $ rake -T

_Note: This ignores tasks without descriptions. To see all tasks (including tasks without description, you can add a `v` option:_

    $ rake -vT

_Also note: If you are using `rake` from your Gemfile, it's best to use `bundle exec` to ensure we run the correct version of rake:_

    $ bundle exec rake -vT

## A Simple Task

Let's add the simplest of all the simple tasks ever there were. Our "Hello World" task will simply tell us "Hello."

Here's what it would look like:

`lib/tasks/hello_world.rake` {.filename}

```ruby
desc 'Say hello!'
task :hello_world do
  puts "Hello"
end
```

Let's list out our rake tasks to find the one we just wrote.

    $ rake -vT

Along with any other tasks in your project, you should see this line:

    rake hello_world    # Say hello!

This means you can run this test from your project's root like so:

    $ rake hello_world

## Getting More Complicated

Really, rake is just a means by which you can execute ruby scripts. Therefore, it can do almost anything you can imagine to help you be more productive.

Let's take a task I put into most Ruby on Rails projects. This task finds all of the models in your application and creates CSV files for you to fill in seed data.

First let's look at the task, then we'll break it down.

`lib/tasks/db.rake` {.filename}

```ruby
namespace :db do

  namespace :seed do

    desc "Create CSV Files for Models"
    task :create_files => :environment do
      Dir.glob("#{Rails.root}/app/models/*.rb").each { |file| require file }
      dir = "#{Rails.root}/db/csv"
      FileUtils.mkdir(dir) unless Dir.exists?(dir)
      ActiveRecord::Base.descendants.each do |model|
        unless File.exists?("#{dir}/#{model.to_s.tableize}.csv")
          File.open("#{dir}/#{model.to_s.tableize}.csv", 'w+') do |f|
            f.write(model.columns.collect(&:name).join(','))
          end
          puts "CREATED FILE >> #{model.to_s.tableize}.csv"
        end
      end
    end

  end

end
```

### Namespace

A _namespace_ simply segments the task. The task, named `create_files` would otherwise sit on its own and not give you much inclination as to what it did (other than create files). One alternative would be to name it `create_db_seed_files`, but instead I've put it in its own namespace.

This means this task would be called as `rake db:seed:create_files`, which fits in nicely with other `db` tasks.

### Loading the Environment

In Rails, if you want access to `ActiveRecord` models, you have to load in the environment, which is done via `=> :environment`. The line below doesn't just initiate the task. It also loads the environment.

```ruby
task :create_files => :environment do
```

### Requiring Files

```ruby
Dir.glob("#{Rails.root}/app/models/*.rb").each { |file| require file }
```

Inside the task, we first make sure we include all the files. `glob` steps through each file in the specified path, which we called the `file` variable, while we simply `require` it.

### Creating Directories

Next, we make a new directory to place our files in, unless it already exists.

```ruby
FileUtils.mkdir(dir) unless Dir.exists?(dir)
```

### Stepping Through Models and Creating Files

The next thing (our guts) all happens in one loop. The loop begins by stepping through each `ActiveRecord` model, as we do with this line:

```ruby
ActiveRecord::Base.descendants.each do |model|
```

Now the model is available via the `model` object. We check to see if the seed file already exists:

```ruby
unless File.exists?("#{dir}/#{model.to_s.tableize}.csv")
```

And if it doesn't, then we write a new file.

```ruby
File.open("#{dir}/#{model.to_s.tableize}.csv", 'w+') do |f|
```

Within that file (with the `f` object), With initialize it by make that models columns the headers in the file.

```ruby
f.write(model.columns.collect(&:name).join(','))
```

And last, we let the user know we created a file.

```ruby
puts "CREATED FILE >> #{model.to_s.tableize}.csv"
```

That's just one example, but you can see how you can take time-consuming tasks and turn them into repeatable solutions via a `rake` task.
