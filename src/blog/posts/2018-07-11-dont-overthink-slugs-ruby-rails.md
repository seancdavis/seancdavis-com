---
title: "Don't Overthink Slugs in Ruby/Rails"
description: "It can take some tricky logic to transform unpredictable characters into a URL-friendly string. But with Rails, you don't need to worry about."
tags:
  - ruby
  - ruby on rails
---

I've spent far too much time over the years figuring out how to turn strings into friendly URLs, (often referred to as [_slugs_](<https://en.wikipedia.org/wiki/Slug_(publishing)>)). In my early days as a programmer, I wrote methods directly in models to transform titles after save. Later, I learned about [concerns](http://api.rubyonrails.org/v5.2/classes/ActiveSupport/Concern.html) and started writing better, shared code. Then I learned how to write my own gem, and ended up [contributing heavily to a gem](https://github.com/hungrymedia/superslug) that generate slugs via a super simple DSL.

And it sounds super simple to take any string and turn it into a lower-cased version of itself, replacing unwanted characters with a hyphen (or underscore) and moving on. But what about non-ASCII characters? What if there are multiple unwanted characters next to one another? What if the string begins or ends with an unwanted character? What if ... the list goes on.

So I ended up with some series of regular expressions and eventually figure out how to make this thing work pretty solidly. But with this solution I have to install the gem in every Rails project. Plus there's the task of keeping the gem up to date -- making sure it's going to work when a new version of Rails is released, supporting issues that arise from other users, etc.

A bit later, on one magical morning, everything changed when I discovered [ActiveSupport's `parameterize` inflector](http://api.rubyonrails.org/classes/ActiveSupport/Inflector.html#method-i-parameterize).

With the `parameterize` method on a string object, if I want to parameterize (or sluggify, or friendly-ize, or whatever), all I have to do is this:

```rb
str = "Some Unpredictable String"
str.parameterize
# => some-unpredictable-string
```

Boom! Done. Now I never have to include that silly gem or that messy code in any project (and neither do you!).

And there's no extra gem necessary with a Rails project because ActiveSupport is required by Rails (it's actually [in the same repository](https://github.com/rails/rails/tree/master/activesupport)).

You'll find that ActiveSupport is required by many gems out there and will likely be a part of your Ruby project even if your project doesn't rely on Rails. But, if by chance, your Ruby project doesn't require ActiveSupport it's as easy as adding it to the Gemfile:

`Gemfile` {.filename}

```rb
gem 'activesupport'
```

And requiring the string inflectors where necessary:

```rb
require 'active_support/core_ext/string/inflections'
```

ActiveSupport is a super powerful component that comes with Rails and I use it on its own (without Rails) frequently. It's definitely worth [digging into the documentation](http://guides.rubyonrails.org/active_support_core_extensions.html) to discover more ways in which [the ActiveSupport library](https://github.com/rails/rails/tree/master/activesupport) can reduce the number of utility classes you port over from project to project. Chances are, if it's a utility you're repeating all the time ActiveSupport can help you.

---

_One last thing to note:_ The `superslug` gem I mentioned above has an extra component that accounts for duplicates within the same ActiveRecord model and adjusts the slugs to make them unique should they conflict with another record. While the `parameterize` method does a lot of the heavy lifting, you'll likely still want to explore [validating for uniqueness](http://guides.rubyonrails.org/active_record_validations.html#uniqueness) or perhaps (as I've done in the past) appending the record's `id` to the slug should it conflict with another record.
