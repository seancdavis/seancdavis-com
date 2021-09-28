---
title: "Dynamic Routing in Middleman"
description: "Take Middleman's dynamic pages feature, combine it with data modeling, and voila! We have dynamic routing in Middleman."
tags:
  - middleman
  - ruby
---

One of Middleman's most powerful features is [dynamic pages](https://middlemanapp.com/advanced/dynamic-pages/). While it can be cumbersome, it's so much more flexible than [Jekyll's collections feature](https://jekyllrb.com/docs/collections/) that it's one of the main reasons I use Middleman over Jekyll.

The examples on Middleman's website for dynamic pages is overly simplified:

```ruby
["tom", "dick", "harry"].each do |name|
  proxy "/about/#{name}/index.html", "/about/template.html", :locals => { :person_name => name }, :ignore => true
end
```

This says that we're going to write a file to the `/about` directory for each of the names—tom, dick, and harry—using the template at `/about/template.html` by passing the name to the template as the `person_name` variable.

## Passing Data as Objects

The above example was simple enough, but it what world do we only need a name on a bio page?

You probably want an image and a bio and maybe even a last name? You _could_ do something like this:

`config.rb` {.filename}

```ruby
[
  {
    name: 'Tom Jones',
    bio: "Donec sed odio dui.",
    img: "http://i.pravatar.cc/200"
  },
  {
    name: 'Dick Tickler',
    bio: "Donec sed odio dui.",
    img: "http://i.pravatar.cc/200"
  },
  {
    name: 'Harry Weiner',
    bio: "Donec sed odio dui.",
    img: "http://i.pravatar.cc/200"
  }
].each do |person|
  proxy "/about/#{person[:name].parameterize}/index.html", "/about/template.html", :locals => { :person => person }, :ignore => true
end
```

In this case we're looping through objects representing the three men with unfortunate names. And instead of passing just a string to the template, we're passing the entire object as the `person` variable.

So the template might look something like this:

`about/template.html` {.filename}

```erb
<%= image_tag person[:image] %>
<h1><%= person[:name] %></h1>
<%= simple_format person[:bio].html_safe %>
```

You can probably see this is unsustainable. The more people you add the more it's going to fill up your config file, which would really want to leave for configuration (and I'd argue this is data, not configuration).

Plus, there's no opportunity to make this actually dynamic (I'll explain that in a minute).

## Move Data to a Data File

To clean it up, we can move the content into the `data` directory using [Middleman's data files feature](https://middlemanapp.com/advanced/data-files/).

`data/people.yml` {.filename}

```yml
- name: "Tom Jones"
  bio: "Donec sed odio dui."
  img: "http://i.pravatar.cc/200"
- name: "Dick Tickler"
  bio: "Donec sed odio dui."
  img: "http://i.pravatar.cc/200"
- name: "Harry Weiner"
  bio: "Donec sed odio dui."
  img: "http://i.pravatar.cc/200"
```

Then you can clean up your proxies in the config file.

`config.rb` {.filename}

```ruby
data.people.each do |person|
  proxy "/about/#{person.name.parameterize}/index.html", "/about/template.html", :locals => { :person => person }, :ignore => true
end
```

_Tip: You may consider taking this a step further by defining the URL path as data on the person (by adding a `path` or `url` field to the data file for each person)._

Notice middleman loads the data into objects in which the properties are available as methods on the object. So intead of `person[:name]`, we can use `person.name` to get each person's name attribute.

That means the template would look like this:

`about/template.html` {.filename}

```erb
<%= image_tag person.image %>
<h1><%= person.name %></h1>
<%= simple_format person.bio.html_safe %>
```

The biggest benefit about moving the data into its own file is that you now have the opportunity to generate that file before the build is processed. That opens up the possibility to generate that file from dynamic content, i.e. [a headless CMS](https://en.wikipedia.org/wiki/Headless_CMS).

---

**References**

- [Middleman's Dynamic Pages](https://middlemanapp.com/advanced/dynamic-pages/)
- [Middleman's Data Files](https://middlemanapp.com/advanced/data-files/)
