---
title: Styling Placeholders for Select Fields
description: >-
  A (limited) CSS-only approach for styling placeholders, along with a way to
  work around the limitations with a custom JS-based solution.
tags:
  - html
  - css
  - javascript
image: /posts/220616/styling-placeholders-for-select-fields-3dcGveU1.png
seo:
  image: /posts/220616/styling-placeholders-for-select-fields-R0CPwP6c--meta.png
---

I’ve been working through my first freelance website in years and totally forgot that it’s the little things that can sometimes take up so much time. Although there were many of those throughout this project, one pesky issue that I ran into was in styling a placeholder for a `<select>` form field to look and behave like inputs and textareas.

### Solution Disclaimer

Before I get into the solutions, I should specify that I have two caveats here:

1. I wanted to use native controls and styles as much as possible. I understand there’s more flexibility when completely resetting all native browser styles, but I’m scarred from working with form resets throughout my career.
1. There may very well be a better solution. I sunk _hours_ into this, and this is where I ended up. Doesn’t mean there isn’t something better out there, but I hope this can help you.

## The CSS-Only Solution

After _a lot_ of searching, I found a CSS-only solution. It looks like this:

```html
<select required>
  <option value="" disabled selected>Placeholder value ...</option>
  <option value="A">Option A</option>
  <option value="B">Option B</option>
</select>

<style>
  select:required:invalid {
    color: #888;
  }

  select {
    color: #000;
  }
</style>
```

### Select Placeholder CSS-Only Demo

Here it is in action:

{% codepen
    user="seancdavis",
    id="QWQxGNM",
    title="Native Default Placeholder" %}

### Issues with CSS-Only

The output looks _okay_ at first glance, but I found some issues with it:

- I could only get these styles to work when the field was required, and therefore it’s not a universal solution.
- Once you choose another option you can unselect the option. Although that would be making the field invalid, it felt necessary to maintain parity with how the other fields behave.

## Select Placeholders with a Bit of JavaScript

Eventually, I decided to ditch the native CSS route and sprinkle in a bit of JavaScript. Here’s where I ended up:

```html
<div class="wrapper">
  <select required onchange="selectChanged(this)">
    <option value=""></option>
    <option value="A">Option A</option>
    <option value="B">Option B</option>
  </select>
  <div class="placeholder">Placeholder value ...</div>
</div>

<style>
  .wrapper {
    position: relative;
  }

  select {
    padding: 16px;
    min-width: 200px;
    border-color: #666;
    position: relative;
    z-index: 1;
    background-color: transparent;
  }

  .placeholder {
    position: absolute;
    top: 0;
    left: 0;
    padding: 16px;
    color: #999;
    z-index: 0;
  }
</style>

<script>
  function selectChanged(select) {
    const placeholder = document.getElementsByClassName("placeholder")[0];
    if (select.value && select.value.length > 0) {
      placeholder.style.display = "none";
    } else {
      placeholder.style.display = "block";
    }
  }
</script>
```

What I’m doing here is placing an absolutely-positioned element behind the select and using a transparent background on the select element.

When an option is chosen (when the select element has a value), the placeholder is hidden (using JS). Otherwise, it’s shown through the transparent select element.

### Risks with the JS Approach

Although it felt clever to put this together, there are some risks:

- Styling is trickier if trying to do much more than the basics (what you see here).
- This doesn’t account for the width of the placeholder. Some extra work would be needed to wrap or elegantly cut off the placeholder text if it began to flow into the dropdown trigger.

### Select Placeholder with JavaScript Demo

Here it is in action:

{% codepen
    user="seancdavis",
    id="RwQJoww",
    title="Faking a Select Placeholder" %}
