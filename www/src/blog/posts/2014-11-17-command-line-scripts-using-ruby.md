---
title: Command Line Scripts Using Ruby
tags:
  - ruby
description: Command line scripts aren't so bad to write when you've got Ruby on your side.
---

As a novice programmer, writing command line scripts was an intimidating
adventure. I can't quite say why. Maybe it was because it was a new language --
a different world. I'm not sure, but something felt different.

Then, one magical day, I learned that you can write command line scripts using
[Ruby](https://www.ruby-lang.org). This was fantastic news to me, as I
spent most of my developing time with Ruby.

It's quite easy. Let's start by writing the simplest of scripts (our "Hello
World" script), and then moving on to something a little more complicated, but
still simple.

## The "Hello World" Script

### 01: Create the File

First thing is first. Create the file.

Note two things that might be unfamiliar:

1. You don't need the `.rb` extension on the file.
2. It doesn't matter where you place this file, but we'll move it later.

I'll call this first script `hello_world`.

### 02: Write the Script

Next, add it's contents.

`hello_world.rb` {.filename}

```ruby
#!/usr/bin/env ruby

puts "Hello World"
```

Looks simple, right? The script only has two lines, and we can look at what
each does.

`#!/usr/bin/env ruby` is called a
[_shebang_](<http://en.wikipedia.org/wiki/Shebang_(Unix)>) or a _hashbang_. It
tells the system which interpreter (language) to use when parsing the script.
You may have to change this to point to where you have the `ruby` executable. You can figure that out by running this command:

    $ where ruby

The second line is the script itself. In this case, it's just one line that
prints "Hello World" to the command line.

### 03: Make it Executable

Now we need to make the script executable. This is easy, we just change the
permissions on it.

    $ chmod +x hello_world

### 04: Run it!

Okay, you're all set. Go ahead and run it.

But wait! Simply running `hello_world` probably won't work, and I'll get to why
that is later. For now, note that you can run any executable script within a
directory by prefixing your command with `./`. So, in this case, you would run
this command.

    $ ./hello_world
    Hello World

## The Path

`$PATH` is an environment variable on your machine. It is a cascading list of directories in which an executable program (like Ruby) will look for a command when that command is entered on the command line.

To see your current path, you can run the following command.

    $ echo $PATH

The output is a series of directories separated by a colon. It's nice to have a personal directory in the path so you can add some custom scripts. And you'll want to make this permanent so it persists if you restart your machine. How you do this depends on your setup. Start with a Google search [like this](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=add+a+directory+to+path).

Personally, I like to keep my executables in a `bin` directory within my home folder. And then I dump all my executables in this directory.

Do note, you may need to reload your shell before you can run the executable after you've adjusted your path.

Try to add your script to your path. If you're successful, you'll be able to run our simple script just with.

    $ hello_world

## Accepting Arguments

Most of the time we're going to want to do something much more complicated than simply printing output strings.

Any arguments passed to the command get stored in a constant array -- `ARGV`. Let's have an example.

Let's say I have a folder structure I find myself always recreating. I want to created a directory with a custom name that wraps three subdirectories -- `dir_1`, `dir_2` and `dir_3` -- and inside the main directory I want a `README.md` file.

The only thing we need from the user is the name of the wrapping directory. But, we want to be sure we have it. I typically check to see if we have the argument, and exit if we don't (along with a help message).

Let's write this to a new executable `project`.

`project` {.filename}

```ruby
#!/usr/bin/env ruby

if ARGV.size < 1
  puts "Usage: project [DIR]"
  exit
else
  dir = ARGV.first
end
```

You can see that if you make the file executable, and then run:

    $ project

that you are returned with an error. On the contrary, if you add an argument:

    $ project my_first_project

nothing happens. But, what's more important is you received no errors. So, we're ready to dig in.

First, let's create the wrapping directory.

`project` {.filename}

```ruby
require 'fileutils'

FileUtils.mkdir(dir)
FileUtils.mkdir(dir + '/dir_1')
FileUtils.mkdir(dir + '/dir_2')
FileUtils.mkdir(dir + '/dir_3')
```

In situations like this, I love refactoring. Let's see how we can make this even cleaner.

`project` {.filename}

```ruby
(1..3).to_a.each { |i| FileUtils.mkdir_p("#{dir}/dir_#{i + 1}") }
```

Ah, much cleaner. For a look on `FileUtils`, see [this page](http://www.ruby-doc.org/stdlib-2.1.4/libdoc/fileutils/rdoc/FileUtils).

Last, all we need to do is create the empty `README.md` file.

`project` {.filename}

```ruby
FileUtils.touch("#{dir}/README.md")
```

Put it all together, and we have ourselves a nice little command line script.
See the compiled version and comment on the code
[here](https://gist.github.com/seancdavis/df875dd15ff8fbd755d9).

There's obviously much more you can do with Ruby command lines scripts, but
this should get you running. Now it's up to you to come up with some crazy
ways in which to improve your workflow!
