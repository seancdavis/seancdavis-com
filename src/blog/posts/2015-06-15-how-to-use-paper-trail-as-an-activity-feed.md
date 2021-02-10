---
title: How To Use Paper Trail As An Activity Feed
description: "That whole killing two birds with one stone approach might just work in using PaperTrail as an activity log, at least in simpler projects."
tags:
  - ruby-on-rails
---

If you're here, I assume you already know about [the PaperTrail gem](https://github.com/airblade/paper_trail). If not, check it out, it's a powerful way to track changes on records within a model.

PaperTrail does one thing (track changes on a model), and it does that well. It's good for seeing how a record changes over time, and it's even better for rolling back unwanted changes to a particular record.

_There's [a good Railscast](http://railscasts.com/episodes/255-undo-with-paper-trail) on how you can use PaperTrail to undo changes you've made to a particular model._

Because PaperTrail is tracking changes on a model, you might think (as I did), _Maybe I can use it as an activity log_. Now, granted, an activity log is not that difficult to create from scratch, but if PaperTrail is already saving versions of a model, why not use those as a sort-of app activity history?

## The Catch

Before we dive further into it, let me explain the overall _gotcha!_ PaperTrail is what a good tool or application is -- _opinionated_. It maintains its focus, and it does the one thing it was meant to do very well. As a result, to use as it is not (necessarily) intended means we have to be creative.

## Accessing Versions

When you install PaperTrail, you get a (namespaced) `Version` model table. This is what PaperTrail accesses for version control, and if you use it as it was intended, you're typically using methods on your models to access these versions.

But since it is still a rails model, we can get there directly. Here's how we would get all versions:

```ruby
PaperTrail::Version.all
```

## Scoping

You can imagine how that will get really messy, really fast. So, first, let's limit our results.

```ruby
PaperTrail::Version.all.limit(20)
```

