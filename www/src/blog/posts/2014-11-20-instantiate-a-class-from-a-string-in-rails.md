---
title: Instantiate a Class from a String in Rails
tags:
  - ruby-on-rails
description: Rails classes need to be called dynamically sometimes. Learn how to
  do it using the constantize inflector.
image: /blog/default/default-blue-03.png
---

Sometimes you want your class names to be dynamic. Rails has a nice [`constantize` inflector](http://apidock.com/rails/String/constantize) that makes this easy.

In the simplest of examples, let's just say you have a `"post"` string and you want to load the `Post` class from it. Something like the following should work great.

```ruby
str = "post"
new_class_instance = str.constantize.new
```

We can get a little wild. Let's say you have a multi-word string and want to constantize and then instantiate it.

```ruby
str = "posts controller"
new_class_instance = str.titleize.gsub(/\ /, '').constantize.new
```

Essentially, this just shows you want a properly-cased string (the string equivalent of the class name) before you call `constantize`.
