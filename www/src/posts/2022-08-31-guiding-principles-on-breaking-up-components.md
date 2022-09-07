---
title: Guiding Principles on Breaking up Components
description: >-
  Use these 4 triggers to understand when to break child components out of a
  parent. And keep those child components clean following a set of 3
  organizational rules.
tags:
  - Components
  - Organization
image: /posts/220823/guiding-principles-on-breaking-up-components-VUuWmXVD.png
seo:
  image: >-
    /posts/220823/guiding-principles-on-breaking-up-components-zuDl0gQg--meta.png
---

Finding balance and maintaining organization when writing component code can is difficult. Code can get messy quickly.

One way I curb that messiness is by having a system to guide me on when to break up a component into individual components.

## 3 Ways to Break up Components

Before exploring _when_ to break up a component, it's helpful to consider _how_ a component can be broken up. It doesn't always mean putting a component in its own file.

I tend to break up components in one of three ways:

1. **Shared / Global:** When a component is used by numerous other components, I put it in a shared place with other components. That's usually something like `src/components`, but can vary depending on your framework and preferences.
1. **Embedded:** In some cases (as we'll see below), it makes sense to break up a component into its own function or space, but it's still simple enough that it can stay in the same file as the parent component. I generally do this when there is no functional logic needed in the component and when the parent component is also relatively simple. (I don't like large or complex components.)
1. **Nested:** When a child component needs functional code or when the parent component is large, I tend to put the component in its own file, but I keep that file nested in a directory with the parent component since it doesn't need to be shared by other components in the application.

## Determining when to Break up a Component

It is usually one of four scenarios that triggers my desire to break up a component.

### Component File Size is too Large

I don't like looking through a lot of code in one file. And component files get messy fast. They generally merge JavaScript and HTML code, and sometimes even CSS. I want to keep them as small as possible and be able to quickly understand what the component is doing.

When a file starts to feel too large, it's likely I missed opportunities to simplify it. And one technique is to break out child components.

But that's not always the case. Sometimes length is unavoidable, and breaking up a component _adds_ complexity. In other words, I use file length as a trigger to look for other scenarios here, but not to blindly break up the component.

### Single Responsibility Principle

I'm a firm believer that every _thing_ in code should do one thing and do that well. Functions should do some specific thing and that thing should be obvious based on the name of the function. Components should be the same way.

When a component starts doing more than one thing, it's time to break it up.

For example, imagine a _gallery_ component that shows a grid of cards on large screens but a carousel on small screens. I would build that as three (or more) components:

- Mobile carousel
- Desktop grid
- Parent controller that determines which gallery view to show based on screen size

### Conditionals and Loops

Loops are a great trigger for breaking up components. Usually, if you're looping over data and rendering some markup, that's often a great candidate for a component. Examples: cards in a grid, images in a gallery, tags on a post.

Conditionals are less obvious, but provide the benefit of using JavaScript to your advantage.

When the rendering of some code is conditional, you can clean up the code by abstracting it. Consider a hero component that has an optional image. (Example in JSX.)

```jsx
const Hero = (props) => {
  return (
    <div>
      ...
      {props.image && <img {...props.image} />}
    </div>
  );
};
```

If you make the image its own component, you have an easy escape hatch. And that simplifies the hero code.

```jsx
const Hero = (props) => {
  return (
    <div>
      ...
      <HeroImage {...props.image} />
    </div>
  );
};

const HeroImage = (props) => {
  if (!props) return null;
  return <img ... />;
};
```

Like many notes here, this isn't always the right move. If you use this too much, it'll make the code _more_ complex. In the example above, if making the hero component cleaner makes the code more complex, it's not a good move. The goal here is simplification and better readability.

### A _Feeling_

Lastly, sometimes code just _feels_ like it should be its own thing. This one is tough to objectively pinpoint. It takes shape with experience.

As an example, let's say you have a header component that has a user avatar image. That avatar isn't used anywhere else in the application, and the header code is otherwise clean. In this case, there's no _real_ or objective motivation to move it into its own component.

And yet, it may just _feel_ like it should be its own component. It's okay to operate on a feeling when the objective logic doesn't solve the problem. We're only human, after all.

---

Use these principles to guide your approach to breaking up components. Make your own system. Be consistent where you can, and fall back to your gut feeling when you can't.

And be patient. In time, these decisions won't be agonizing or even sit in the front of your brain. You'll just organize components in a thoughtful way without much consideration. It just takes a lot of practice and a lot of messy code to get there.
