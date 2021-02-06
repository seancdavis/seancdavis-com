---
title: "3 Methods for Logging Output During Ruby Processes"
description: "Logging output during ruby processes is hugely beneficial for gaining insight into running code."
tags:
  - ruby
---

Ruby is a really fun language to write and, as a result, I prefer to write my heavy-lifting tasks in Ruby. This could be migrating content from one system to another, parsing and processing a set of files, analyzing data, etc. There are [several approaches to writing scripts in ruby](/blog/four-ways-to-write-run-ruby-script/), be it a rake task, a command-line script, or even a little Ruby library.

When when working with long-running processes (whether you wrote them or not), it's [a good idea to provide yourself with feedback](/blog/log-output-long-running-processes/).

## The Methods

When I'm working with a simple task and have to write a small amount of procedural ruby, I usually just use `puts` to print some infor to the console. Something like this:

```rb
puts 'Exporting data ...'
# do the export work
puts 'Done.'
```

One issue with `puts` is that it prints the message on a new line. So, instead of `puts`, you could [use `print` and control your newlines](https://stackoverflow.com/q/5080644/2241124):

```rb
print 'Exporting data ... '
# do the export work
print "Done.\n"
```

Or you can work directly with [Ruby's IO class](https://ruby-doc.org/core-2.5.0/IO). In this case you have an object as either `$stdout` or `STDOUT` from which you can write to [standard output](https://en.wikipedia.org/wiki/Standard_streams). Your code from above may look more like this:

```rb
$stdout.write('Exporting data ... ')
# do the export work
$stdout.write("Done.\n")
```

Use your preference for any one of these approaches. With the exception of the newline in `puts` I have yet to run into any major issues with any of these approaches. It's mostly personal preference.

## Adding Color

And with any of these approaches you can colorize the output. There are a handful of colors to use, you just need to find a reference ([like this](https://gist.github.com/chrisopedia/8754917)) to a list of [ANSI color codes](https://en.wikipedia.org/wiki/ANSI_escape_code).

For example, if you wanted your "Done." to be green, you could revise the most recent example to look like this:

```rb
$stdout.write('Exporting data ... ')
# do the export work
$stdout.write("\e[32mDone.\e[0m\n")
```

This would render "Export data ..." in white and "Done." in green.

## Utility Class

When your code is short and simple it can be enough to write the output (and color, if necessary) directly in the code. But as your codebase gets larger, it can really help to pull that logic out into a utility class and reference as needed. This way you don't have to remember the colors, just a simple [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) for your class.

Here's an example of a logger utility class:

```rb
class Logger

  class << self
    def write(str, color = :white)
      STDOUT.write(colorize(str, color.to_sym))
    end

    private

      def colors
        @colors ||= {
          blue: 34,
          green: 32,
          light_blue: 36,
          pink: 35,
          red: 31,
          white: 256,
          yellow: 33
        }
      end

      def colorize(str, color_code)
        "\e[#{colors[color_code]}m#{str}\e[0m"
      end
  end

end
```

The `class << self` is a ruby singleton idiom. What it enables me to do in this situation is have what _appear_ to be private class methods. What it ultimately does is clean up the class so that we can access the `write` method directly on the `Logger` class and still keep the code relatively clean.

Now when I want to log I have to make sure I've required this file and then I can access the `write` method on the `Logger` class while maintaining the colorization I wanted, like so:

```rb
Logger.write('Exporting data ... ')
# do the export work
Logger.write("Done.\n", :green)
```

This quickly becomes much easier to manage in large projects.

---

As you can see, there are plenty of approaches for logging output in your ruby code. The most important piece to remember is to do it. It doesn't really matter which approach you take, just as long as you're giving yourself feedback for your long-running processes.

---

**References:**

- [ANSI Color Codes](https://en.wikipedia.org/wiki/ANSI_escape_code)
