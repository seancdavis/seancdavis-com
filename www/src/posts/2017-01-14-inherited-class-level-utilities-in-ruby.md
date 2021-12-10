---
title: Inherited Class-Level Utilities in Ruby
description: The difference between Ruby's class and class instance variables,
  and how you can use them to abstract functionality from inherited classes.
tags:
  - ruby
image: /posts/default/default-green-02.png
---

## The Problem

My problem, in its generic form, was this: _I wanted to build a utility class from which inherited classes could use to set options at the class-level._

Let's setup an example. Suppose my utility class is called `Utility`. And suppose any class that inherits from utility should be able to specify required options. In other words, this is an example of an inherited class I'd like to see:

```ruby
class MyClass < Utility
  required_option :foo
  required_option :bar
end
```

And I would instantiate it like so:

```ruby
a = MyClass.new(:foo => 'foo', :bar => 'bar')
```

And if I missed one of the arguments, I'd see a `ArgumentError`, for example:

```ruby
a = MyClass.new(:foo => 'foo') # => ArgumentError: Missing required option 'foo'
```

## The Approach

My approach was to write class methods on the utility class that stored an array of required options, created an `attr_accessor` for each (so we had [getter and setter methods](https://blog.metova.com/a-beginners-guide-to-ruby-getters-and-setters/) for each), then iterated through those options when creating a new instance, and throwing an error if we were missing one.

### Attempt 01: Class Variables

My first attempt was to use class variables. The utility looked something like this:

```ruby
class Utility
  # Initialize the required_options class variable.
  @@required_options = []

  def initialize(options = {})
    # Iterate through the required options array ...
    @@required_options.each do |name|
      # If the options Hash is missing a key in our required options array,
      # we throw an error.
      if options[name].nil?
        raise ArgumentError.new("Missing required option '#{name}'")
      end
      # Otherwise, we set the value. This is available because of the
      # attr_accessor call below. This provides us direct access to the option.
      send("#{name}=", options[name])
    end
  end

  # This allows us to write `required_option` on inherited classes.
  def self.required_option(name)
    # Add the option to the require options array.
    @@required_options << name.to_sym
    # Set the option as an attr_accessor, which adds getter and setter methods.
    attr_accessor name.to_sym
  end
end
```

This is hopefully pretty straightforward. The utility has a class variable, `@@required_options`, which stores an array of required options. Then we have the class method `required_option` that will add an option to the array and also create an `attr_accessor`. And upon initializing the class, we check for any missing options and throw an error if we find one.

Let's add our class that inherits from this:

```ruby
class MyClass < Utility
  required_option :foo
  required_option :bar
end
```

And now let's see what we get:

```ruby
a = MyClass.new(:foo => 'foo', :bar => 'bar')
# => #<MyClass:0x007fc57999b6f0 @foo="foo", @bar="bar">

a = MyClass.new(:foo => 'foo')
# ArgumentError: Missing required option 'bar'
```

Perfect! It works.

Well, sort of. There's a problem. Let's introduce another inherited class with a different required option.

```ruby
class MyOtherClass < Utility
  required_option :baz
end

b = MyOtherClass.new(:baz => 'baz')
# ArgumentError: Missing required option 'foo'
```

WTF? Missing option `foo`? But we didn't define `foo` on the `MyOtherClass` class. So what's going on?

Well, after lots of reading, namely [here](http://thoughts.codegram.com/understanding-class-instance-variables-in-ruby/) and [here](http://www.railstips.org/blog/archives/2006/11/18/class-and-instance-variables-in-ruby/), I came to discover that there is a bit of odd behavior with Ruby's class variables: they are bound to the class in which they are written.

In other words, when we change `@@required_options`, we're changing it across the board. If we checked it now, this is what would happen:

```ruby
Utility.class_variable_get(:@@required_options)
# => [:foo, :bar, :baz]
```

We see it's not scoped within the inherited class, but the class in which it was defined.

(I highly recommend reading those two articles, as there is some interesting and useful learnings within them that will help you in other scenarios.) But alas, I wasn't solving the problem those articles were solving, so I needed a new way.

### Attempt 02: Class Instance Variables with Setter

After many rounds of tinkering around, I eventually moved to trying class instance variables. This was where I landed:

```ruby
class Utility
  def initialize(options = {})
    # We're now getting to the variable through the class method.
    self.class.required_options.each do |name|
      if options[name].nil?
        raise ArgumentError.new("Missing required option '#{name}'")
      end
      send("#{name}=", options[name])
    end
  end

  def self.required_options
    @required_options ||= []
  end

  def self.required_option(name)
    required_options << name.to_sym
    attr_accessor name.to_sym
  end
end
```

Let's run through the other examples:

```ruby
class MyClass < Utility
  required_option :foo
  required_option :bar
end

a = MyClass.new(:foo => 'foo', :bar => 'bar')
# => #<MyClass:0x007fc57999b6f0 @foo="foo", @bar="bar">

a = MyClass.new(:foo => 'foo')
# ArgumentError: Missing required option 'bar'

class MyOtherClass < Utility
  required_option :baz
end

b = MyOtherClass.new(:baz => 'baz')
# => #<MyOtherClass:0x007fc6c41318d8 @baz="baz">

b = MyOtherClass.new
# ArgumentError: Missing required option 'baz'
```

That's it! By introducing class instance variables, we are able to control the scope of the variable to the subclass' inheritance.

---

This approach can be super useful. You can use this to add utilities to a more generic class that will make your inherited classes much, much cleaner. It's a great way to abstract repetitious code among several classes.
