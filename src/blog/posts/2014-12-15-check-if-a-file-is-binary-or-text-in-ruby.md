---
title: Check if a File is Binary or Text in Ruby
tags:
  - ruby
description: Here's a cool little trick to determining if a file is text or binary in Ruby just by using the path to that file.
---

Sometimes when you want to read a file in Ruby you need to know whether that file is binary or text, to help you avoid some unwelcome errors.

We can accomplish this by using a gem called [`ruby-filemagic`](https://github.com/blackwinter/ruby-filemagic). We're going to look at the MIME type of the file, and if it's not text, then we'll assume it's binary. We can do something like this:

```ruby
require 'filemagic'

def text?(filename)
  begin
    fm = FileMagic.new(FileMagic::MAGIC_MIME)
    fm.file(filename) =~ /^text\//
  ensure
    fm.close
  end
end

def binary?(filename)
  !text?
end
```

Then you can run:

```
> text?("/path/to/my/file.png")
# => false
```

In addition, since you're typically going to be working with the path of the file (as a string), we could extend the `String` class to make this a little prettier to write. However, you might want to get more specific with your method naming.

```ruby
require 'filemagic'

class String

  def text_file?
    begin
      fm = FileMagic.new(FileMagic::MAGIC_MIME)
      fm.file(self) =~ /^text\//
    ensure
      fm.close
    end
  end

  def binary_file?
    !text?
  end

end
```

Then you can run this instead:

```
> "/path/to/my/file.png".text_file?
# => false

> "/path/to/my/file.png".binary_file?
# => true
```

---

**References:**

- [ruby-filemagic](https://github.com/blackwinter/ruby-filemagic)
- [Ruby: How to determine if file being read is binary or text](http://stackoverflow.com/a/2356173/2241124)
