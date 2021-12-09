---
title: Add Rake To Any Project
description: Rake is an awesome tool. You may want to use it in a non-Ruby
  project or a project that isn't configured for it.
tags:
  - rake
  - ruby
image: /blog/default/default-green-01.png
---

[Rake](https://github.com/ruby/rake) is a really powerful tool for automating any type of task. It can come in handy even in a project that doesn't have it installed. Heck, you can even use it in a non-ruby project if you want.

## 01: Install Rake

While you _could_ use system gems to get this setup, I'm going to take the approach that we want this to work consistently for multiple developers. That means we're going to wrap the gems we need up in the project.

So, first, make sure you have [Bundler](http://bundler.io/) installed.

Next, create a `Gemfile` in your project's root if it doesn't already have one.

If you had to create the Gemfile, then you'll need to add a `source` call to the top of it.

`Gemfile` {.filename}

```ruby
source 'https://rubygems.org'
```

Then we're going to add rake. (You can skip this if you already had a Gemfile that has this line.)

`Gemfile` {.filename}

```ruby
source 'https://rubygems.org'

gem 'rake'
```

Then use Bundler to install the gem.

    $ bundle install

This will create a `.bundle` directory at your project's root. If you aren't already, it's good to ignore this with git (add `.bundle/` to `.gitignore`).

## 02: Configure Rake

Next, create a `Rakefile` in your project's root, and add this one-liner:

`Rakefile` {.filename}

```ruby
Dir.glob(File.join('lib/tasks/**/*.rake')).each { |file| load file }
```

This is telling Rake to load every `.rake` file it finds in the `lib/tasks` directory.

## 03: Test It

Last, let's make sure it works. Let's add a dummy task to `lib/tasks/hello.rake`.

`lib/tasks/hello.rake` {.filename}

```ruby
task :hello do
  puts 'hello'
end
```

Now, from within your project, run the following command.

    $ bundle exec rake hello

It should say "hello" to you. If it does, you've set it up correctly!
