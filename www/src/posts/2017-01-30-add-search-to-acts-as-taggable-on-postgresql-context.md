---
title: Add Search to ActsAsTaggableOn with PostgreSQL and Context
description: ActsAsTaggableOn is a great gem for working with tags in your
  application, but it can be a PITA when you want to be able to search for tags.
tags:
  - postgresql
  - ruby
image: /posts/default/default-lime-03.png
---

I have always been one to build my own system when it comes to adding a tagging
functionality into an application. But after looking back at
[ActsAsTaggableOn](https://github.com/mbleigh/acts-as-taggable-on), I decided
to pursue for my current project. It's well-supported and has a lot of helpful
features.

But then I ran into an issue. I was to build a contextual tag-based field with
autocomplete, and there seemed no simple way to search tags. So here's how I
went about solving the problem:

## Step 01: Install pg_search

If you're using PostgreSQL in your project (and I encourage you to do so),
[`pg_search`](https://github.com/Casecommons/pg_search) is an amazing tool for
implementing searching functionality in your models.

So, first thing's first: add pg_search to your Gemfile and install it.

`Gemfile` {.filename}

```ruby
source 'https://rubygems.org'

# ...

gem 'pg_search'
```

## Step 02: Extend ActsAsTaggableOn

OK, we have pg_search, but now we need to get it into the correct model, which
is `ActsAsTaggableOn::Tag`. How the heck can we do that?

Well, we have a few options, but let's do this. Create a directory in `app/utilities` and drop a file called `search_tags.rb` in there.

Here's what it should look like:

`app/utilities/search_tags.rb` {.filename}

```ruby
ActsAsTaggableOn::Tag.class_eval do
  include PgSearch

  pg_search_scope :search, :against => [:name],
    :using => {
      :tsearch => {
        :prefix => true, :negation => true, :dictionary => 'english'
      }
    }
end
```

This looks just like what you'd put in the model, right? Exactly! All we're doing is using [Ruby's `class_eval` method](http://apidock.com/ruby/Module/class_eval) to open the model class and insert the support for pg_search.

But, there are a few important points to note here:

1. The `utilities` name choice was completely arbitrary. You can call it whatever you want because Rails will eager load anything in `app`.
2. You could move this file into `lib` if you don't want it part of the `app` directory.
3. Rails is going to look to load a `SearchTags` class based on the way it eager loads. It only throws an error if you attempt to reference `SearchTags`. But a simple solution is to define a class (`class SearchTags; end`) if you don't like the error you're seeing.
4. If you directory in `app` is not eager loaded, you may have to manually stop Spring (`bin/spring stop`).

## Step 03: Search!

Now you can search as simply as:

```ruby
@tags = ActsAsTaggableOn::Tag.search('YOUR_SEARCH_TERM')
```

Simple enough, right?

## Step 04: Add Context

ActsAsTaggableOn supports contexts, which means you can group tags together
into a certain type.

All I did to find the context, was access the `Tagging` model and then limit my
query to only those that fit the context. So, the above query looks like this:

```ruby
tag_ids = ActsAsTaggableOn::Tagging.where(:context => 'YOUR_CONTEXT').collect(&:tag_id).uniq
@tags = ActsAsTaggableOn::Tag.where(:id => tag_ids).search('YOUR_SEARCH_TERM')
```

The first query grabs all eligible tags and then we filter in the next query.

The reason I didn't do something like `ActsAsTaggableOn::Tagging.where(:context => 'YOUR_CONTEXT').collect(&:tag).uniq` to grab the tags directly is because
that would lead to an N+1 problem and perform way too many queries, when we
really only need to run two.

That's all. Now go search!

---

One other note is that you _could_ be a little more clever here if you really
wanted. You could build a service object and instead of writing lengthy queries
each time, abstract the logic so all you'd have to do is something like
`SearchTags.call('CONTEXT', 'TERM')`.

I would take that approach if searching logic was going to be placed throughout
your app. I was only adding to one portion of my app so there was no need to
spend the time abstracting.
