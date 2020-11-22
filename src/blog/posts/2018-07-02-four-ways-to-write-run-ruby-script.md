---
title: "4 Ways to Write and Run a Ruby Script"
description: "Ruby is fun to write, and it's pretty easy to use Ruby to perform ad hoc services for you. Here are a few approaches."
tags:
  - ruby
---

One-off ruby scripts run the gamut on the services they can provide you. From little helpers to full-on command-line utilities, the possibilities are endless.

Using the classic "Hello World" script (where all we do is print "Hello World" to the console), I'm going to show you four ways in which you can write and run a script with Ruby. And when we're done, we'll talk about when to use which method.

## The Script

Before we get into the methods, let's look quickly at the script. As the simplest form of a script, we're only going to print "Hello World" to the console. But know that this _is_ running ruby code, so you can write any ruby code in the place of this code and it should work to your benefit!

This is the script:

```rb
puts 'Hello World'
```

Yeah, that's it.

## 01: IRB

The first method is using [IRB](http://ruby-doc.org/stdlib-2.5.1/libdoc/irb/rdoc/IRB.html). IRB stands for "Interactive Ruby" and opens up an active ruby session.

All you have to do is run `irb` and you'll be placed into an interactive ruby session. This will look familiar if you've ever worked with Rails because this is what the Rails console uses.

To open the session, run the command. You can do this from any directory and the ruby console will maintain a reference to knowing in which directory you are working.

    $ irb

Your prompt will change and you can author ruby directly:

```
irb(main):001:0> puts 'Hello World'
Hello World
=> nil
```

That's it!

(Type `exit` to get out of the session.)

## 02: Ruby File

In the second approach, to author we simply write our script to a ruby file. Let's call our file `hello_world.rb`. And you can save it to your current working directory.

`hello_world.rb` {.filename}

```rb
puts 'Hello World'
```

To run the contents of the file, use the `ruby` command and pass in the path to the file:

    $ ruby hello_world.rb

## 03: Rake

A fairly common place to put ruby scripts is inside a rake task. [Rake](https://github.com/ruby/rake) is a powerful build utility for ruby.

While we can setup rake within a project in all sorts of ways, we're going to keep it simple for this example. When running `rake` within a directory, Rake looks for a `Rakefile` to know what to. Usually that file will load other rake files, but you can also author your commands directly in the file.

So let's do that. Create a new `Rakefile` and add your script:

`Rakefile` {.filename}

```rb
task :hello_world do
  puts 'Hello World'
end
```

Notice there is more code in this method. This is because we have to tell Rake the name of our task (here that is `hello_world`).

If you have rake installed, you can now run the script:

    $ rake hello_world

## 04: Command-Line Script

Our last method is to actually write a command-line script so it behave like any other shell script.

When I write scripts in this manner, typically I put them in a `bin` directory so they are all together and out of the way.

So, create your command-line script file and then add the contents:

`bin/hello_world.rb` {.filename}

```rb
#!/usr/bin/env ruby

puts 'Hello World'
```

The top line in this file is called a [Shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>). It's telling your shell in which language it should run the script, so it has to point to where ruby is installed on your machine. `/usr/bin/env ruby` typically works.

Now, before you are able to run the command, you'll want to make it executable.

    $ chmod +x bin/hello_world.rb

If the bin is in your `$PATH`, you can run the script directly. If you don't know what that means or if you know it's not in your path, you can now run the command, but must point to it relatively. So, from your working directory, this would be:

    $ ./bin/hello_world.rb

Notice the only difference between this approach and #2 was that we don't need the `ruby` command in front.

## Which is best?

Okay, so there are four different ways in which you can write and run scripts, so which one is best?

The answer, of course, is _it depends_. It depends mostly on what you're doing, how variable it is, and how frequently you're doing it. I follow this general approach:

- If it's quick, simple, and a one-time thing, I use IRB
- If it's repeatable and consistent, I use rake
- If it's complicated, I also use rake, but I may not save the file
- If it's repeatable but varying, I use the file approach (#2 or #4, the difference being only preference), because it's not as easy to [manage arguments with rake](/4-ways-to-pass-arguments-to-a-rake-task.html)
