---
title: A has_many Relationship within a Single Model in Rails
tags:
  - ruby-on-rails
description: Here are a couple methods for dealing with uni-directional
  many-to-many  associations in Rails.
image: /posts/default/default-pink-02.png
---

You're probably already familiar with Rails' [`has_many` association](http://guides.rubyonrails.org/association_basics.html#the-has-many-association), but what you want is a little different. You want to say that an object has many objects of its same class. In other words, what you're defining is a parent/child relationship within a model.

There are several approaches we could take, but it all comes down to what you're trying to accomplish. Let's take a look at two common scenarios and see if we can't create a solution.

## The Simple Method: A Gem

What I've found to be the most common scenario is just needing to define the relationship. For example, you have a `Page` model and you need it to be hierarchical. This is a common scenario when building websites.

I could show you how to do this from scratch, but there's a gem, [Ancestry](https://github.com/stefankroes/ancestry), that works so well that you should try to use it before spinning your own.

Installation is simple. You add the gem to your model.

`Gemfile` {.filename}

```ruby
gem 'ancestry'
```

Then you need to run a migration for any model on which you're going to use Ancestry. In sticking with the example, let's say we're only going to use it on a page model:

    $ bundle exec rails g migration add_ancestry_to_pages ancestry:string

And then, before you run the migration, you want to add the following to the migration file.

```ruby
def up
  add_index :pages, :ancestry
end

def down
  remove_index :pages, :ancestry
end
```

_Again, remember to change **pages** to the table name of the model(s) you're using._

Next, add `has_ancestry` to the model.

`app/models/page.rb` {.filename}

```ruby
class Page < ActiveRecord::Base
  has_ancestry
end
```

And when you build a form, you use the virtual attribute, `parent_id`, to apply a parent to an object (in this case, a `Page`).

Here's a very simple example _using the [SimpleForm](https://github.com/plataformatec/simple_form) gem._ (If you don't use simple form, just use )

`app/views/pages/_form.html.erb` {.filename}

```erb
<%= simple_form_for @page do |f| %>
  <%= f.input :parent_id, :collection => Page.all %>
<% end %>
```

### Problems with Ancestry

Ancestry is great. It has many built-in methods for making a model into a hierarchical entity. The biggest issue I have with it is in the way it loads its records. Because it stores the relationship data in a comma-separated string column, it can't eager load associations. It can be difficult to avoid an n+1 problem (where the more records you have, the more queries you run).

The solution below addresses that problem.

## The DIY Method: A Join Model

Time to get a little more complex. There are two cases that I see warranting this solution:

1. You couldn't solve your n+1 issues with Ancestry.
2. You need to capture data on the association.

We haven't talked about #2 yet. I've found that most of the time when I need a relationship within a table, I just need the relationship itself. But that may not always be the case. Sometimes you may need to capture data on the association itself. In this case, we need a JOIN model.

Let's continue with our example and say we have a `Page` model and want a page to be able to make many page babies. First, create your JOIN model. You can call it whatever you want, but I'm going to use `PageDescendant`.

    $ bundle exec rails g model PageDescendant parent_id:integer child_id:integer
    $ bundle exec rake db:migrate

Now we have a new model (`PageDescendant`) and a new database table (`page_descendants`).

The first thing you should notice is that, unlike a typical `belongs_to` relationship, we aren't calling our foreign key `page_id`, but instead we're using `parent_id` and `child_id`. This is simply because they are both pages, so we want to be a little more semantic about it.

Next, define the `belongs_to` relationships for the parent and child in the `PageDescendant` model.

[file:app/models/page_descendants.rb]

```ruby
class PageDescendant < ActiveRecord::Base
  belongs_to :parent, :class_name => 'Page'
  belongs_to :child, :class_name => 'Page'
end
```

Now, we need to be able to get from a parent page to a child. First, we define the ability to get from a parent to the join table.

[file:app/models/page.rb]

```ruby
class Page < ActiveRecord::Base
  has_many :page_descendants, :foreign_key => :parent_id
end
```

Notice this is also where we define the `foreign_key`, so Rails knows the object accessing the join table is the `parent_id`. Otherwise, it will look for a column called `page_id` (which doesn't exist).

To get back to the page model, we have to go through `page_descendants`, like so:

```ruby
class Page < ActiveRecord::Base
  has_many :page_descendants, :foreign_key => :parent_id
  has_many :children, :through => :page_descendants, :source => :child
end
```

And here the `:source => :child` option tells Rails to look for a `child_id` column instead of a `page_id` column. And it is the `:class_name => 'Page'` option on the `PageDescendant` model that tells Rails to go back to the `Page` model for the associated object.

Once this is in place, you'll have the `children` method available to you.

```ruby
page = Page.first
# => Page Load (0.4ms)  SELECT  `pages`.* FROM `pages`   ORDER BY `pages`.`id` ASC LIMIT 1

page.children
# => Page Load (0.4ms)  SELECT  `pages`.* FROM `pages` ORDER BY `pages`.`id` ASC LIMIT 1
# => Page Load (0.4ms)  SELECT `pages`.* FROM `pages` INNER JOIN `page_descendants` ON `pages`.`id` = `page_descendants`.`child_id` WHERE `page_descendants`.`parent_id` = 1
```

## Which Way is Better?

To simply make a model hierarchical within itself, go with the Ancestry gem. It's easy. I've found that it performs pretty well and fits cleanly into your model.

If you run into issues with eager loading, you might try the method with a JOIN model to ensure you aren't running into performance issues. Or, _if you need to add data to each relationship_, you'll want the DIY (JOIN) approach.

---

**References:**

- [Ancestry](https://github.com/stefankroes/ancestry)
- [The has_many Association](http://guides.rubyonrails.org/association_basics.html#the-has-many-association)
