---
title: Search and Replace Multiple Lines in Multiple Files in Ruby
description: There are many tools for searching and replacing, but most don't
  support changing multiple lines in one process.
tags:
  - ruby
image: /blog/default/default-lime-01.png
---

There are a lot of tools out there for searching and replacing across multiple files. Heck, even the code editor I'm using now -- [VS Code](https://code.visualstudio.com/) -- supports search and replace (and it's pretty quick about it).

But when I recently went to search and replace a multi-line string in all files throughout a directory, I noticed there was a lack of tools to accomplish this. [The `sed` command](https://www.gnu.org/software/sed/manual/sed) won't do it and neither will my code editor (at least at the time of writing this).

It turns out this is quite easy to accomplish in ruby with an ad hoc script using [the `Dir` class](https://ruby-doc.org/core-2.5.1/Dir) to identify the files and [the `File` class](https://ruby-doc.org/core-2.5.1/File) to read and rewrite the file.

**Before we get into the guts of this thing, know that this can be a dangerous path down which to proceed. This particular approach is a destructive action and if you're not using version control and you write an error into your script, you could incorrectly and permanently alter files in a negative way. I highly recommend tracking these files with [git](https://git-scm.com/) so you can protect against mistakes.**

## Writing the Script

Let's consider an instance where you want to remove a particular string ("Hello World") followed by two newlines (i.e. a _multi-line_ search and replace), but we only want to make this change within _ruby_ files within the current directory and all subdirectories.

Our script could look something like this:

```ruby
# The string we want to replace.
str = "Hello World\n\n"
# Find all ruby files in this directory and its subdirectories.
Dir.glob('./**/*.rb').each do |file|
  # Read the file and store the contents in memory.
  content = File.read(file)
  # Don't do anything ("next")
  next unless content.include?(str)
  # (Re)Write the file after removing the targeted string.
  File.open(file, 'w+') { |f| f.write(content.remove(str)) }
end
```

## Running the Script

Where you put this script so it can be run is entirely up to you and the way in which you like to work. In general, there are three solid ways in which you can run a ruby script:

1. Open an [IRB](http://ruby-doc.org/stdlib-2.5.1/libdoc/irb/rdoc/IRB) instance, paste the command and then run it.

2. Put the command in a file, and then run `ruby path/to/file.rb` where `path/to/file.rb` is the path to your ruby file.

3. Make it [a rake task](https://github.com/ruby/rake).

In general, if it's a one-off task you're only going to run a single time, the IRB console is usually the way to go. That way you don't have to store any code. You write it, run it, and then forget about it.

If it's something you're going to run again, or if you may use something _similar_ to it in the future, it may be worth storing as a standalone script or an executable.

---

Once you've run the script, go check your files and see that your targeted string has been removed!
