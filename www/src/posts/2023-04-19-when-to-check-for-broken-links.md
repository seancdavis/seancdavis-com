---
title: When to Check for Broken Links
description: >-
  Explore various methods for checking for broken links and what to consider
  when applying the approaches to your site.
tags:
  - testing
tweet: >-
  When should I check for broken links? 


  This is another “it depends” question. But I’ve been thinking about this a lot
  lately, and so I wrote out what I’ve explored.
image: /posts/230419/when-to-check-for-broken-links-jRs6Z_s5.png
seo:
  image: /posts/230419/when-to-check-for-broken-links-s2Cn3BYM--meta.png
---

Broken links can be a major issue for websites, causing frustration for users and potentially harming SEO rankings.

## Methods for Link Checking

There are a number of different ways to check for broken links, and each has its benefits and challenges. Let's look at two common approaches.

### Routine Check Against Production

One approach is to regularly check for broken links _against your live production site_. Some SEO services will do this automatically for you, or you can write your own script. Events can also be set up to trigger the check on an as-needed basis.

Pros:

- Easy to set up and run.
- Provides an accurate reflection of the current state of your site.

Cons:

- Can be time-consuming to run, especially for large sites.
- May not catch issues that only arise during specific events or promotions.
- Won't catch issues immediately following newly-published or recently-updated content.

### Running During Build for Pre-Rendered Sites

For pre-rendered sites, it can be useful to check for broken links during the build process. However, this can be tricky to set up, especially for server-rendered sites like Next.js.

Pros:

- Can catch issues before they go live.
- Can be fully integrated into the build process.

Cons:

- May require a separate build process and server boot-up.
- Slows down the build process.
- Need to ensure it's running the same way it would in production.
- Checking for links in content files or in the source may not be sufficient; the actual response from the server needs to be examined.

## Reporting and Acting on Link Results

When it comes to reporting on broken link tests, there are several factors to consider to ensure that the report is actionable and acted upon quickly.

### Report Frequency

How often you check your site should be a byproduct of how often the content is updated. You should check for broken links _more freq_u_ently_ than you publish new content.

If you're usually publishing new content weekly, run a daily check on your site to check what was published yesterday.

Or maybe you don't have a blog, but you might change a page monthly. Then run a weekly check.

### Choosing the Right Information

The report should include a list of broken links, along with the URL where the link was found and the HTTP status code returned.

### Prioritize Action Based on Impact

It's important to prioritize the broken links based on their impact on the user experience and SEO. For example, highly visibility pages should be fixed immediately.

### Avoiding the "Noise"

If the report is too noisy, it will get ignored, even if it has useful information. It should stay out of the way until it's important to act. And when that time comes, provide information to make it clear what needs to be done, where it should be done, and who is going to do it.

For example, I use a simple Slack message for regular checks. But if I am checking during a build, I will fail the build with broken links, making it more obvious and immediately actionable.

## The Right Approach for Checking Links

(You know what I'm going to say, right?)

_It depends._

The right answer is the one that works best for you. I take both approaches in different ways at different times for different sites. For some sites, I test the entire site at build time. Other sites I only check routinely. And I use a combination in more complex scenarios.

### Factors for Consideration

There are a number of factors to consider:

- Number of pages
- How pages are rendered/delivered
- Frequency of content changes

There is further nuance from page to page. You may not want to test every page in the same way. Maybe critical pages are tested during the build, but you also run a weekly check on the entire site.

### Considering External Links

One last consideration I'll add is how you handle external links. There is always a risk when linking externally that the link will break. And yet, checking for external links may drastically slow the test down because you don't have control over the response time of those links.

I absolutely recommend testing external links but defer it to some routine check, and don't include it in your more frequent or mission-critical checks (unless it is mission critical).
