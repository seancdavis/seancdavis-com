---
title: Why I Don't Use has_and_belongs_to_many in Rails
tags:
  - ruby-on-rails
description: The magic of Rails makes it easy to create simple many-to-many
  relationships, but I almost never use it, and here's why.
image: /blog/default/default-lime-03.png
---

Rails has [two built-in methods](http://guides.rubyonrails.org/association_basics.html#choosing-between-has-many-through-and-has-and-belongs-to-many) for dealing with many-to-many relationships: `has_many :through` (HMT) and `has_and_belongs_to_many` (HABTM).

## The Difference Between HMT and HABTM

Aside from the actual code you write, the main difference between the two approaches is that in a `has_many :through` relationship, the `JOIN` table has its own model, while a `has_and_belongs_to_many` relationship has no `JOIN` model, just a database table.

## What Rails Guide Recommends

The Rails guide I shared above says:

> The simplest rule of thumb is that you should set up a `has_many :through` relationship if you need to work with the relationship model as an independent entity. If you don't need to do anything with the relationship model, it may be simpler to set up a `has_and_belongs_to_many` relationship (though you'll need to remember to create the joining table in the database).

I don't disagree with this rule, but I still don't tend to use HABTM relationships. I'll explain by focusing on two key points within this rule.

## An Independent Entity

Let's look at this idea:

> ... if you need to work with the relationship model as an independent entity.

This can be taken to mean, _If you need to write methods for the model_. If you need to mess with the _joined data_ at all, then you need a model, and you need a HMT relationship.

Another way to look at it is to consider **if the association itself needs unique data,** then you'll need a separate model because you need a way to assign those attributes.

For example, let's say you have a `Recipe` model and an `Ingredient` model. The association between the two would likely need a `quantity` attribute. Therefore, you'll need a model so you can work with that quantity field.

On the other hand, perhaps you have a `Post` model and an `Image` model, and all you need to know is which images should be related to which posts, and nothing specific about the relationship between the two. In that case, a HABTM relationship would do.

But, I still wouldn't create a HABTM relationship. The bulk of my reasoning has to do with simply not knowing. _Can you really be certain you aren't going to need to work with the joined data?_

Even in the posts/images example, it might _seem_ like simple when you create it, but what about down the road? Can you guarantee you want need data on that association? Crop data? If it's featured? Order/position for display? The version name?

Although I tend to like the approach that _you shouldn't solve problems you don't have_, this feels different. Rarely do I have a simple HABTM relationship that lasts through the project.

## The Join Table

Also consider the following, from the original Rails Guide excerpt above:

> ... you'll need to remember to create the joining table in the database

And I really think that's the kicker. You still have to create the join table. And that means you have to know the naming convention for that table.

By the time you've rediscovered the naming convention, run the migration generator and added the fields, you've likely spent the same amount of time as you would have if you just created a model instead.

And what's the harm in having a couple extra files?

## TL;DR

To sum it all up, while I don't like creating assumptions and solving problems that don't exist, this is one case where:

- making the assumption doesn't lead to (much) extra work, and
- the assumption tends to be true over the life of a project (based on my personal experience and no real data to back it up)

While HABTM relationships do leave you with fewer files and cleaner code, it's not a big enough benefit to me to offset the distaste for undoing a HABTM when its relationship inevitably requires more data.

---

**References:**

- [Choosing Between has_many :through and has_and_belongs_to_many](http://guides.rubyonrails.org/association_basics.html#choosing-between-has-many-through-and-has-and-belongs-to-many)
