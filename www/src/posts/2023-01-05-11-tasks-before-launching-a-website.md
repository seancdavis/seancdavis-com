---
title: 11 Tasks Before Launching a Website
description: >-
  A punchlist of the last few tasks for developers to consider before launching
  a new website.
tags:
  - developer-advice
  - testing
  - seo
image: /posts/230105/11-tasks-before-launching-a-website-paDVSjTP.png
seo:
  image: /posts/230105/11-tasks-before-launching-a-website-iCAuU32F--meta.png
---

When launching a website, there are several tasks that need to be completed to ensure that the website is functioning properly and [positioned to achieve its goals](/posts/six-traits-website-achieving-goals/).

This list includes performance and content checks, analytics and third-party tool setups, a sitemap and other SEO-related tasks, and more. With this collection of tasks, you can make sure your website is ready for launch.

{% callout type="note" %}
While all of these are one-time tasks necessary prior to launching your site, some may be set up as recurring checks to complete regularly throughout the life of your site. For a related list, see [10 Useful Tasks to Easily Automate During Builds](/posts/10-useful-tasks-to-easily-automate-during-builds/).
{% endcallout %}

## 1. Performance

For most websites, the primary goal is to get users to your content as quickly as possible. A slow website can lead to frustrated users, and even lost customers. Page speed performance tests can help identify areas of improvement and ensure the best possible user experience.

To test the page speed performance of a website, use a tool such as [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/), [Pingdom](https://tools.pingdom.com/), or [GTmetrix](https://gtmetrix.com/). These tools will generate a report that can be used to identify areas of improvement and ensure a fast, smooth user experience.

## 2. Misspelled words

Misspelling words can lead to confusion and frustration for your website visitors. Poor spelling can also lead to a decrease in search engine rankings, as search engines take spelling into consideration when determining the quality of a website. Spelling mistakes can also create a negative impression of your website, its writers, and your overall business, all of which may make visitors less likely to return in the future.

But typos happen. I often come across typos in writing I've published. (Hopefully there aren't any in here!)

It is important to take the time to check for misspelled words on your website before launching it. This can be done manually or with the help of automated spelling checkers, such as [Grammarly](https://app.grammarly.com/). You can also use [a code spell checker](https://youtu.be/Trhj3d9TK5k) when your content is stored in files in your repository, or when it is tightly-coupled with your code.

## 3. Broken Links

Broken links can create a poor user experience and lead to an increase in bounce rate. If a user clicks on a link that does not function, it can be frustrating and can cause the user to leave the website. Search engines take into account the number of broken links on a website when determining its quality — another reason for checking before launching.

You can use a tool such as [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/), [LinkTiger](https://linktiger.com/), or [DeadLinkChecker](https://www.deadlinkchecker.com/) to check for broken links. These tools will scan your website for broken links and create a report that can be used to identify and fix any broken links.

Or, if your website is built with pre-rendered content (i.e. a static site), there are a number of open-source tools that can be run at build time to ensure you don't publish a new version of your site with broken links.

## 4. Third-Party Analytics Tools

Analytics tools can provide valuable insights into how users interact with a website, allowing website owners to make informed decisions about their content and design. These tools can track user behavior, such as which pages they visit, how long they stay on a page, and which links they click.

This information can be used to optimize the website for a better user experience, as well as to improve search engine rankings. Additionally, analytics tools can be used to track conversions, helping website owners understand which marketing efforts are most effective.

Some popular analytics tools used by websites include [Google Analytics](https://marketingplatform.google.com/about/analytics/), [Kissmetrics](https://www.kissmetrics.com/), and [Mixpanel](https://mixpanel.com/). All have their own instructions on the code needed to integrate with this services.

{% callout type="note" %}
Be sure to run (or _re-run_) your page speed performance check after adding any third-party tools.
{% endcallout %}

## 5. Sitemap

A sitemap is a file that contains a list of all the pages and content of a website. They make it easy for search engines to create an accurate representation of the structure of your site. And because search engines will track your content through your sitemap, you can also quickly tell a search engine when a page has changed or when a new page is available.

You can automatically generate a sitemap using a tool such as [XML-Sitemaps.com](https://www.xml-sitemaps.com/), which you can then submit to Google and Bing.

You can also write your own script or take advantage of third-party tools that will deliver sitemap content dynamically on request time or, for pre-rendered sites, at build time.

## 6. Robots.txt

The `robots.txt` file is a text file that is used to let search engines and other web robots know which areas of your website should not be crawled or indexed. It is also used to inform search engines of any changes made to the website, so that the search engine can keep its index up to date.

The `robots.txt` file is placed in the root directory of your website, and is used to give instructions to search engine crawlers. These instructions can include allowing or disallowing certain pages, files, or directories from being crawled or indexed. For example, you can use the `robots.txt` file to disallow certain pages from being indexed, such as pages that contain sensitive information or that are still under development.

## 7. SEO Meta Tags

Meta tags are an important part of optimizing a website for search engines. They provide information to search engines about the content of a website and can help improve its ranking in search engine results pages.

Meta tags are also how social media sites and messaging services show visually-rich previews of your content when sharing a link to your site.

There are _a lot_ of SEO tags that can be added, though most are not essential for the typical website. Take a look at articles [like this](https://www.searchenginejournal.com/important-tags-seo/156440/), which do a good job of summarizing the essential tags.

## 8. Placeholder Text

Placeholder text is often used during the development of a website to provide a visual representation of the content that will eventually be on the page. This helps designers and developers get an idea of the layout and flow of the page, as well as how the content will look when it is finished.

It may be a great tool for designers and developers, but it's also very easy to forget about it and see it sneak into your production site. Carefully comb through your entire site to remove placeholder text.

And be sure to check super sneaky locations like social sharing links and email addresses — global values that appear small on the page and are easy to overlook.

## 9. Remove Comments and TODO Notes

We all want our code to be nice and clean. But removing "TODO" types of comments isn't about cleanliness. It's about tracking and tackling necessary tasks.

You don't have to wait for your code to be 100% perfect before launching your site. But you should know where the issues are, and you should be tracking those issues outside the code in some project management system. (I like using GitHub Issues.)

This provides better visibility into the tasks needed to clean up the code. Then you (and your stakeholders) can make informed decisions about where to spend your time following a launch.

## 10. Accessibility

Website accessibility is important because it allows users with disabilities to access and use a website. By making a website accessible, it can be more inclusive to all users and provide a better user experience.

Accessibility can be improved by following web accessibility standards, such as those set by the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG21/). These guidelines provide specific criteria that must be met in order for a website to be considered accessible.

Additionally, accessibility can be improved by using tools such as screen readers, which read the content of a website out loud for users who are visually impaired or blind. By making a website accessible, it can be more inclusive to all users and provide a better user experience.

## 11. Format Code

Formatting code is an important part of website development, as it helps ensure that the code is efficient, maintainable, and easy to understand. It can also help to develop consistency when the code for a site is being written by multiple developers with differing styles.

To help with auto-formatting code, there are a number of tools that can be used. For example, [Prettier](https://prettier.io/) is a code formatter that automatically formats and reformats code to adhere to certain style guidelines. Additionally, [ESLint](https://eslint.org/) is a linting tool that helps identify errors and potential problems in code, and [Stylelint](https://stylelint.io/) is a tool that lints stylesheets to ensure they adhere to style guidelines.

---

Thanks for reading! Now don't forget to convert some of these tasks into [recurrent checks you can make throughout the life of your site](/posts/10-useful-tasks-to-easily-automate-during-builds/).
