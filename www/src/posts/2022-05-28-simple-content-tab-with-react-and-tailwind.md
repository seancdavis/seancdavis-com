---
title: Simple Content Tab with React and Tailwind
description: >-
  The foundation for a tab system begins with a state hook, triggered by clicks
  on tab elements. View the code snippet and use the playground to see it in
  action.
tags:
  - react
  - tailwind
image: /posts/220528/simple-content-tab-with-react-and-tailwind-RXzgXdjt.png
seo:
  image: /posts/220528/simple-content-tab-with-react-and-tailwind-EAmyWH_0--meta.png
---

Tabs are a common pattern on the web. We want to enable users to click on a button to reveal a different collection of content elsewhere on the screen.

Let’s see what it looks like to build this.

{% post_image alt="", src="/uploads/220528/simple-tab-react-tailwind.gif" %}

### Tab Content Structure

Given the simple example above, consider that the data representing the content we see on the screen could be structured as an array of two objects, each with a `label` property for the tab button label, and a `content` property for the text within the tab, when it is being shown on screen.

Here’s an example:

```jsx
const tabsData = [
  {
    label: "This Text",
    content:
      "Ut irure mollit nulla eiusmod excepteur laboris elit sit anim magna tempor excepteur labore nulla.",
  },
  {
    label: "That Text",
    content:
      "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
  },
];
```

### React Tab Component

Here’s the code for a simple tab component, with comments for context, along with some explanation below the code snippet.

Note that this assumes that `tabsData` is available this file. (For the demo, below, I just put them all in one file.)

```jsx
import { useState } from "react";

export function Tabs() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className="flex space-x-3 border-b">
        {/* Loop through tab data and render button for each. */}
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 border-b-4 transition-colors duration-300 ${
                idx === activeTabIndex
                  ? "border-teal-500"
                  : "border-transparent hover:border-gray-200"
              }`}
              // Change the active tab on click.
              onClick={() => setActiveTabIndex(idx)}>
              {tab.label}
            </button>
          );
        })}
      </div>
      {/* Show active tab content. */}
      <div className="py-4">
        <p>{tabsData[activeTabIndex].content}</p>
      </div>
    </div>
  );
}
```

There are three key ingredients that bring this together:

- First, we’re using a state (via [the ](https://reactjs.org/docs/hooks-state.html)[useState](https://reactjs.org/docs/hooks-state.html)[ hook](https://reactjs.org/docs/hooks-state.html)) to manage which tab is active. Rather than tracking the whole object, we use a simple, zero-based index. By default, the first tab is active (index is `0`).
- When clicking on a tab button, we run the state change function (`setActiveTabIndex`) and pass that tab’s index value, effectively setting the active tab.
- The button has a [bottom border Tailwind class](https://tailwindcss.com/docs/border-width), but the [border color](https://tailwindcss.com/docs/border-color) is set conditionally based on the active class.
- The content area doesn’t have to render both `content` properties and show/hide the appropriate one. Instead, we can use the active index to simply pull the correct content directly from the data object.

## Try It!

Here’s [a React project built with Vite](https://stackblitz.com/edit/react-tailwind-tabs?file=src/Tabs.jsx) that showcases the functionality. Take it for a spin. Make some changes, and then bring it into your project.

{% code_playground url="https://stackblitz.com/edit/react-tailwind-tabs?ctl=1&embed=1&file=src/Tabs.jsx&hideExplorer=1" %}

## Alternative Approaches

Building and maintaining this type of functionality can be a pain. It _feels_ like it should be a primitive, and yet it takes interactivity and state management just to get this simple example working.

If you feel like you’re being slowed down and want to explore other options, consider checking out libraries like [Radix UI](radix-ui.com/docs/primitives/components/tabs), where you are subject to a significant amount of style override, but can get the core functionality free and easy (or maybe just _a little_ easier).

## Adding Flair

This is (I hope) very clearly just a starting point that brings some basic functionality. You’ll likely want to add your own spin to bring this into your project.

I have another post that [takes this system and animates the underline](/posts/animated-sliding-tabs-with-react-and-tailwind/). It’s little ideas like this that will make your tab system unique and engaging for your readers.

Be cautious with the amount of flair you bring. Each element adds complexity to your code and is another thing you should test before publishing. But also don’t forget to have a little fun with it!
