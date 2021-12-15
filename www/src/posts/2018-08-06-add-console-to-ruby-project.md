---
title: Add a Console to your Ruby Project
description: A powerful way to debug Rails applications is in using the Rails
  console. But even when you're not using Rails for your Ruby project, you can
  still have a console.
tags:
  - ruby
image: /posts/default/default-green-03.png
---

The [Rails console](https://guides.rubyonrails.org/command_line.html#rails-console) is a really powerful way to interact with your Rails applications via the command line. And when I started writing Ruby applications (without Rails) it was something I immediately missed dearly. But, as it turns out, those feelings I had were unfounded, as it's quite easy to add a console to your project.

Under the hood the Rails console uses [IRB](http://ruby-doc.org/stdlib-2.5.1/libdoc/irb/rdoc/IRB). You may remember IRB from your early days learning Ruby. IRB stands for _interactive Ruby_. All it does is provide a way for you to execute ruby expressions on the command line -- it provides a _shell_ in a ruby environment.

If you have Ruby installed on your machine, then you have IRB. And you can start IRB by running the `irb` command:

    $ irb

And then you can run ruby as you would within any ruby file, and the code is processed immediately.

    irb(main):001:0> def add(n1, n2)
    irb(main):002:1> n1 + n2
    irb(main):003:1> end
    => :add
    irb(main):004:0> add(1, 1)
    => 2
    irb(main):005:0> add(2, 3)
    => 5

All Rails console does is load an IRB instance that has access to your project's code. So, really, that's all we need to do to get IRB running in your Ruby project.

Let's take a really simple Ruby project. It'll have a single class -- `Calculator` -- that will add and subtract two numbers. And we will put that file in our `lib` directory within our project. Our class will look like this:

`lib/calculator.rb` {.filename}

```rb
class Calculator

  def add(n1, n2)
    n1 + n2
  end

  def subtract(n1, n2)
    n1 - n2
  end

end
```

Pretty simple, right? Good.

Now, from the command line within that project, let's open an IRB instance:

    $ irb

And within IRB, let's create a new calculator:

    irb(main):001:0> calc = Calculator.new
    Traceback (most recent call last):
            2: from /Users/seancdavis/.rbenv/versions/2.5.1/bin/irb:11:in `<main>'
            1: from (irb):1
    NameError (uninitialized constant Calculator)

Hmmm ... IRB doesn't know what `Calculator` is. Why not? When we open an IRB instance on our machine, it's thinking globally. We haven't provided any context in which to open the session. We can change that by loading our files first.

Let's create a [ruby command-line script](/posts/command-line-scripts-using-ruby/) to open a console session. We're going to put this file in the `bin` directory.

In its simplest form, this file will look like this:

`bin/console` {.filename}

```rb
#!/usr/bin/env ruby

require 'irb'

IRB.start
```

I like to make these files executable so we don't have to use the `ruby` command to run them:

    $ chmod +x bin/console

And then we can start our IRB session by running the new console script.

    $ bin/console

And we can try to instantiate a calculator instance again:

    irb(main):001:0> calc = Calculator.new
    Traceback (most recent call last):
            2: from bin/console:5:in `<main>'
            1: from (irb):1
    NameError (uninitialized constant Calculator)

Dang! Same issue.

What we're missing this time is loading the calculator class prior to opening the IRB session. We can do this using the `require` method. But we can't just use `require` because our ruby doesn't inherently know where the `Calculator` class is. Instead we can use `require_relative` and point relatively to that file, like so:

`bin/console` {.filename}

```rb
#!/usr/bin/env ruby

require 'irb'
require_relative '../lib/calculator'

IRB.start
```

Now, let's try that again:

    irb(main):001:0> calc = Calculator.new
    => #<Calculator:0x00007fb38d8bc520>
    irb(main):002:0> calc.add(1, 2)
    => 3
    irb(main):003:0> calc.subtract(2, 1)
    => 1

And look at that -- it works!

As your project gets larger, as long as you require your main file in your console script, you'll be able to open interactive sessions with access to all your code.

---

_**Bonus!** I have a [follow-up article](/posts/add-reload-method-to-ruby-console/) in which you can add a `reload!` method to your console so you don't have to restart the console session every time you make a change in your project._
