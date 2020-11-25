---
title: Add a "reload!" Method to your Ruby Console
description: "Once you are running a console in your ruby project, it's nice to not have to restart the console session every time you make a change."
tags:
  - ruby
---

I wrote another article on [creating a console session for your ruby project](/blog/add-console-to-ruby-project/). That is a powerful method for working with your (non-Rails/) Ruby project on the fly. The problem with that approach is that you have to restart the console every time you make a change because the console has stored the state of your codebase when it started.

In the Rails console, there is a `reload!` method that is meant to reload your application code in the current console session. It's a fairly complex process for Rails, but when you have a much simpler project, all you have to do is reload all your files and you're good to go.

In the previous article, our console script looked like this:

`bin/console` {.filename}

```rb
#!/usr/bin/env ruby

require 'irb'
require_relative '../lib/calculator'

IRB.start
```

We can add a `reload!` method directly in this script that will reload every file within the lib directory.

`bin/console` {.filename}

```rb
#!/usr/bin/env ruby

require 'irb'
require_relative '../lib/calculator'

def reload!(print = true)
  puts 'Reloading ...' if print
  # Main project directory.
  root_dir = File.expand_path('..', __dir__)
  # Directories within the project that should be reloaded.
  reload_dirs = %w{lib}
  # Loop through and reload every file in all relevant project directories.
  reload_dirs.each do |dir|
    Dir.glob("#{root_dir}/#{dir}/**/*.rb").each { |f| load(f) }
  end
  # Return true when complete.
  true
end

IRB.start
```

Let's see if it works. Using the previous calculator example, let's open a new console session:

    $ bin/console

Then let's try to use our calculator class to multiple two numbers:

    irb(main):001:0> calc = Calculator.new
    => #<Calculator:0x00007fbdae8d4eb0>
    irb(main):002:0> calc.multiply(2, 3)
    Traceback (most recent call last):
            2: from ./bin/console:20:in `<main>'
            1: from (irb):2
    NoMethodError (undefined method `multiply' for #<Calculator:0x00007fbdae8d4eb0>)

It doesn't work because we don't have the `multiply` method written on the `Calculator` class. So let's do that **without closing the console session**.

`lib/calculator.rb` {.filename}

```rb
class Calculator

  # ...

  def multiply(n1, n2)
    n1 * n2
  end

end
```

And within the console session, run the `reload!` method:

    irb(main):003:0> reload!
    Reloading ...
    => true

And now try to multiply (note that you can do this without reinstantiating your `calc` variable):

    irb(main):004:0> calc.multiply(2, 3)
    => 6

It works!

Now you are free to continue building on your project without having to restart the console session each time you make a change.
