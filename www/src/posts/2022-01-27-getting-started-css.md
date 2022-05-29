---
title: "Complete Guide to Getting Started with CSS"
description: A handful of tips and tricks on getting started with CSS to make your website visually interesting.
image: /posts/220127/220127--css-resources-guide.png
tags:
  - css
  - contributor:pratham
author: pratham
---

CSS is an amazing and unique language that servers a great purpose. We can make our websites visually interesting using [CSS](/posts/wtf-is-css/). CSS describes the presentation of web pages, including typography, layouts, colors, and more.

## A Web Without CSS

Web development without CSS wouldn’t be the same. Consider a page like this:

{% post_image
    src="/posts/220127/site-with-css.jpg",
    alt="Website with CSS" %}

Now remove the CSS and here’s what we have:

{% post_image
    src="/posts/220127/site-without-css.jpg",
    alt="Website without CSS" %}

## Begin with Colors

The main characteristic of a great website is its color scheme. Forget about everything else and learn about background and color properties initially. The colors are something from which users interact first whenever they visit your website.

There are a lot of great color palettes out there, and various tools which you can use to generate pleasant color schemes. For example, [Adobe has a tool](https://color.adobe.com/create/color-accessibility) for generating accessible color palettes.

{% post_image
    src="/posts/220127/adobe-color.jpg",
    alt="Adobe color site" %}

## Background Property

Don't think that background property as being just for setting a solid color. `background` is a shorthand property for `background-image`, `background-position`, and more.

## The Box Model

Box model is one of the most important concepts of CSS, and it's not so difficult to learn. The box model covers height, width, padding, border, and margin.

{% post_image
    src="/posts/220127/css-box-model.jpg",
    alt="CSS box model" %}

### Height & Width

The `height` and `width` properties are used to set fixed height and width to the element. There’s also `max-width`, `min-width`, `max-height`, and `min-height` to control height and width boundaries.

### Padding & Margin

Proper and uniform separation of elements is something that can give your webpage an appealing look. The `margin` and `padding` properties can do this for you.

Padding and margin have two different purposes. Padding is for spacing within elements. Margin is for spacing between elements. However, there's a lot more to it! Read [the definitive guide to padding and margin](https://uxengineer.com/padding-vs-margin/) for a great overview and introduction.

### Border

`border` properties apply styles between the `padding` and `margin` styles. You can control the color, width, and style of borders, which can help give your elements a pleasant look.

## Typography

Typography is an essential facet of web page. A good font can make your site visually appealing by establishing a strong visual hierarchy, providing a graphic balance to the website, and setting the site’s overall tone.

### Font Classifications

There are five basic classifications of fonts:

1. serif
2. sans serif
3. script
4. monospaced
5. display

Give [this article](https://www.fonts.com/content/learning/fontology/level-1/type-anatomy/type-classifications) a read for more detailed explanation.

{% post_image
    src="/posts/220127/font-styles.jpg",
    alt="CSS font classifications" %}

### Font Libraries & Properties

The easiest way to get started is by browsing [Google’s free font library](https://fonts.google.com/).

When applying fonts to your website, there are three CSS properties to focus on: `font-family`, `font-weight`, and `font-size`.

## Positioning

CSS starts to get a little tricky when we get into positioning.

{% post_image
    src="/posts/220127/css-positioning.jpg",
    alt="CSS positioning" %}

I have already written a detailed thread on CSS positioning. If you're interested check it out.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Positioning in CSS allows you to display your element wherever you want on the screen<br><br>But when I was learning it, I found it little bit confusing😅<br><br>So in this thread I&#39;ll try to explain it in easiest manner with practical implementation. Let&#39;s start<br><br>THREAD🧵👇 <a href="https://t.co/M3UnegtQUk">pic.twitter.com/M3UnegtQUk</a></p>&mdash; Pratham (@Prathkum) <a href="https://twitter.com/Prathkum/status/1355830282247692288?ref_src=twsrc%5Etfw">January 31, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Layouts

The previous sections have provided a brief intro into styling your website. But you also have to be concerned with building a layout system for each page. This is most often accomplished today with flexbox and grid. Grid is little bit tough to master, but flex isn't as bad.

There is [a great guide to flexbox on CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). And for more information on CSS grid, check out [this thread](https://twitter.com/Prathkum/status/1374652212928987137).

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">A complete beginner&#39;s guide to CSS Grid layout 👇🏻 <br><br>Thread🧵 <a href="https://t.co/e0EvyZWTHS">pic.twitter.com/e0EvyZWTHS</a></p>&mdash; Pratham (@Prathkum) <a href="https://twitter.com/Prathkum/status/1374652212928987137?ref_src=twsrc%5Etfw">March 24, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### Responsive Layouts

Layouts are where responsive web design comes into play. Don't skip learning this concept! There are millions of devices on which your website is viewed. Styling responsively ensures that your site will look good on any device.

There are few quick points you need to remember while writing CSS code.

- Use meta viewport element
- Don't use large fixed width
- Try to use Layouts
- Use `box-sizing: border-box`
- Media Queries are your savior
- Use `auto` in media
- Use frameworks if possible

I suggest that you add responsive styles while writing CSS, rather than handling responsiveness in the end. [Here’s a thread I wrote](https://twitter.com/prathkum/status/1380834198039171073) to help with responsive web design.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Complete guide to Responsive Web Design<br><br>🧵👇🏻 <a href="https://t.co/u3nDi06ki4">pic.twitter.com/u3nDi06ki4</a></p>&mdash; Pratham (@Prathkum) <a href="https://twitter.com/Prathkum/status/1380834198039171073?ref_src=twsrc%5Etfw">April 10, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

---

I think that's pretty much it in order to give you a quick overview of CSS. If you have any doubts, feel free to drop a comment [in the Twitter thread](https://twitter.com/Prathkum/status/1377871173875335170). If you liked this, a retweet means a lot! ❤️
