---
title: "WTF is YAML?"
description: "YAML says that YAML is a human friendly data serialization standard for all programming languages. But WTF does that mean?"
image: /blog/210531/wtf--yaml.png
tags:
  - wtf
---

YAML is a recursive acronym that stands for _YAML Ain't Markup Language_.

[The official site](https://yaml.org/) explains it like this:

> YAML is a human friendly data serialization standard for all programming languages.

You can think of data serialization as the process of moving a structured set of data into usable objects within some programming language.

## A Quick Data Serialization Language Comparison

JSON and XML are two other serialization languages you may be familiar with. YAML is like JSON and XML, but touts itself as being more readable. Let's take a look at an example.

Suppose we want to represent a series of two blog posts within a single `posts` array. Each post will have a the following attributes:

- `title` (string)
- `tags` (an array of strings)
- `body` (string, formatted as markdown)

### XML

Using placeholder content, this array of posts might look something like the following when using XML:

```xml
<posts>
  <post>
    <title>Eiusmod in officia eiusmod</title>
    <tags>
      <tag>minim</tag>
      <tag>sunt</tag>
      <tag>mollit</tag>
    </tags>
    <body>Labore cillum eu incididunt ut et minim officia. Adipisicing ullamco culpa labore laborum est do amet est labore enim dolore. Aute incididunt enim enim eiusmod Lorem ea aliqua aute magna aute laboris ipsum cupidatat consectetur. Elit esse nostrud amet aute adipisicing ex labore.

Qui minim esse incididunt qui tempor sit fugiat officia. Dolor nisi consectetur voluptate Lorem qui id ea et. Ex anim adipisicing laborum duis excepteur est sit nisi voluptate mollit incididunt irure. Proident do aliquip in nulla. Voluptate in in pariatur aute sint reprehenderit excepteur exercitation labore pariatur incididunt dolor occaecat id. Cillum sit anim commodo ea consectetur ullamco sunt consequat laboris dolor. Qui cupidatat amet aliquip proident occaecat nisi voluptate.</body>
  </post>
  <post>
    <title>Amet ad id commodo</title>
    <tags>
      <tag>commodo</tag>
      <tag>mollit</tag>
      <tag>ullamco</tag>
    </tags>
    <body>Et enim est do ullamco ea ad veniam irure ex culpa. Excepteur enim quis eu laboris amet ad adipisicing deserunt laboris pariatur velit ipsum do. Enim amet sunt irure cillum minim exercitation irure. Veniam et tempor sint et tempor ullamco sunt quis et enim in consectetur nulla. Do et ad velit ad aute consectetur labore incididunt est aliqua aliquip amet ut deserunt.

Laborum amet elit culpa sint ad cupidatat elit duis minim in. Fugiat ipsum cupidatat id amet cillum commodo ullamco laborum. Anim nostrud deserunt ut proident eu laborum. Ad ut commodo tempor voluptate cupidatat sit non incididunt pariatur laboris ex labore ex. Laboris elit culpa ut pariatur id nostrud veniam sint aliquip tempor nisi cupidatat minim cupidatat. Est ea Lorem aliqua mollit exercitation commodo amet.</body>
  </post>
</posts>
```

The structure is obvious and rigid. It has the familiarity of HTML, but it's verbose. For example, noting that something is a tag takes more characters than the tag itself.

### JSON

This is what the same content would look like when being built with JSON:

```json
{
  "posts": [
    {
      "title": "Eiusmod in officia eiusmod",
      "tags": ["minim", "sunt", "mollit"],
      "body": "Labore cillum eu incididunt ut et minim officia. Adipisicing ullamco culpa labore laborum est do amet est labore enim dolore. Aute incididunt enim enim eiusmod Lorem ea aliqua aute magna aute laboris ipsum cupidatat consectetur. Elit esse nostrud amet aute adipisicing ex labore.\n\nQui minim esse incididunt qui tempor sit fugiat officia. Dolor nisi consectetur voluptate Lorem qui id ea et. Ex anim adipisicing laborum duis excepteur est sit nisi voluptate mollit incididunt irure. Proident do aliquip in nulla. Voluptate in in pariatur aute sint reprehenderit excepteur exercitation labore pariatur incididunt dolor occaecat id. Cillum sit anim commodo ea consectetur ullamco sunt consequat laboris dolor. Qui cupidatat amet aliquip proident occaecat nisi voluptate."
    },
    {
      "title": "Amet ad id commodo",
      "tags": ["commodo", "mollit", "ullamco"],
      "body": "Et enim est do ullamco ea ad veniam irure ex culpa. Excepteur enim quis eu laboris amet ad adipisicing deserunt laboris pariatur velit ipsum do. Enim amet sunt irure cillum minim exercitation irure. Veniam et tempor sint et tempor ullamco sunt quis et enim in consectetur nulla. Do et ad velit ad aute consectetur labore incididunt est aliqua aliquip amet ut deserunt.\n\nLaborum amet elit culpa sint ad cupidatat elit duis minim in. Fugiat ipsum cupidatat id amet cillum commodo ullamco laborum. Anim nostrud deserunt ut proident eu laborum. Ad ut commodo tempor voluptate cupidatat sit non incididunt pariatur laboris ex labore ex. Laboris elit culpa ut pariatur id nostrud veniam sint aliquip tempor nisi cupidatat minim cupidatat. Est ea Lorem aliqua mollit exercitation commodo amet."
    }
  ]
}
```

This is arguably more readable in some cases — `tags` are a concise and obvious array — and _much_ more difficult in others, like `body`, as JSON is not well-suited for multi-line strings.

### YAML

Now let's look at the same data in YAML:

```yaml
posts:
  - title: Eiusmod in officia eiusmod
    tags:
      - minim
      - sunt
      - mollit
    body: |-
      Labore cillum eu incididunt ut et minim officia. Adipisicing ullamco culpa
      labore laborum est do amet est labore enim dolore. Aute incididunt enim
      enim eiusmod Lorem ea aliqua aute magna aute laboris ipsum cupidatat
      consectetur. Elit esse nostrud amet aute adipisicing ex labore.

      Qui minim esse incididunt qui tempor sit fugiat officia. Dolor nisi
      consectetur voluptate Lorem qui id ea et. Ex anim adipisicing laborum duis
      excepteur est sit nisi voluptate mollit incididunt irure. Proident do
      aliquip in nulla. Voluptate in in pariatur aute sint reprehenderit
      excepteur exercitation labore pariatur incididunt dolor occaecat id.
      Cillum sit anim commodo ea consectetur ullamco sunt consequat laboris
      dolor. Qui cupidatat amet aliquip proident occaecat nisi voluptate.
  - title: Amet ad id commodo
    tags:
      - commodo
      - mollit
      - ullamco
    body: |-
      Et enim est do ullamco ea ad veniam irure ex culpa. Excepteur enim quis eu
      laboris amet ad adipisicing deserunt laboris pariatur velit ipsum do. Enim
      amet sunt irure cillum minim exercitation irure. Veniam et tempor sint et
      tempor ullamco sunt quis et enim in consectetur nulla. Do et ad velit ad
      aute consectetur labore incididunt est aliqua aliquip amet ut deserunt.

      Laborum amet elit culpa sint ad cupidatat elit duis minim in. Fugiat ipsum
      cupidatat id amet cillum commodo ullamco laborum. Anim nostrud deserunt ut
      proident eu laborum. Ad ut commodo tempor voluptate cupidatat sit non
      incididunt pariatur laboris ex labore ex. Laboris elit culpa ut pariatur
      id nostrud veniam sint aliquip tempor nisi cupidatat minim cupidatat. Est
      ea Lorem aliqua mollit exercitation commodo amet.
```

Look at that!

Notice the following characteristics of YAML:

- We don't (always) need quotation marks (in some cases, quotes are necessary).
- It's trivial to wrap text (the body is super readable).
- We only need a few funny characters to indicate the type of object we're working with, like how a single hyphen means we're working with an array.

## The Upside and Downside of YAML

YAML has caught on in many places because it is so readable compared to alternatives like JSON and XML. Like markdown, it's meant to be quick and easy to read and write.

I've found the most trouble with YAML when dealing with deeply-nested structures. Because YAML relies on indentation for structure, it can be easy to get lost when nesting several layers deep.

As complexity grows, the rigidity of languages like JSON and XML begin to look more favorable.

## When to Use YAML

It's for these reasons that I tend to favor YAML for:

- Objects that will be relatively flat.
- Files that will be edited manually. (When data structures are going to be manipulated programmatically, I'm more likely to use JSON.)

## Getting Started with YAML

YAML has interpreters in a number of different languages. With Ruby, [it's a built-in module](https://github.com/ruby/yaml), while there are several options ([like this one](https://github.com/nodeca/js-yaml)) when working with JavaScript. See the website for a nice long list of links.

And if you want to talk YAML or any other nerdy stuff, [I'm always up for a chat](https://twitter.com/seancdavis29).
