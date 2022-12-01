---
title: Using Unsplash API to Seed Placeholder Data
description: >-
  With its large collection of (free) professional imagery and easy-to-use
  developer API, Unsplash is a great tool for generating contextual placeholder
  images for your application.
tags:
  - javascript
  - testing
image: /posts/221201/using-unsplash-api-to-seed-placeholder-data-Yw2hycxM.png
seo:
  image: /posts/221201/using-unsplash-api-to-seed-placeholder-data-LyztSu7d--meta.png
---

There are [numerous sites](https://loremipsum.io/21-of-the-best-placeholder-image-generators/) that serve placeholder images. These are great when working in development and wanting to see how real images will behave in your application.

The challenge is that you almost always need to know the context of an image to use one of these services if it's going to look like it fits. Otherwise, you're just using random images that may not provide the proper _feel_ or _context_ for where they are being used.

For example, say you're building a pet adoption application. [Photos of Nicolas Cage](https://www.placecage.com/) wouldn't feel quite right. [Photos of kittens](https://placekitten.com/) would, but you might want this to feel more real and balanced, including other animals. And most of these services are not built to be dynamic.

Fortunately, [Unsplash](https://unsplash.com/) has an API that includes searching for images that can help you grab more contextual images.

## Dynamic Placeholder Images with Unsplash

Here's a simplified process for including dynamic placeholder images in your application.

### Unsplash API Setup

To use the [Unsplash API](https://unsplash.com/developers), you need to [create a developer account](https://unsplash.com/documentation#creating-a-developer-account) and register an application. The docs are well-written and make this an easy process.

### Install Dependencies

In this example, we'll use three dependencies:

- [unsplash-js](https://github.com/unsplash/unsplash-js) to search images via the Unsplash API
- [node-fetch](https://github.com/node-fetch/node-fetch) to make the API request
- [@faker-js/faker](https://github.com/faker-js/faker) (optional) as an example of using dummy data to generate images

Install the necessary dependencies:

```txt
npm install --save-dev unsplash-js node-fetch @faker-js/faker
```

### Fetch Images

Here's some basic code that will fetch images from Unsplash and write the response to a file called `photos.json` in your project. Note that it is using a `UNSPLASH_ACCESS_KEY` environment variable that contains the API key given to your Unsplash developer application.

```js
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { createApi } from "unsplash-js";
import { faker } from "@faker-js/faker";

global.fetch = fetch;

// Initiate Unsplash API
const unsplash = createApi({ accessKey: process.env.UNSPLASH_ACCESS_KEY });
// Search photos for a random animal (from Faker library)
const photos = await unsplash.search.getPhotos({ query: faker.animal.type() });
// Write response to a photos.json file
const filePath = path.join(process.cwd(), "photos.json");
fs.writeFileSync(filePath, JSON.stringify(photos, null, 2));
```

After running this code, inspect the `photos.json` file to see the shape of the response, assuming there were images that matched the random image.

### Manipulate Images as Needed

Unsplash uses [Imgix](https://imgix.com/) to serve its images, which means that you can manipulate them using their [rendering API](https://docs.imgix.com/apis/rendering).

You may search `insect` and be returned [this image](https://images.unsplash.com/photo-1533048324814-79b0a31982f1?ixid=Mnw0NzU3N3wwfDF8c2VhcmNofDN8fGluc2VjdHxlbnwwfHx8fDE2NjQ1MzU2NzA&ixlib=rb-1.2.1):

{% post_image alt="", src="/uploads/221201/insect-raw.jpeg" %}

But you can resize and manipulate this image as needed. For example, you can [crop it to a square](https://images.unsplash.com/photo-1533048324814-79b0a31982f1?auto=format,compress&w=600&h=600&fit=crop).

{% post_image alt="", src="/uploads/221201/insect-square.avif" %}

## Improving the Code

Once you implement the code to fit your application, here are some additional suggestions for building on this code:

- Catch when no results are returned. The code doesn't do this. If there are no image results returned, you may want to adjust the text and do another search.
- Because there are limitations with the API (see below), you may want to cache the results. You could do this by storing them in a database or a series of files from which you look up first before hitting the Unsplash API.

## Unsplash API Limitations

There are a couple limitations and restrictions with the code that you should be aware of when implementing this solution:

- You are limited to 50 requests per hour when your Unsplash application is in development mode. You could cache responses locally to help with this. Or you can apply for production, where your limits will increase significantly.
- To follow the usage agreement, you must keep the `ixid` parameter that is included with every URL. This is how Unsplash knows you are using the image and it is part of the guidelines. If you manipulate the URL parameters, be sure to keep `ixid` intact.
