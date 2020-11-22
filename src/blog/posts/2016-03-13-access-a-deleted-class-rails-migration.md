---
title: Access A Deleted Class In A Rails Migration
description: "Sometimes you need to get to a class that you have deleted or renamed within a migration file. Here's how you do it."
tags:
  - ruby_on_rails
---

There are times when you need to get to a class to be able to run a migration, but that class doesn't exist anymore.

This has happened to me a few times. Most recently, I was working on a project using [single table inheritance](http://api.rubyonrails.org/classes/ActiveRecord/Inheritance.html). I had to rename one of the subclasses. But I also needed to make sure the data that already existed in production migrated effectively. In other words, I wanted that class for just a second -- to run a quick query and then be done.

_Note: There are other ways to get around my specific STI case -- I'm using it as a demonstration._

## 01: The Ugly Way

In the past, I had left the class around until I could run the migration in production. And then I'd remove it for the following release.

I've never liked this approach.

## 02: The Quicker Way

Instead, there's a nice and easy way to get around this. You can define the class within the migration, like so:

```ruby
class TheNameOfMyMigration < ActiveRecord::Migration

  class MyDeletedClass < ActiveRecord::Base
  end

  def change
    # migration code here
  end

end
```

Now, if you need to get to some of the methods that class had used in the migration code, then you'll either need to use Method 01 above, or you'll want to include that code in the redefined class within the migration. (Or you'll need to be a little more clever if you don't want to redefine the class.)
