---
title: Order Rails Query by Virtual Attribute
tags:
  - ruby-on-rails
description: Rails' scopes don't work well with virtual attributes since they resolve to a SQL query. Instead you can throw them in an array and then sort by a virtual attribute.
---

Have you tried and failed to order a rails query by a virtual attribute, being told the column isn't in the database (when, in fact, you already _knew_ that)?

Let's say you have a `User` model that has a `name` attribute that you've split up on the fly. Something like this.

```ruby
class User < ActiveRecord::Base

  def first_name
    return email if name.nil?
    name.split(' ').first
  end

  def last_name
    return email if name.nil?
    name.split(' ').last
  end

end
```

You've probably tried and failed with a scope like this.

```ruby
scope :by_name, -> { order('last_name asc') }
```

What you have to do is first load the objects you want into memory and then use Ruby's [`sort_by`](http://apidock.com/ruby/Enumerable/sort_by) array method to sort the collection of objects. So, something like this would work.

```ruby
scope :by_name, -> { all.to_a.sort_by(&:last_name) }
```
