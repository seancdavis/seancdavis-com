---
title: "Big Oops: I Need a Little More Time"
description: Warren had to go ask his boss for more time because he wasn't going
  to meet a deadline. And it was all because of one line of code.
tags:
  - big-oops
image: /blog/default/default-orange-03.png
---

I have had the pleasure of working with a good friend of mine, [Warren Harrison](https://twitter.com/hungrymedia), on and off for the last several years. As he departs his current role, I mourn the loss of him with a story to embarrass him.

You see, several years ago, Warren was on contract for a large company. His job was to convert items from tape to digital record. It was going to be a manual process. One. At. A. Time. And it was going to take about a month to complete.

He was making good progress, but saw an opportunity to move a little faster. In that process, he found some advice online that gave him a command to run. He copied and pasted to his heart's delight. One command here, one there.

Then he got to the following command and kept on copying and pasting:

    $ rm -rf .

But after Warren ran this command, he wasn't able to run any more commands because ...

_You guessed it!_ All his work was gone.

Gone. Not in the trash. Not backed up elsewhere.

Gone.

His next move was to go to his boss at the time and deliver the news. I'm sure the conversation went something like, "So, you know how this was going to take three or four weeks? I'm going to need a little more time. As in, maybe three or four more weeks."

Fortunately for Warren, his boss sent him back to the job after getting more time from the client, but not before sneaking in what could only be called a _shit-eating grin_.

When I asked Warren what he took away from that experience, he said two things: **Never blindly copy and paste code** and **always be sure you know what the command you're running in your terminal is going to do.**

I think there's some great advice packed in there. In some cases, copying and pasting can be an excellent way to figure out how something is working. But, as we see here, it can also be destructive and costly. When you're writing code, it's important to _understand_ what the code you're writing is doing.

_Every line_ of code.
