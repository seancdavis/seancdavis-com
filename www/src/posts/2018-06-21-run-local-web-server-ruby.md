---
title: Run a Local Web Server with Ruby
description: No need to mess with Apache or Nginx to run a web server on your
  local machine. Just use this ruby command.
tags:
  - ruby
image: /posts/default/default-green-03.png
---

Running a web server on your local machine doesn't have to be complicated. If you already have ruby installed on your machine, you can use a simple command to run a web server from any directory on any port.

_If you don't want to use ruby, you can use [this node command](/posts/run-local-web-server-node/) instead._

First, change to your project's root directory:

    $ cd path/to/your/project

And then run the [ruby httpd command](https://apidock.com/ruby/Object/httpd):

    $ ruby -run -e httpd . -p 4567

The dot (`.`) tells ruby you want the document root to be the current directory. You can pass any path here -- for example, instead of changing into the project directory first, you could have written:

    $ ruby -run -e httpd path/to/your/project -p 4567

Where `path/to/your/project` is the actual path to your document root.

And last, I tend to specify the port even though it is not required so I know where to look. In this example, I'm running the web server on port 4567. (If you omit the port, it will run on 8080.)

That means after running this command you can navigate to http://localhost:4567 and see your project.

---

**References**:

- [Ruby httpd command](https://apidock.com/ruby/Object/httpd)
