---
title: Export Multi-Line Environment Variables
description: "Storing multi-line strings in an environment variable is nice and easy to do, but the process is slightly different than a single line value. Here I present two approaches that achieve the same result."
tags: []
---

I've previously talked about [when to use environment variables](/when-to-use-environment-variables.html), along with [my favorite tool for managing project-specific values](/when-to-use-environment-variables.html). But neither of these solve a problem I run into occasionally -- how to store multi-line values in an environment variable.

Setting a single line environment variable is simple enough:

    $ export MY_VAR="Hello World"

And when asking for the value, what comes back is the value that was stored:

    $ echo $MY_VAR
    Hello World

When wanting to set a value that takes up more than one line, the process is slightly different. Here are two options for setting multi-line environment variables:

## Option 1: Quotes

The first option is to export the variable directly within the terminal session (on the command line) using quotes. Notice in the initial example that `Hello World` was wrapped in quotes. That was necessary to ensure that "World" came along with "Hello" since the shell would otherwise break at a space and not consider "World" as part of the value. Here's the result from the example above without using quotes:

        $ export MY_VAR=Hello World
        $ echo $MY_VAR
        Hello

You probably know from experience that when you hit `Enter` the shell runs the command you've typed. The exception to this rule is if the shell still believes it is within a command being written and isn't ready to execute. This state can be achieved by opening a quote without closing it. The terminal will open a second line without executing the first. And that will continue until the third, fourth, etc. until the quote is closed. In other words, this is one way to set an environment variable over several lines:

    $ export MY_VAR="Hello, World!
    > How are you?"

And when asking for the value back, it all gets stuffed into a single line, but it's all there:

    $ echo $MY_VAR
    Hello, World! How are you?

## Option 2: Reading a File

Another option that works especially well with longer values is to store that value in a file and read the file within the command.

Let's say the value will be stored in a file called `my_var`:

my_var {.filename}

```
Hello, World!
How are you?
```

With interpolation in the command -- by running a command within a command -- the contents of the file can be read and stored as the variable's value, like so:

    $ export MY_VAR=$(cat my_var)

Or, this, the equivalent command:

    $ export MY_VAR=`cat my_var`

In both cases, the command `cat my_var` is run and the output is stored as the variable. And the [`cat` command](<https://en.wikipedia.org/wiki/Cat_(Unix)>) is used for reading the contents of a file.

The output in both of these cases will result in the same value as Option #1, above:

    $ echo $MY_VAR
    Hello, World! How are you?

Keep in mind in both of these examples, exporting environment variables directly in the terminal only stores them for that session. To store values across sessions, place the commands within a source file that is loaded with each session. What that file is changes depending on the shell you're using. It could be `.profile`, `.bash_profile`, `.bashrc`, `.zshrc`, or another.

That's all! Now you have the power to store multi-line strings as environment variables!
