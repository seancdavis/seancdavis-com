---
title: How I Scaled a Hybrid Application using the Jamstack
description: I built an app for a one-day event that did not account properly for scale and took a huge performance hit. This is how we overcame that performance struggle using the Jamstack.
tags:
  - fauna
  - gatsby
  - ionic
  - jamstack
  - middleman
  - netlify
---

A few years into my development career, a local non-profit approached me about building them a mobile application. I took the project on ([with an unconventional approach to pricing](/blog/alternative-approach-to-limited-budget-projects/)), and spent the next few months building a [hybrid applications](https://getgist.com/difference-between-native-vs-web-vs-hybrid-apps/). I chose to use the first version of [Ionic](https://ionicframework.com/), which was built exclusively on [AngularJS](https://angularjs.org/).

The application used data retrieved from an open-source [headless CMS](/blog/wtf-is-headless-cms/) that I created. It was my fourth version of my homegrown CMS, and I was excited to introduce a client to the product. (Some free sidebar advice: [_Build your own CMS. But also, don't._](/blog/build-cms-dont-build-cms/).) The app took the data from the CMS, via its API, transformed it, then rendered it in the app so local community members could consume.

That project had gone so well that it led to another, similar project for that same client. The second project was in support of a biennial event the organization planned to hold. It was to be a single-day event in which volunteers would check-in registered attendees at multiple sites. The attendees would explore these sites, using the app along the way. Therefore, the app needed to include registration, check-in (with auth for volunteers), along with a handful of similar features from the original application.

Because some of the data would be identical to what we had in the original app, we decided to build upon the same headless CMS. (One of the beauties of a headless CMS is that it can easily provide content for multiple applications.)

Well, the event happened. It was a huge success in terms of the number of attendees. It also wreaked havoc on the CMS. I had put in place all sorts of caching mechanisms, but they weren't nearly enough to handle the traffic from the event.

Two years later that event was to take place once again. Needless to say, the primary concern was addressing the performance issues of the first event. And this time, the org was expecting additional scale, up to 1,000% of the first year.

By the time planning for the second event commenced, I had been working with the headless CMS approach for years, and I was building most of my front-end sites and applications using [the Jamstack](/blog/wtf-is-jamstack/).

Knowing I needed to deliver the same features from the first version (registration, check-in, content), while being sensitive to performance at scale, I worked with the client to make three major changes. Together, these changes _drastically_ improved the performance of the application, and scaling wasn't an issue.

Let's dive into each of those changes ...

## 1. Third-Party Registration

The first change was to move registration to a third-party service. We chose [Eventbrite](https://www.eventbrite.com/) because it was free (tickets to the event were free) and they had an API that was easy to work with. The API was necessary because I wanted to be able to retrieve a list of registered attendees to make the check-in process simpler for the volunteers.

This was one less thing the app had to worry about. The downside was that it was no longer a one-stop shop for attendees registering on the day of the event, but we figured most were familiar enough with ordering tickets from services like Eventbrite that it wouldn't be an issue. (It wasn't.)

## 2. Check-in Application

Unfortunately, while Eventbrite supports a check-in process, it only does so for single-location events. Being that the same attendee may check into multiple locations during the event, we couldn't use Eventbrite for the check-in process.

So the next thing I did was to extract the check-in process from the app and move it to its own (web) application. Once again, it felt like we were breaking out a crucial element of the application. We were. But the attendees never saw it, only the volunteers. And the volunteers didn't care where the check-in process lived, they just had to be able to access it with their mobile device.

I built that feature using [GatsbyJS](https://www.gatsbyjs.org/), which pulled data from Eventbrite and provided a means for volunteers to check attendees in. We deployed that site to [Netlify](https://www.netlify.com/). (I realize plain old [React](https://reactjs.org/), or even [Next.js](https://nextjs.org/), would have been a more appropriate choice, but it was crunch-time and I was already familiar with Gatsby.)

That being said, it wasn't the front-end that was the problem. It was that we were posting registrations to the CMS, and they were getting in the way of attendees retrieving content from that same CMS during the event.

The check-in process existed simply for the client to have access to data _after_ the event, to be able to show their board how successful it was. Therefore, the data would only be read once (by me) and transformed into CSV. It didn't really matter where it lived.

Therefore, when checking someone in, the app would post data to [a serverless function](https://www.pubnub.com/blog/what-is-a-serverless-function/) that passed it on to a [Fauna](https://fauna.com/) database. I chose Fauna because it had a low barrier to entry (it's a hosted service), it came with a slick [SDK](https://en.wikipedia.org/wiki/Software_development_kit) that was (relatively) easy to work with, and it was likely to be free for the amount we'd use.

We also knew that we didn't want to bombard the Eventbrite API out of fear that we would hit our rate limit. So we abstracted the data retrieval process into the Gatsby build process (one benefit of using Gatsby). We made use of [cron-job.org](https://cron-job.org/en/), which provided a free means of forcing the Gatsby site to rebuild (and therefore, re-fetch) its data every few minutes.

(We only had this turned on during testing and for the day of the event. Netlify also wasn't counting build minutes in those days or at least wasn't surfacing them to the users, so this may not be a realistically inexpensive solution for the next event.)

## 3. Data Middle Layer

At first, I wanted to move all the consumable data into a new headless CMS, one that was built more for scale. But after thinking through that, we decided against it — it was going to be expensive for the client and a lot of work for me.

Instead, I came up with a different idea: I could build an API in between the custom CMS (the bottleneck) and the app. The application would then point to this _middleman_ API and not the original CMS.

This was beneficial because it effectively future-proofed the application. It changed the data source URL to one that we owned that was specific to the application. Therefore, _if_ we did want to swap out the underlying data layer in the future, we could, and we wouldn't have to push an update to the application.

The trick was that the data layer would have to be suuuuper speedy because it was going to get absolutely pounded for a few hours. After a lot of research on hosted GraphQL solutions and caching mechanisms, I had a thought — _what if I hosted a [**static API**](/blog/lets-talk-about-static-apis/) on Netlify?_

So that's exactly what I did. I spun up a Middleman site (literally, using the [_Middleman_ framework](https://middlemanapp.com/)). I know, Middleman isn't the cool kid in town, and I was already using Gatsby, but a) I was familiar with Middleman, b) Middleman makes it easy to build simple JSON pages, and c) so does [Jekyll](https://jekyllrb.com/), but I was having a power struggle with Jekyll in those days.

Then I pointed the hybrid application at the Middleman site (after applying a custom domain), which acted as an API, presenting data from the homegrown CMS. As an added bonus, the Middleman site handled all necessary data transformations, which _further_ sped up the application.

---

Together, these three changes made a world of difference. What began as a one-stop shop was now a set of disparate services. But that was okay, because it didn't harm the volunteers' or attendees' experience of the event. In fact, by improving performance, it _enhanced_ their experience.

When we started the second iteration of this app, we were using two tools — Ionic and Sapwood (the homegrown CMS). After breaking it out, all of these services and frameworks came together to create one comprehensive solution:

- [Ionic](https://ionicframework.com/)
- Sapwood (custom CMS)
- [Middleman](https://middlemanapp.com/)
- [Netlify](https://www.netlify.com/)
- [GatsbyJS](https://www.gatsbyjs.org/) ([React](https://reactjs.org/))
- Serverless Function (via Netlify, which uses [AWS Lambda](https://aws.amazon.com/lambda/))
- [FaunaDB](https://fauna.com/)
- [Eventbrite](https://www.eventbrite.com/)
- [cron-job.org](https://cron-job.org/)

Breaking the application into disparate services did make the architecture much more complex. While that's a downside to this approach, the increased performance and experience for the volunteers and attendees was the ultimate goal, and we achieved that.

The client was happy.

And in the end, that's all that matters.
