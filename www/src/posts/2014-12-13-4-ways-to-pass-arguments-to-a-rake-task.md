---
title: 4 Ways to Pass Arguments to a Rake Task
tags:
  - rake
  - ruby
description: Always googling and forgetting how to pass arguments to rake tasks?
  Here's a up list of the various methods.
image: /posts/default/default-blue-01.png
---

[Rake tasks](http://guides.rubyonrails.org/command_line.html#rake) are a great way to enhance (or even automate) your workflow with a ruby project. When I was first learning Ruby, a developer said to me:

> "Take the time to learn rake, you're going to use it all the time."

They were right.

But it seemed to be missing something inherently simple: the ability to accept arguments. Take a simple task:

```ruby
desc 'Add 1 + 2'
task :add do
  puts 1 + 2
end
```

You'd run this as:

    $ rake add
    # => 3

You're unlikely to use a task like this in practice. But, let's consider this as a means to demonstrate how we could make it more dynamic. In this specific example, how can we pass numbers to this task and have it do the math on the fly?

I've found four different ways of accomplishing this.

{% callout type="note" %}
If you're following any of these methods, be sure to add some error catching — looking for `nil` values and such. I'm not doing that here so we can focus on how we get to the arguments.
{% endcallout %}

## Method #1: The Rake Way

Rake has a built-in way of accepting arguments. Here, the task would look like this:

```ruby
desc 'Method #1: Use the default rake way to add two numbers and log the result'
task :add, [:num1, :num] do |t, args|
  puts args[:num1].to_i + args[:num].to_i
end
```

And you'd run this like so:

    $ rake add[1,2]
    # => 3

I dislike this method for the many caveats that come with it. For example, if you're using a zsh shell, then you probably get this error:

    zsh: no matches found ...

That's because you have to escape your square brackets. So, you'd have to run the task like this:

    $ rake add\[1,2\]

And that's ugly. You need brackets on the command line and you need to know the order in which you must include your arguments.

You also can't have a space after the comma in your arguments or you'll see another error.

It works. But it feels icky.

## Method #2: Environment Variables

If you're working with rake, you probably know (and have used) environment variables. If you've deployed a rails project, then you've inevitably run something like this:

    $ RAILS_ENV=production bundle exec rake ...

In this case, you're setting an [environment variable](http://en.wikipedia.org/wiki/Environment_variable) in `RAILS_ENV`.

We can use that same method with rake. Here's the task.

```ruby
desc 'Method #2: Use env vars to add two numbers and log the result'
task :add do
  puts ENV['NUM1'].to_i + ENV['NUM2'].to_i
end
```

Running this would look like:

    $ rake add NUM1=1 NUM2=2
    # => 3

This works fine, but it sets environment variables, which is often unnecessary. It also forces you to type in caps, which feels unnecessary. But compared to the first method, it at least feels more natural — you've run commands that follow a similar flow.

## Method #3: Using ARGV

When you run a rake task, the tasks names are bundled up a constant, `ARGV`. So you could do something like this:

```ruby
desc 'Method #3: Use ARGV to add two numbers and log the result'
task :add do

  ARGV.each { |a| task a.to_sym do ; end }

  puts ARGV[1].to_i + ARGV[2].to_i

end
```

And this would be run like this:

    $ rake add 1 2
    # => 3

Referring back to the task, the first line — `ARGV.each { |a| task a.to_sym do ; end }` is dynamically writing tasks on the fly. That's because when we run:

    $ rake add 1 2

rake also tries to run:

    $ rake 1
    $ rake 2

Because `1` and `2` aren't tasks, we would get an error unless we write empty tasks for them.

The downside to this method is that we need that extra line of code that creates blank tasks in any task that accepts arguments. We also need to know the order in which we're passing arguments, just like Method #1.

On the positive side, it's really clean. If your arguments are few in number and predictable, then it's a simple means of accepting arguments. Otherwise, at this point, I might prefer Method #2.

## Method #4: Ruby OptionParser

This is the most complex and tedious method, but it pays off on the command line. The task looks like this:

```ruby
require 'optparse'

desc 'Method #4: Use OptionParser to add two numbers and log the result'
task :add, [:num1, :num] do |t, args|
  options = {}
  opts = OptionParser.new
  opts.banner = "Usage: rake add [options]"
  opts.on("-o", "--one ARG", Integer) { |num1| options[:num1] = num1 }
  opts.on("-t", "--two ARG", Integer) { |num2| options[:num2] = num2 }
  args = opts.order!(ARGV) {}
  opts.parse!(args)

  puts options[:num1].to_i + options[:num2].to_i
  exit
end
```

And the command would be something like this:

    $ rake add -- --one 1 --two 2

This really comes in handy if you have several different arguments. It's also a relatively clean way to work on the command line. It's much in-line with commands you're used to running.

## Consider an Alternative: Thor

One thing is quite apparent is that there isn't a straightforward means of accepting arguments in a rake task. That makes me think, _There must be something better!_

And there is! [Thor](https://github.com/erikhuda/thor) is widely held to be a great alternative to rake on the ruby command line. It's the tool behind `rails generate` commands. It's just lovely.

I haven't used it much, but if you're interested, there's [a good Railscast](http://railscasts.com/episodes/242-thor) that can get you started.

---

**References:**

- [Passing parameters to a Rake task](https://itshouldbeuseful.wordpress.com/2011/11/07/passing-parameters-to-a-rake-task/)
- [How do I pass command line arguments to a rake task?](http://stackoverflow.com/a/825832/2241124).
