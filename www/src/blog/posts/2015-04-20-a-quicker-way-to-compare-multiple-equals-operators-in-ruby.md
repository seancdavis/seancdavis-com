---
title: A Quicker Way to Compare Multiple Equals Operators in Ruby
tags:
  - ruby
description: When you attempt to write several predictable comparisons in one
  statement, it gets ugly fast. Here are some methods for cleaning it up.
image: /blog/default/default-orange-03.png
---

You know the typical `if`/`else` statement in Ruby, right?

```ruby
if this_thing == 'cheese'
  puts 'This is cheese.'
else
  puts 'This is not cheese.'
end
```

Now, let's say you want to see if `this_thing` is "cheese" or "magical beans." Logic tells you to write something like this:

```ruby
if this_thing == 'cheese' || this_thing == 'magical beans'
  puts 'This is either cheese or magical beans.'
else
  puts 'This is not cheese or magical beans.'
end
```

Oh, but now you need to see if you also have a meat grinder.

```ruby
if this_thing == 'cheese' || this_thing == 'magical beans' || this_thing == 'meat grinder'
  puts 'This is either cheese or magical beans or a meat grinder.'
else
  puts 'This is not cheese or magical beans or a meat grinder.'
end
```

It gets out of hand real fast.

## Solving with Regex

One solution is to write regex comparisons to the original variable, or something like this:

```ruby
if this_thing =~ /^(cheese|magical\ beans|meat\ grinder)$/
  puts 'This is either cheese or magical beans or a meat grinder.'
else
  puts 'This is not cheese or magical beans or a meat grinder.'
end
```

That should work fine, but I don't love it when you're comparing something straightforward, like and integer or a predictable string. It works better when you're looking for part of a string or some variation in the string.

## Using an Array

Instead, why not just turn the expected values into an array and then see if `this_thing` is in there?

```ruby
if ['cheese', 'magical beans', 'meat grinder'].include?(this_thing)
  puts 'This is either cheese or magical beans or a meat grinder.'
else
  puts 'This is not cheese or magical beans or a meat grinder.'
end
```

### Predefining the Array

And if your array gets out of hand, you can always define it elsewhere.

```ruby
weird_kitchen_things = [
  'cheese',
  'magical beans',
  'meat grinder',
  'draino'
]

if weird_kitchen_things.include?(this_thing)
  puts "This is either #{weird_kitchen_things.join(' or ')}."
else
  puts "This is not #{weird_kitchen_things.join(' or ')}."
end
```

Notice here how we also clean up the output so we don't have to change the return every time we add a value to our array.
