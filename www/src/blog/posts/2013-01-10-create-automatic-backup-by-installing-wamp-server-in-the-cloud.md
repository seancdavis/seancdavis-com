---
title: Create Automatic Backup by Installing WAMP Server in the Cloud
tags: []
description: Learn how to create backups for your code using a WAMP server.
image: /blog/default/default-yellow-01.png
---

**UPDATE: I've had trouble getting this solution to work exactly how I had envisioned. I've moved to the solution found [here](/blog/backup-your-code-and-develop-cross-platform-using-git/).**

What do you use your WAMP server for? I'm guessing whatever it is you're using it for, you don't want to lose your files should something happen to your computer. But you've already thought of that, right? So you're backing up your files somewhere.

By installing your WAMP server on a cloud storage solution with a desktop application (e.g. Google Drive), you create automatic backing up of all your development files (if you don't change the root directory) as well as your database.

It's pretty simple, really. Ensure you already have Google Drive, Dropbox, or whatever solution you use installed on your desktop. Then change [download WAMP server](http://www.wampserver.com/), and change the install directory to your cloud drive folder, as shown below.

You begin WAMP server by running `wampmanager.exe` in your install directory. Everything WAMP needs to run is located in this directory, including the localhost root directory (`wamp/www`).

## Develop on Multiple Machines

Theoretically this also provides the opportunity to develop using the same server (same database and dev files) on multiple computers (the username on both computers would have to be identical). Unfortunately, I have been unable to get this to work at this point, but I will update this post if I figure it out.

## What This Doesn't Do

Don't get me wrong, this isn't a developer's ideal solution. There is no version control. It's not networked and is therefore really intended for use by a single developer at a time. What it does is automatically sync your database and development files in the cloud, thus creating a simple, but automatic backup solution.
