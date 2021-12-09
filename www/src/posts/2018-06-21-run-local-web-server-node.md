---
title: Run a Local Web Server with Node
description: No need to mess with Apache or Nginx to run a web server on your
  local machine. Just use this node command.
tags:
  - javascript
  - node
image: /blog/default/default-green-03.png
---

This is a separate approach to [this article](/blog/run-local-web-server-ruby/), which shows how to run a local web server with a _ruby_ command.

First, install the command-line utility:

    $ npm install http-server -g

Then change to your project's root directory:

    $ cd path/to/your/project

And then run the [http-server command](https://www.npmjs.com/package/http-server):

    $ http-server .

The dot (`.`) tells the command you want the document root to be the current directory. You can pass any path here -- for example, instead of changing into the project directory first, you could have written:

    $ http-server path/to/your/project

Where `path/to/your/project` is the actual path to your document root.

You can also specify the port on which to run the server. By default it will run on 8080. Unlike the ruby command, the http-server command requires you to prepend a colon (`:`) to the port argument:

    $ http-server . -p :4567

This example would run the server on port 4567. That means after running this command you can navigate to http://localhost:4567 and see your project.

---

**References**:

- [Node http-server command](https://www.npmjs.com/package/http-server)
