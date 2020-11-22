---
title: "Dynamic Attributes on Instances in Ruby"
description: "Although it's not usually the right choice, when you want to create individual attribute behavior on instances, Ruby has your back."
tags:
  - ruby
---

If you've been around Ruby at all, you know about its [getter and setter methods](http://qr.ae/TUTTE6), available through [the `attr_accessor` method](https://stackoverflow.com/a/4371458/2241124).

It's a handy feature that lets us easily get and set values quickly on one particular attribute. Take a class that has a `name` attribute, like so:

```ruby
class A
  attr_accessor :name
end
```

I can get and set the name easily:

```ruby
a = A.new
a.name # the getter
# => nil

a.name = 'Floyd, III' # the setter
# => 'Floyd, III'

a.name # the getter, once again
# => 'Floyd, III'
```

But what if we have an instance where not just our values, but our _attributes_ will differ from instance to instance?

In almost every case I'd say, "You need a new class." If the attributes are different, then the instances should be treated differently (i.e. [Duck Typing](https://en.wikipedia.org/wiki/Duck_typing)).

But _when_ you find that instance where the purpose of your class is to be fluid, we can create individual `attr_accessor` behaviors on each instance. We do so by implementing [`define_singleton_method`].

In this example, our class receives a hash of attributes on instantiation. It then loops through those attributes and creates singleton getter and setter methods on the instance.

```ruby
class Item
  def initialize(attributes = {})
    attributes.each do |attr, value|
      # Setter
      define_singleton_method("#{attr}=") { |val| attributes[attr] = val }
      # Getter
      define_singleton_method(attr) { attributes[attr] }
    end
  end
end
```

With this approach, any attribute passed to the class on instantiation will get its own getter and setter methods. Given the above, here's what we'd get:

```ruby
a = Item.new(name: 'A')
a.name
# => 'A'

a.name = 'B'
# => 'B'

a.name
# => 'B'
```

Here we see if we create an object with `name` in the attributes hash, then we have getter and setter methods on `name`. But now, what if we create a new instance, `b`, with an `age` attribute but no `name`?

```ruby
b = Item.new(age: 22)
b.age
# => 22

b.age = 23
# => 23

b.age
# => 23

b.name
# => undefined method `name' for #<Item: ...>
```

And that's perhaps the biggest issue with this approach and why you should avoid it without good reason—that attempting to access an attribute you didn't set will cause an error. Of course, it's Ruby, so you could protect yourself against that if necessary.

Notice that there are major limitations of this example class. This was merely to demonstrate one particular way of creating singleton `attr_accessor` behavior.

And again, I would encourage you to seriously consider if this approach is a good design for your program. 99.9% of the time the answer is going to be no (it's not a good idea). But Ruby's got your back when that 0.1% chance turns up.
