---
title: Round to the nearest 0.5 in Ruby
tags:
  - ruby
description: A cool and quick trick to round floats to the nearest 0.5 in Ruby.
image: /posts/default/default-green-03.png
---

To round a number to the nearest 0.5 in most programming languages, you multiply the number by 2, round it, then divide the result by 2.

In Ruby, this looks like this:

```ruby
(x * 2.0).round / 2.0
```

If you are going to use it a lot, you can add it to the `Float` class:

```ruby
class Float

  def round_to_half
    (self * 2.0).round / 2.0
  end

end
```

Then, you can simply use:

```ruby
3.74.round_to_half
# => 3.5
```

Just make sure you use a `float` and not an integer, as that method won't be available in another class (unless you make it available). For example:

```ruby
2.round_to_half
# => undefined method `round_to_half' for 2:Fixnum
```
