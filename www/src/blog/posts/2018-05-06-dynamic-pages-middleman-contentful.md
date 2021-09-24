---
title: "Dynamic Pages in Middleman using Contentful"
description: "How to configure and use the Contentful Middleman gem to generate pages in Middleman driven by a content management system."
tags:
  - contentful
  - middleman
  - ruby
---

Middleman has a powerful feature for [generating dynamic pages](https://middlemanapp.com/advanced/dynamic-pages/).

Building on [my previous article on dynamic content in Middleman](/blog/dynamic-routing-in-middleman/), Middleman becomes more powerful (and more awesome!) when connected with a [headless CMS](https://en.wikipedia.org/wiki/Headless_CMS/). In this article, let's take a look at using Contentful as that CMS.

_For this example, we're assuming at least some familiarity with Contentful and Middleman. If you have no experience, neither are too difficult to dive into, so you should still be able to follow along. If you have trouble, Contentful has solid [docs](https://www.contentful.com/resources/) along with a [help desk](https://www.contentful.com/support/), and Middleman has [a community forum](https://forum.middlemanapp.com/)._

## Step 01: Setup Contentful

The first thing to do is to setup a [new project in Contentful](https://app.contentful.com/). (If you're just getting started with Contentful you can ignore their example project for now and create your own blank project.)

### Create Content Models

For this example we're going to use two [content models](https://www.contentful.com/r/knowledgebase/content-modelling-basics/), `Page` and `Post`. We'll keep it simple, but use these two models to show how you may make slight deviations in your config to accommodate various content types.

**Page** should have the following fields:

- `title` as a short text field, and the main title field (required)
- `slug` as a slug field (required)
- `body` as a long text field
- `template_name` as a short text field, displayed as a dropdown menu, with _Default_, _Home_, and _About_ as the choices (required)

**Post** should have the following fields:

- `title` as a short text field, and the main title field (required)
- `slug` as a slug field (required)
- `body` as a long text field
- `published_at` as a date

Again, I'll let you figure this part out.

### Add Content

Once you have your models, go ahead and create some example content. Create at least one page for each of the template names. (Note that Contentful has a nice _duplicate_ feature that can make this process go quicker.)

When you're all set with some example content, we can move over to Middleman. We'll come back to Contentful for a couple config values later on.

## Step 02: Setup Middleman

When you're ready to move over to Middleman, open a new terminal window, change into your code directory, then create the Middleman project:

    $ middleman init my_new_project

You can call your project (`my_new_project`) whatever you'd like. That value will the name of the directory in which the Middleman repo lives. So let's change into that directory:

    $ cd my_new_project

If everything went smoothly, that's all you need to start working with Middleman. You should be able to start the server:

    $ bundle exec middleman

Visit [http://localhost:4567](http://localhost:4567) in your browser and you should see the default landing page.

## Step 03: Configure Contentful Middleman Gem

Once you've got the project up anad running, let's shut down the server (`Ctrl`+`C` in your command line application). The changes we're going to make will force us to restart the server.

Next, add the Contentful Middleman gem to your project:

`Gemfile` {.filename}

```ruby
gem 'contentful_middleman'
```

Then install it and its dependencies from the command line:

    $ bundle install

And now we want to add the space settings so we can pull content in. That looks like this:

`config.rb` {.filename}

```ruby
activate :contentful do |f|
  f.space         = { site: 'contentful_space_id' }
  f.access_token  = 'contentful_space_access_token'
  f.content_types = { pages: 'page', posts: 'post' }
end
```

There's a couple things happening here, but let's first fill in the correct values.

- `contentful_space_id` is the ID of your space. Within your Contentful space, go to Settings > General Settings and you should see the space ID in a disabled text field.
- `contentful_space_access_token` is an API key. Create a new API key by going to Settings > API Keys. Then choose "Add API Key" and call it "Middleman." The key you want to copy will be called "Content Delivery API - access token."

Replace those values with the appropriate ones from your Contentful space.

Okay, back to the code. The activation block sets the space and access token, which the gem's extension will use to obtain content from Contentful.

The last setting -- `f.content_types` -- maps the content models in Contentful to collections within Middleman. So, what we're saying here is that every _page_ in Contentful will be mapped to an object (YAML file) within the _pages_ data collection. And the same goes for posts.

But let's test it out to make sure it works. Run the following command from the Middleman project directory:

    $ bundle exec middleman contentful

You should see a new directory, `data`, created. In it there should be another directory, `site`. The reason that is called `site` is because that was the key of the `f.space` config option. If you changed that to `my_site`, that's what this directory will be called. (That will come in use later.)

Within the `site` directory, you should see `pages` and `posts` directories. Again, those names came from your configuration. And within each of those, you should see a few YAML files representing the test data you entered in Contentful.

{% post_image
    alt="Contentful Middleman Data Directory",
    src="/blog/180507/contentful-middleman-data-dir.png" %}

The filenames are the ID values for each piece of content in Contentful.

## Step 04: And dotenv support

Before we go any further, let's make sure we don't commit your sensitive keys to git. To avoid that, I like to setup dotenv. There's a simple plugin for Middleman as well.

First, add the gem:

`Gemfile` {.filename}

```ruby
gem 'middleman-dotenv'
```

Install it:

    $ bundle install

Then add a `.env` file to the root of your project and add your values there:

`.env` {.filename}

```bash
CONTENTFUL_SPACE_ID="your_space_id"
CONTENTFUL_ACCESS_TOKEN="your_space_access_token"
```

And replace the values for your space.

**Don't let git track this file. This is the most important piece:**

`.gitignore` {.filename}

```git
# ...
.env
```

_Note: I typically like to create a `.env-sample` file that shows only the keys needed so anyone else who works on the project can see which sensitive keys they'll need to ask you for._

`.env-sample` {.filename}

```bash
CONTENTFUL_SPACE_ID=""
CONTENTFUL_ACCESS_TOKEN=""
```

When your sensitive data is store appropriately, you can change out your config:

`config.rb` {.filename}

```ruby
activate :contentful do |f|
  f.space         = { site: ENV['CONTENTFUL_SPACE_ID'] }
  f.access_token  = ENV['CONTENTFUL_ACCESS_TOKEN']
  f.content_types = { pages: 'page', posts: 'post' }
end
```

And above that, activate the dotenv plugin so we can load those variables:

```ruby
activate :dotenv
```

And now you're safe to track the config file in git, since we've remove the sensitive data from it.

_I'd recommend you delete the `data` directory and try to run `bundle exec middleman contentful` again just to make sure you didn't screw something up in the process of introducing environment variables._

## Step 05: Generate Dynamic Pages

Now you have content in your data directory, but you don't have it displayed anywhere on the site.

### Routes Configuration

We're going to use [Middleman's dynamic pages feature](https://middlemanapp.com/advanced/dynamic-pages/) to build routes using these data files.

_Before getting into this, if you don't understand dynamic pages in Middleman, I encourage you to go through [my article on dynamic routing](/blog/dynamic-routing-in-middleman/). It gives some useful background on my approach here._

When you're ready, these routing loops look like this:

`config.rb` {.filename}

```ruby
# Ignore all templates. (This saves us from ignoring within the loop and
# protects us against an error if one of the data types doesn't exist.)
ignore 'templates/*.html'

# Checks to ensure pages data exists before trying to access it
if @app.data.try(:site).try(:pages)
  # Loop through each page
  data.site.pages.each do |_id, page|
    # The path to the page gets set from the slug of the page
    path = "#{page.slug}/index.html"
    # Use the appropriate template
    template = "templates/page/#{page.template_name.parameterize}.html"
    # Add the proxy
    proxy path, template, locals: { page: page }
  end
end

if @app.data.try(:site).try(:posts)
  data.site.posts.each do |_id, post|
    date = post.published_at
    path = "blog/#{date.year}-#{'%02i' % date.month}-#{'%02i' % date.day}-#{post.slug}/index.html"
    template = "templates/post.html"
    proxy path, template, locals: { post: post }
  end
end
```

Let's look at what each of these lines is doing so you really understand what's going on.

- `ignore 'templates/*.html'`

  This ignores the template files we're going to use to generate these dynamic pages. We want to ignore them or Middleman will try to render them explicitly when it's building. And that will cause errors because we're going to use variables that don't exist when rendering the template directly.

- `if @app.data.try(:site).try(:pages)`

  If you were to start your Middleman server or attempt a build prior to running the Contentful import command, or if you didn't have any pages in your Contentful space, then looping through `data.site.pages` will throw an error. So, we want to (carefully) make sure these items exist before we start the loop.

- `data.site.pages.each do |_id, page|`

  Recall I said the name of the directory in data would come in handy? Yeah, that's because Middleman loads every directory into its own method on the `data` object. So, if you called your data directory `my_site`, then you'd loop through the pages with `data.my_site.pages`.

  Also note that `data.site.pages` isn't just an array of pages. It's an array of arrays where the first element is the ID (i.e. the filename) and the second is the page object. (I precede `id` with an underscore to indicate we're not using it.)

- `proxy path, template, locals: { page: page }`

  I jumped to the bottom because this is the line that really matters. This is where you should familiarize yourself with proxies (i.e. dynamic pages) in Middleman.

  The first argument is the path at which we want the page to live, the second is the template we're going to render for that page, and then it accepts a hash of other options. We've added `locals: { page: page }` to our options. This adds a `page` variable to the template when it's rendered (more on that later).

  The other two values comes from the lines above them ...

- `path = "#{page.slug}/index.html"`

  We are getting the path from the slug. Instead of just using the slug, we actually write the file as `index.html` inside a directory named for the slug. That helps make URLs pretty because we don't need to use `.html` at the end of the URL. ([Read here for more information.](https://middlemanapp.com/advanced/pretty-urls/))

- `template = "templates/page/#{page.template_name.parameterize}.html"`

  This part is a little tricky. This is the name of the template we're going to render. Notice in the posts loop that this is set to `"templates/post.html"`. That's because we want one template for all posts. But we've made pages a little more complex. For pages, we're going to look for the template name and render that template. More on that in just a moment.

### Template Files

If you try to build or run the server now, you're going to run into an issue. Middleman will try to render your content to templates that don't exist. So, let's create those templates. (We'll keep them simple.) You'll want new files here:

- `source/templates/page/default.html.erb`
- `source/templates/page/about.html.erb`
- `source/templates/page/home.html.erb`
- `source/templates/post.html.erb`

_**Notice the `.erb` extension on the end of the filename.**_

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

Notice that for the pages we have a `page` variable representing the page object, and we have attributes like `title` and `body` available to us. This works similarly for posts, but we set the variable to `post` instead.

### Rebuild

Now, go ahead and build the site:

    $ bundle exec middleman build

You should see your site in the `build` directory, and you should see a file for every piece of content that you imported from Contentful. (You could also run the server and navigate directly to those pages. We'll do that in Step 08.)

## Step 07: Add Custom Mapper

This is all well and good, but the problem with building the routes in the way we have is that the path or URL to the pages and posts isn't stored within the page or post object. We will either have to create a helper method or manually write it every time.

Fortunately, the Contentful gem supports [custom mapping](https://github.com/contentful/contentful_middleman#entry-mapping) so we can define our own atributes on our content types.

As an example, let's look at an existing page in your data directory. Here's one of mine:

`data/site/pages/2Ckj6CvfsAwS6G2A8MUmgU.yaml` {.filename}

```yaml
---
:id: 2Ckj6CvfsAwS6G2A8MUmgU
:_meta:
  :content_type_id: page
  :updated_at: "2018-05-06T11:13:05+00:00"
  :created_at: "2018-05-06T11:07:18+00:00"
  :id: 2Ckj6CvfsAwS6G2A8MUmgU
:title: About
:slug: about
:body:
  Cras justo odio, dapibus ac facilisis in, egestas eget quam. Sed posuere consectetur
  est at lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
  sed odio dui. Vestibulum id ligula porta felis euismod semper. Morbi leo risus,
  porta ac consectetur ac, vestibulum at eros.
:template_name: About
```

### Create Mappers

Now, let's write a custom mapper.

First, create a file at `lib/page_mapper.rb` and add the following code:

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

Notice the class inherits from `ContentfulMiddleman::Mapper::Base`. This gives us some base features so we don't have to worry about the default mappings.

Instead, we add one method -- `map`. We call `super` first, which sets all the out-of-the-box attributes. At that point, all those attributes are set on the `context` object, and we can add whatever we want to that object.

Here I'm adding three attributes:

- `path`: The display path to the page
- `file_path`: The path at which we want to write the physical [HTML](/blog/wtf-is-html/) file
- `template`: The path (inside `source`) to the template to use to render the page content

For post we can do something very similar:

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

### Configure Mappers

We need two slight adjustments to the config. First we need to require the mappers, then we need to add them to our contentful config.

`config.rb` {.filename}

```ruby
require 'lib/page_mapper'
require 'lib/post_mapper'

# ...

activate :contentful do |f|
  # ...
  f.content_types = {
    pages: { mapper: PageMapper, id: 'page' },
    posts: { mapper: PostMapper, id: 'post' }
  }
end
```

### Test Content Import

Import the content again:

    $ bundle exec middleman contentful --rebuild

And now notice your data should have a few new lines at the end:

`data/site/pages/2Ckj6CvfsAwS6G2A8MUmgU.yaml` {.filename}

```yaml
# ...
:path: "/about/"
:file_path: "/about/index.html"
:template: templates/page/about.html
```

### Rewrite Routes

And now when we loop over the pages and posts, we can do so much simpler:

`config.rb` {.filename}

```ruby
if @app.data.try(:site).try(:pages)
  data.site.pages.each do |_id, page|
    proxy page.file_path, page.template, locals: { page: page }
  end
end

if @app.data.try(:site).try(:posts)
  data.site.posts.each do |_id, post|
    proxy post.file_path, post.template, locals: { post: post }
  end
end
```

Now rebuild the site and you shouldn't see anything changed in the end result.

## Step 08: Looping Over Content

The last thing I want to show you is that you can loop over the content. Let's do this on the home page for an example.

Your site's home page is `source/index.html.erb`.

`source/index.html.erb` {.filename}

```erb
---
title: Contentful Middleman Example
---

<ul>
  <% data.site.pages.each do |_, page| %>
    <li><a href="<%= page.path %>"><%= page.title %></a></li>
  <% end %>
</ul>

<ul>
  <% data.site.posts.each do |_, post| %>
    <li><a href="<%= post.path %>"><%= post.title %></a></li>
  <% end %>
</ul>
```

Notice here that we can now use `page.path` to get the right path to the page since we've defined that in our custom mapper.

If you fire up your Middleman server, you should be able to see this list (looking ugly because we've inherited the default styles). And you should be able to click on each item and navigate to that content.

---

_I hope this got you up and running with Contentful and Middleman with relative ease. Always feel free to [hit me up](https://twitter.com/seancdavis29) with questions, comments, issues, etc._

---

**References**

- [Contentful Middleman Gem](https://github.com/contentful/contentful_middleman)
- [Middleman Dynamic Pages](https://middlemanapp.com/advanced/dynamic-pages/)
