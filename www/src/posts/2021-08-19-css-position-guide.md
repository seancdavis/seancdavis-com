---
title: Everything You Need to Know about CSS Position Property
description: "Dive deep into CSS position with real examples."
image: /posts/210818/pink--css-position.png
author: pratham
seo:
  image: /posts/210818/pink--css-position--meta.png
tags:
  - css
  - contributor:pratham
---

There are five values that you can pass into the [CSS](/posts/wtf-is-css/) `position` property:

- `static`
- `relative`
- `absolute`
- `fixed`
- `sticky`

Let's take a look at all of them.

## Understanding Document Flow

Before we do, it's important to understand _document flow_.

Elements are displayed on the screen as they written in the HTML document.

Consider the following piece of code:

```html
<h1>This is an H1</h1>

<p>This is a paragraph</p>

<h5>This is an H5</h5>

<div class="box"></div>
```

`<h1>`, `<p>`, `<h3>`, and `<div>` are displayed on the screen in exact order as they written in the HTML file.

{% post_image
    src="/posts/210818/css-position--01--document-flow.png",
    alt="CSS Document Flow" %}

Now we can move on to looking at each of the five options for the `position` property. We'll begin with `static`.

## CSS Position: Static

HTML elements are positioned static by default. An element with the `position: static;` is not positioned in any special way. It is always positioned according to the normal flow of the page, as shown in the screenshot above.

## CSS Position: Relative

Relative positioning keeps an element within the typical flow of the document. It makes the element's position _relative_ to its original position on the page, which can be adjusted using offset.

Relatively positioned elements are essentially the same as statically positioned elements. The difference is that relative positioning creates a new [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context), which allows you to set the `z-index` in a meaningful way.

### Offsetting a Relative Element

Consider that we have four boxes:

```html
<div class="box blue"></div>
<div class="box pink"></div>
<div class="box lime"></div>
<div class="box orange"></div>
```

And they each have the following rule:

```css
.box {
  height: 150px;
  margin: 0 auto;
  position: relative;
  width: 150px;
}
```

With some color added in, and within a centered container, that would give you something like this:

{% post_image
    src="/posts/210818/css-position--02--relative.png",
    alt="CSS Document Flow" %}

Now, let's offset the blue box:

```css
.blue {
  left: 150px;
}
```

As you can see blue box is shifted `150px` from left because I applied left offset after giving it relative positioning.

{% post_image
    src="/posts/210818/css-position--03--relative-offset.png",
    alt="CSS Document Flow" %}

We can shift the bottom box (orange) to the left by setting its `right` property:

```css
.orange {
  position: relative;
  right: 150px;
}
```

Notice here that document flow is as it is. So the relative position does not affect the document flow.

{% post_image
    src="/posts/210818/css-position--04-relative-offset-02.png",
    alt="CSS Document Flow" %}

## CSS Position: Absolute

When an element is positioned with the `absolute` value, it is removed from the normal document flow. After applying absolute position, the element will no longer be in the flow and no space is created for the element within the page's layout.

For example, if I apply absolute positioning to the blue box (after removing the offsets and centering), then the blue box will be out of the flow and hence no space will be allocated to it.

See the image below. The blue box is out of flow, and you now can't see the pink box because it is sitting behind the blue box.

{% post_image
    src="/posts/210818/css-position--05--absolute.png",
    alt="CSS Document Flow" %}

The absolute position of an element is relative to its closest ancestor, which has some position property.

Consider the code below:

```html
<div class="parent blue">
  <div class="child pink"></div>
</div>
```

With some styling applied:

```css
.parent {
  background-color: #2260bf;
  height: 400px;
  position: relative;
  width: 400px;
}

.child {
  background-color: #eea2bf;
  height: 150px;
  left: 40px;
  position: absolute;
  top: 40px;
  width: 150px;
}
```

That looks like this:

{% post_image
    src="/posts/210818/css-position--06-absolute-child.png",
    alt="CSS Document Flow" %}

Notice that I applied relative positioning to the parent (blue) and absolute positioning to the child (pink). Absolute position is relative to the closest ancestor's position. Because the child's parent (blue) has position set, the child (pink) is offset according to its parent's position.

### Adding a Second Ancestor

Let's understand it in little more detail. Consider this piece of code:

```html
<div class="grandparent blue">
  <div class="parent orange">
    <div class="child pink"></div>
  </div>
</div>
```

If we set the grandparent's (blue) position to `absolute`, leave the parent's (orange) as default, and set the child's (pink) to `relative`, the child's position will be relative to the grandparent, not the parent.

```css
.grandparent {
  background-color: #2260bf;
  height: 400px;
  position: relative;
  width: 400px;
}

.parent {
  background-color: #ff6b00;
  height: 250px;
  width: 250px;
}

.child {
  background-color: #eea2bf;
  bottom: 40px;
  height: 100px;
  right: 40px;
  position: absolute;
  width: 100px;
}
```

And because I set the `bottom` and `right` properties of the child, it is going to appear in the bottom right corner of the grandparent, _not the parent_.

{% post_image
    src="/posts/210818/css-position--07-absolute-grandchild.png",
    alt="CSS Document Flow" %}

## CSS Position: Fixed & Sticky

Elements with Fixed positioning are always relative to the viewport. That means they always stay in the same place even if the page is scrolled.

On the other hand, elements with sticky positions are a mixture of the relative and fixed positions. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (just like fixed positioning).

This can be seen in action in [this CodePen example](https://codepen.io/prathkum/pen/bGgWJoN).

{% post_image
    src="/posts/210818/css-position-08-fixed-v-sticky.gif",
    alt="CSS Document Flow" %}

Notice that the yellow element stays within the normal flow of the document until it hits the top of the viewport. Then it _sticks_ to the top.

The fixed element (red) is always fixed to its position, and falls outside the document flow.

---

I think that's pretty much it. Did I forget to add something? Feel free to comment on [the original thread](https://twitter.com/Prathkum/status/1378618845225746433). And [follow me on Twitter](https://twitter.com/Prathkum) for more posts like this one.

Thanks for reading ❤️