What might be even better than _limiting_ is to _paginate_. I like using [Kaminari](https://github.com/amatsuda/kaminari) for that task.

Now we have only 20 versions, but we're not specifying the method by which we're _ordering_ our query. Naturally, we'd want the most recent first.

```ruby
PaperTrail::Version.order(:created_at => :desc).limit(20)
```

## Displaying Results

We now have the most recent 20 versions of any model created within our application. The `Version` object has three useful attributes we're going to take advantage of:

- `whodunnit`: The `id` of the user who made the change
- `item`: The item (object/record) that was changed
- `event`: Overal, _how_ the object was changed

Note that `whodunnit` is just a reference, not an actual _association_. This means you have to go find the user. In this case, we're going to assume a `User` model.

Furthermore, because we're displaying this through our UI, we want to ensure we actually have a whodunnit. So, first, maybe we change our query to this:

```ruby
@versions = PaperTrail::Version.where('whodunnit IS NOT ?', nil)
  .order(:created_at => :desc).limit(20)
```

Our listing view probably just calls the magic `render` method:

```erb
<%= render @versions %>
```

This will render a version partial view for each version in the collection. That will go in `app/views/paper_trail/versions`.

`app/views/paper_trail/versions/_version.html.erb` {.filename}

```erb
<% user = User.find_by_id(version.whodunnit) %>
<% unless user.nil? %>
  <div class="version">
    <%= user.name %> <%= version.event %>d <%= version.item_type.downcase %> <%= time_ago_in_words(version.created_at) %> ago.
  </div>
<% end %>
```

This is a very simple use case. Let's look at each item and our assumptions.

- `unless user.nil?`: We're checking to ensure the user exists before we render anything.
- `user.name`: We assume a `name` method on the `User` object. You may need to use a different method depending on your model.
- `version.event`: How the object was changed. The trailing `d` is because the event is stored in present tense (there are more foolproof ways of achieving past tense, like [the verbs gem](https://github.com/rossmeissl/verbs).
- `version.item_type.downcase`: Using [inflectors](http://api.rubyonrails.org/classes/ActiveSupport/Inflector) to turn something like `Post` into `post`. _This does not account for camel cased model names. I'll leave that up to you_.
- `time_ago_in_words(version.created_at)`: A nice rails helper for turning a date into something you can write in a sentence.

## Finding Routes

Arguably, this isn't really useful unless you can jump to the object itself, right? This is where using PaperTrail for an activity log can become dicey.

**If your routes aren't nested** and **if your routes are named for their model**, then you can use interpolation and the `send` method to create dynamic route names. Using the view example above, your link _to the item_ may look like this:

```erb
<%= link_to version.item.title, send("#{version.item_type.tableize}_path", version.item) %>
```

If the `version` were, say, a `Post` object, this would be the equivalent as:

```erb
<%= link_to version.item.title, post_path(version.item) %>
```

## Solving for Eager Loading

If you're following along, you may have noticed how many database queries are being run. This describes an _n+1_ problem. This means _the more items you have, the more queries you run_. That's because every time you render a version using this method, you run `version.item` and `User.find_...`, which adds two queries. The Rails solution to this is called [eager loading](http://guides.rubyonrails.org/active_record_querying.html#eager-loading-associations), and it means that we look to find all the records we need before we called them. That way we can access associations through memory and not by hitting the database again.

### Item

To eager load the item, just add the `includes` method on your query, like so:

```ruby
@versions = PaperTrail::Version.where('whodunnit IS NOT ?', nil)
  .order(:created_at => :desc).limit(20).includes(:item)
```

Try it again. You'll see how you (should) only hit the database once for every associated item.

### User

Users are trickier. This is because `whodunnit` isn't actually an association. I still like to grab all the version users right away. Right after I query the versions, I might run this:

```ruby
user_ids = @versions.collect(&:whodunnit).reject(&:blank?).map(&:to_i).uniq
@version_users = User.where(:id => user_ids)
```

The `user_ids` line collects all the `whodunnit`s from the `@versions` collection and gives us a unique array of integers that we can use to query the `User` model.

Now, instead of finding a user like this:

```erb
<% user = User.find_by_id(version.whodunnit) %>
```

We can do this:

```erb
<% user = @version_users.find { |u| u.id == version.whodunnit.to_i } %>
```

It might look more complicated, but the point is that we're accessing the `@version_users` array, which is stored in memory, instead of hitting the database again.

## When This Fails

This isn't a perfect activity log solution, and I've already run into several problems with it. Let's look at a few cases you may run into in more complex applications.

### Nested Routes

If your routes are nested, meaning _if you are tracking versions of multiple models and they are nested at different levels_, then you will need `if` statements or `case` switches to render routes appropriately. That's usually easy enough, but it can get messy.

### Scoping From An Object

I had to abandon this approach in one application in which I needed to scope the `Version` query within the context of another object. That's fine if you're limiting yourself to a specific `item_type`. So, if you only wanted _posts_ and _pages_, you'd run:

```ruby
@versions = PaperTrail::Version.where(:item_type => ['Post', 'Page'])
  .where('whodunnit IS NOT ?', nil).order(:created_at => :desc)
  .limit(20).includes(:item)
```

But let's say _a page can have many posts_. And let's say when we're on a page, we want to see the history of the posts for that page. This creates two problems.

First, you can't get to the `item` within the query. So you can't say _give me all the `version.item` objects that are posts related to this page_. In this case, you'd have to grab a heck of a lot more versions that you need and hope that you have the number you want. It will be an inefficient query in most cases.

And second, if you are grabbing more than one model and those models have different associations, you can't eager load them properly, and you'll run into another `n+1` problem. And there really isn't a good, efficient, solution to this (at least not one I've thought of).

## Alternatives

Well, my alternative is always to build my own solution, but there is a gem with some following around it called [PublicActivity](https://github.com/pokonski/public_activity). And there's [a Railscast](http://railscasts.com/episodes/406-public-activity) on that, too.

---

**References:**

- [#255 Undo With PaperTrail](http://railscasts.com/episodes/255-undo-with-paper-trail)
- [Eager Loading Associations](http://guides.rubyonrails.org/active_record_querying.html#eager-loading-associations)
- [Kaminari](https://github.com/amatsuda/kaminari)
- [PaperTrail](https://github.com/airblade/paper_trail)
