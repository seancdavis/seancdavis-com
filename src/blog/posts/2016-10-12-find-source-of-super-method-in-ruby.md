---
title: 'Find the Source of a Ruby Method''s "Super"'
description: 'It can be helpful when debugging to know what "super" is actually calling.'
tags:
  - ruby
---

I've spent part of the last couple days debugging the bowels of a pesky Rails project. The issue was the infamous _Stack Level Too Deep_ error.

I found the source of the problem was a gem's method calling `super`. And while the stack trace of an error will show you the pathway of an error, sometimes it can be helpful to manually find that pathway yourself during the debugging process.

It can be done in a quick one-liner using the name of the method:

```ruby
method(:method_name).super_method.to_s
```

Where `method_name` is the name of the method you want to check.

Here's a simplistic example to demonstrate:

```ruby
class A
  def foo
    'bar'
  end
end

class B < A
  def foo
    method(:foo).super_method.to_s
  end
end

a = A.new
a.foo # => bar

b = B.new
b.foo # => #<Method: A#foo>
```
