---
title: "Build & Deploy a Dynamic Site in an Hour for Free"
description: "Combine the forces of Contentful, Middleman, and Netlify to build and deploy dynamic-like site for free in less than an hour."
tags:
  - contentful
  - middleman
  - netlify
  - ruby
---

[Static site generators](https://www.staticgen.com/) are powerful tools. They enable developers to build and deploy static web pages, which are (typically) faster and more secure than their database-driven counterparts.

When the idea of using a [headless CMS](https://headlesscms.org/) to drive content on a static site came along, this idea of a static site generator became even more powerful. Now content can be managed in its own cohesive system and the only thing in the static site generator project is implementation code, _not_ content.

The problem with this approach was that there was a piece missing. Even if the headless CMS has a webhook that fires after content is edited, what does it hit? At the most basic level, you'd need your own server to deploy to, a local command line task to deploy. But it's trickier than that with a CMS because now you'll actually need to run a web server (this is before [AWS Lambda](https://aws.amazon.com/lambda/) became popular) to receive the webhook and prompt a rebuild. That also means your server has to be able to build the project, not just receive and serve files.

In other words, why not just build a [Rails](https://rubyonrails.org/) or [Django](https://www.djangoproject.com/) project and deploy it to [Heroku](https://http://heroku.com/)? Or hell, why not just use [WordPress](https://wordpress.com/) or [SquareSpace](https://www.squarespace.com/)?

Enter, [Netlify](https://www.netlify.com/). Netlify handles the entire build process for you, and it hosts the code. It listens to receive webhooks from GitHub and your headless CMS so any code or content change can trigger a new build. And it does all of this free of charge.

We're going to spend the next hour configuring these three tools to work together, and at the end of it you will have the beginning of your own site deployed to a server you're not managing or paying for.

---

**There are two articles that set the foundation for the work we're going to do here. [This one on dynamic routing in Middleman](/blog/dynamic-routing-in-middleman/) and [this one on using Contentful to drive content in Middleman](/blog/dynamic-pages-middleman-contentful/).** I'm not going to reiterate the foundational concepts I've laid out in those articles. You'll certainly be able to fly through this and copy code if that's what you're looking for, but if you want additional explanation, I highly recommend reading those two articles first.

---

To recap, the expectation with this article is that you understand:

- Static site generators
- Middleman's basics
- Headless CMS
- Git

Okay, enough blabbering about what we're going to do. Let's do something.

## Step 01: Contentful

Create a new space in Contentful for this example. We're going to keep it super simple, as we did in the previous article.

Let's work with two content models, as follows:

**Page** (`page` should be the id):

- `title` as a short text field, and the main title field (required)
- `slug` as a slug field (required)
- `body` as a long text field
- `template_name` as a short text field, displayed as a dropdown menu, with _Default_, _Home_, and _About_ as the choices (required)

**Post** (`post` should be the id):

- `title` as a short text field, and the main title field (required)
- `slug` as a slug field (required)
- `body` as a long text field
- `published_at` as a date

## Step 02: Middleman

Next we're going to setup Middleman to work with Contentful.

### Create Middleman Project

From the command line, create the Middleman project.

    $ middleman init my_new_project

Call the project (`my_new_project`) whatever you'd like. That will be the name of the project directory, so let's change into it:

    $ cd my_new_project

### Add Ruby Gems

Next, let's add the gems we're going to use for the project:

`Gemfile` {.filename}

```ruby
source 'https://rubygems.org'

# ...

gem 'contentful_middleman'
gem 'middleman-dotenv'
```

Install those gems:

    $ bundle install

### Contentful Configuration

First, we need to get the space ID and content delivery access token from your Contentful account. And we'll store that (sensitive) data in a `.env` file that is not tracked by git.

- For the space ID, go to Settings > General Settings and you should see the space ID in a disabled text field.
- For the access token, create a new API key by going to Settings > API Keys. Then choose "Add API Key" and call it "Middleman." The key you want to copy will be called "Content Delivery API - access token."

Once you have those vaues, create a new `.env` file and add the following:

`.env` {.filename}

```bash
CONTENTFUL_SPACE_ID="your_space_id"
CONTENTFUL_ACCESS_TOKEN="your_space_access_token"
```

Where `your_space_id` and `your_space_access_token` are the space ID and access token discussed above.

Then, make sure we don't track changes on this file:

`.gitignore` {.filename}

```git
# ...
.env
```

If you want, you can create another file that is tracked by git that doesn't have the variables, just so other developers working on the project know which values they need to obtain.

`.env-sample` {.filename}

```bash
CONTENTFUL_SPACE_ID=""
CONTENTFUL_ACCESS_TOKEN=""
```

In your `config.rb` file, configure Contentful to create pages and posts in a `data/sites` directory:

`config.rb` {.filename}

```ruby
# Load the custom mappers (explained below).
require 'lib/page_mapper'
require 'lib/post_mapper'

# Load files from .env into ENV.
activate :dotenv

# Configure Contentful with custom mappers.
activate :contentful do |f|
  f.space         = { site: ENV['CONTENTFUL_SPACE_ID'] }
  f.access_token  = ENV['CONTENTFUL_ACCESS_TOKEN']
  f.content_types = {
    pages: { mapper: PageMapper, id: 'page' },
    posts: { mapper: PostMapper, id: 'post' }
  }
end

# Ignore all templates (saves from doing it in loop and protects against data
# not existing)
ignore 'templates/*.html'

# Add pages to the data/site/pages directory.
if @app.data.try(:site).try(:pages)
  data.site.pages.each do |_id, page|
    proxy page.file_path, page.template, locals: { page: page }
  end
end

# Add posts to the data/site/posts directory.
if @app.data.try(:site).try(:posts)
  data.site.posts.each do |_id, post|
    proxy post.file_path, post.template, locals: { post: post }
  end
end

# ...
```

What we're doing here is configuring the contentful_middleman gem with custom mappers (which we'll get to next), which will pull in all the pages and posts into their own directories at `data/site/pages` and `data/site/posts` (the `site` directory name comes from using "site" as our keye in the `f.space` configuration option). Again, this is a place where the [previous Contentful-Middleman article](/blog/dynamic-pages-middleman-contentful/) could come in handy if you want more explanation.

Now let's add the mappers:

`lib/page_mapper.rb` {.filename}

```ruby
class PageMapper < ContentfulMiddleman::Mapper::Base
  def map(context, entry)
    super
    context.path = "/#{context.slug}/"
    context.file_path = "#{context.path}index.html"
    context.template = "templates/page/#{context.template_name.parameterize}.html"
  end
end
```

`lib/post_mapper.rb` {.filename}

```ruby
class PostMapper < ContentfulMiddleman::Mapper::Base
  def map(context, entry)
    super
    date = context.published_at
    context.path = "/blog/#{date.year}-#{'%02i' % date.month}-#{'%02i' % date.day}-#{context.slug}/"
    context.file_path = "#{context.path}index.html"
    context.template = 'templates/post.html'
  end
end
```

These mappers add a few attributes to the pages and posts that will be added to their respective YAML data files when they are pulled in. These attributes clean up the config file since we have an explicit value for the file path for the object as well as the template we want to render.

_If you didn't get enough info here or in the previous article, you can always look through [contentful_middleman's README file](https://github.com/contentful/contentful_middleman#entry-mapping), which has a section on entry mapping._

### Add Templates

If you try to build the Middleman project now, it won't work because we don't have our template files created. When Middleman runs through our pages/posts loops, it's trying to take the page and post objects from the `data/site` directories and run that data through a template and then proxying it to a file path within the build. The problem is we don't have those templates yet. So let's build them.

We're going to keep them all super simple but make them different enough (by putting their name at the top) so you know it's working properly.

`source/templates/page/default.html.erb` {.filename}

```erb
<p>This is the <strong>page/default</strong> template</p>
<hr>
<h1><%= page.title %></h1>
<%= simple_format page.body %>
```

`source/templates/page/about.html.erb` {.filename}

```erb
<p>This is the <strong>page/about</strong> template</p>
<hr>
<h1><%= page.title %></h1>
<%= simple_format page.body %>
```

`source/templates/page/home.html.erb` {.filename}

```erb
<p>This is the <strong>page/home</strong> template</p>
<hr>
<h1><%= page.title %></h1>
<%= simple_format page.body %>
```

`source/templates/post.html.erb` {.filename}

```erb
<p>This is the <strong>post</strong> template</p>
<hr>
<h1><%= post.title %></h1>
<p><%= post.published_at.strftime('%b %d, %Y') %></p>
<%= simple_format post.body %>
```

### Test the Build

Now you should be able to build the site! Try it:

    $ bundle exec middleman build

You should see a `build` directory that has pages and posts where we've proxied them.

You can also run the server:

    $ bundle exec middleman server

This makes the project accessible at localhost:4567. Note that it will still have the default index page and you'll have to navigate to the pages you want to see directly.

## Step 03: GitHub

Now that you have a working build, let's push the changes to GitHub. Create a new repository and push your local code to it.

You're welcome to make the repo public if you want, assuming you've not tracked your `.env` file or any sensitive data in the `config.rb` file.

## Step 04: Netlify

After GitHub is configured, sign up for a [Netlify](https://www.netlify.com/) account and log in.

Once logged in, there should be a button on your dashboard to create a new site from Git. Do so and connect it to the repository you just created.

### Environment Variables

Before it will work we need to add our environment variables to Netlify so it can properly pull content from Contentful during the build.

Go to Settings > Build & deploy > Build environment variables in your Netlify project. Then add your two variables, `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`.

### Deploy!

Trigger a new build and it should just work.

Now, every time you push a change to the `master` branch of your repository, you should see Netlify attempt to build the project again.

You should check out the settings in your Netlify project for all the extra features it has. You can point custom domains to your site, setup an SSL certificate (free)

## Step 05: Webhooks

There's one more piece missing. While Netlify knows to build after we push to GitHub, it doesn't know to build after a change in made in Contentful.

In Netlify, you can create a webhook endpoint that will trigger a build. Go to Settings > Build & deploy > Build hooks and click "Add build hook." Give it a name and tell it which git branch you'd like it to use to build when that hook is hit.

Next, setup the webhook in Contentful. This is under Settings > Webhooks in your space.

Create a new webhook, call it Netlify, and add the Netlify URL. Choose to trigger it for all events.

Now, try it. Create a new post and see if Netlify rebuilds the site and makes your post available where you'd expect it if you built locally.

---

_That's all! I hope you found this article informative and it helped you get up and running with Contentful and Middleman in no time (or less than an hour!)._

_If you have issues or questions, do not hesitate to [bug me](https://twitter.com/seancdavis29)._

---

**References**

- [Contentful](https://www.contentful.com/)
- [Middleman](https://middlemanapp.com/)
- [Contentful Middleman](https://github.com/contentful/contentful_middleman)
- [Netlify](https://www.netlify.com/)
