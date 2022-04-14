---
title: "__NOTION TEST #2__"
description: Desc
tags: []
---

# Heading 1

This is a paragraph that has **bold text**. It also has _italicized text_ and even underlined text. It has `some_code` and a thing that is highlighted.

It gets trick when we try to combine things. For example, **_`this_code`_** is in **_italics and bold_**, just like that text.

## Heading 2

Occaecat et nostrud labore eiusmod in labore irure et eu ullamco sit minim consequat veniam. Enim est ullamco cillum anim do in magna tempor sit culpa duis et.

Sunt adipisicing magna nulla elit incididunt consectetur culpa incididunt ullamco ullamco anim occaecat irure mollit.

### Heading 3

Tempor nostrud ullamco Lorem ipsum tempor ipsum qui. Reprehenderit elit velit anim proident sit. Fugiat fugiat eiusmod pariatur sunt deserunt ex dolore duis non cillum sit esse. Enim proident ea in exercitation reprehenderit velit adipisicing nulla labore laboris eu nostrud Lorem.

Do nostrud est quis dolor ut consequat duis duis ut elit incididunt eu Lorem. Voluptate magna duis adipisicing veniam labore aute sint.

---

### Code Block

This has a highlighted line, but that is not supported just yet.

```js
function sayHello() {
  console.log("Hello");
}
```

### Bulleted List

- **_Excepteur est_** voluptate sit `dolor` id occaecat duis ad esse.
- Cillum dolore sunt commodo anim quis qui occaecat exercitation est in.
- Eiusmod sit dolor non Lorem ea ad culpa.

### Numbered List

1. **_Consectetur tempor_** mollit ea labore nostrud magna minim aute dolore Lorem Lorem sint tempor ut.
1. Voluptate **officia** `eu_sunt` aliqua ad duis labore officia esse esse eiusmod ad.
1. Tempor consectetur sunt est irure magna tempor nulla do dolore non.

### Quote

> Occaecat voluptate cupidatat consectetur labore elit. In tempor occaecat cupidatat fugiat aliquip irure duis veniam. Et minim minim commodo dolor. Id deserunt aliqua magna pariatur id est.

### Callout

{% callout type="note" %}
This is a callout containing more than one block. Subsequent blocks are children. This should be supported.

Laboris labore ad excepteur ex ullamco voluptate magna in commodo eu officia minim sit incididunt. Excepteur et anim consectetur quis consectetur ullamco amet minim Lorem irure id.

Quis sint sit tempor nostrud officia sint sit nisi elit incididunt duis magna nulla. Sunt esse velit id commodo voluptate ex dolore pariatur culpa laborum proident aliqua sint. Pariatur laborum consectetur nostrud enim.
{% endcallout %}

{% callout type="warning" %}
A `warning` callout is designated using the ⚠️ emoji.
{% endcallout %}

{% callout type="tip" %}
A `tip` callout uses the ⚡ emoji. At this point, the color is driven by the emoji, and only the ⚠️ emoji changes the color. This will appear grey on the site.
{% endcallout %}

{% callout type="idea" %}
`idea` is also supported.
{% endcallout %}

{% callout type="tl;dr" %}
This is a `tldr` callout. It’s not a great emoji, but it works.
{% endcallout %}

### Video

{% youtube_embed id="FFBMgrAa6bs" %}

### Image

External, from Unsplash, with a caption:

{% post_image alt="This is a caption for the image. Going to use this for the alt text.", src="/uploads/220414/photo-1649020696118-0dbd7f765076" %}

External, from Unsplash, no caption:

{% post_image alt="", src="/uploads/220414/photo-1648978055913-93b6634faa2c" %}

Uploaded directly to Notion:

{% post_image alt="", src="/uploads/220414/marek-piwnicki-leLMngQNwaU-unsplash.jpg" %}
