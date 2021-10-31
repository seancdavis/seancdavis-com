---
title: Learn Git in an Hour
tags:
  - git
description: Although I'm no expert, I've outlined the things I think you need
  to know to get started using Git.
image: /blog/default/default-pink-03.png
---

I'd say you know what you're getting into here, right? About an hour of learning for a lifetime of happiness? Well, allow me to preface this article with two thoughts.

First, I'm by no means a Git expert. I only feel I'm qualified to write this article because I know what it is, and I know how it works for me when I use it on a nearly daily basis. This article will get you up and running fast, but it won't make you an expert.

Second, I don't actually know how long this is going to take you. But it's not some dirty trick. I simply looked at it after I drafted it and made a guess. I'm thinking some of you will take hold in 30 minutes, but it may take others an hour or two.

## What is Git?

You're here because you've heard people talking about Git. They've probably said something like, "You need to learn git." Even with their generalities, these people are right. Whether you're a web designer, pumping out [CSS](/blog/wtf-is-css/) from Dreamweaver or Muse or whatever the heck Adobe's thought up recently; or whether you're a web developer; or, hey, even a writer (I haven't written this article yet, but it's my evil plan/); if you use some sort of [plain text](http://en.wikipedia.org/wiki/Plain_text "Plain Text") in what you do, and you care about version control (and you should/), you need to know Git.

So what is it? Git is another version control tool. But it's a clever one, and because it's so clever (among other reasons) it's become the standard among web designers and developers. To make a long story short, Git is unique in that when you *check out a file*, you check out the entire project (or *repository*). In other words, every "check out" is a *backup* of the entire repository. If that's confusing, don't worry, we'll demonstrate here shortly.

That's really all you need to know about Git off the bat. Yes, I'm asking you to take other's words on how great it is. If you're skeptical [read more here](http://git-scm.com/book/en/Getting-Started-About-Version-Control "About Git").

### The Book

This is a great segue into introducing [The Book](http://git-scm.com/book "Git Book"). Everything you've ever wanted to know about Git is in here (well, almost everything). Many of your Google searches after going through this tutorial will lead you back to pages in that book. That's because it's very well written. I'm hoping this tutorial take content they've written (better than I) and condensed it into something you can take in on one page in a few minutes.

### Command Line

One last thing. I'm going to make you work from the command line. Don't freak out, though. You're going to hate it at first, then after awhile, you'll wonder why you ever used a [GUI](http://en.wikipedia.org/wiki/Graphical_user_interface "GUI"). If you totally hate the command line and can't get used to it, there are [GUI clients for Git](http://git-scm.com/downloads/guis "GUI Clients for Git"), but they'll take away a lot of your control (if you care).

## Step 1: Installation & Setup

### Installation

Okay, this is the last time I'm pushing you to The Book. But if you don't have it installed, you need to start there, and they've already done the work. [Install Git](http://git-scm.com/book/en/Getting-Started-Installing-Git "Install Git").

### Setup

Now we need to configure a few things. Open Terminal on Mac or Git Bash on Windows, and type in the following commands (substituting your information):

    $ git config --global user.name "Sean C Davis"
    $ git config --global user.email eatallthe@sandwiches.com

_Note: the `--global` option sets this across your Git application, which means you only have to change it once. It's like changing a preference in any desktop application. If you ever need to reference your settings, you can run:_

    $ git config --list

_Note: the `$` in these code blocks is used to represent you working on the command line. You aren't actually typing `$` in when you run the code. Git is the program you are running from the command line, so most command line code you see here will start with `git`._

## Step 2: Create A Project

Now we're ready to use Git!

Whenever you begin a new project in which you want to use Git, you have to _create a new Git repository_. First, navigate to your project's [root directory](http://en.wikipedia.org/wiki/Root_directory "Root Directory") by using the `cd` command (which stands for *change directory*).

    $ cd path/to/your/project/root

For example, when I was working on the theme for this site, my code looked like this.

    $ cd ~/rocktree/dev/wp/the_polymath_lab/wp-content/themes/maple

_Note: The `~` means home directory. So, in my case, it's a substitute for `/Users/scdavis`, I could have just as easily typed `$ cd /Users/scdavis/rocktree/dev/...`_

_Cool trick: When you're navigating directories, you can hit Tab to autocomplete (if you have it enabled). So, for example, if I'm typing in `rocktree`, and I hit `r` then `Tab`, if there are no other folders in that directory that start with `r`, `rocktree` will autocomplete. If there is more than one possibility, you can hit Tab twice and your list of options will be printed, but you won't lose your code. Try it. To create a new Git repository, we simply run:_

    $ git init

## Step 3: Your First Commit

There are three stages to any Git project – *working*, _staging_, and *directory *(or *repository*). You don't have to have those memorized. But think of it like this, just to understand the basics: - You have an empty project and you haven't created any files (directory/repository) - You add a few files to your project. Before you're ready to commit those changes, you prepare the files to be committed (staging) - You commit your changes, and, more or less, add a version to your repository (commit) - You're now back to a clean repository and the process starts over

When I was learning Git, I was particularly confused by the *staging* step. What is it's purpose? Well, essentially you're creating a *snapshot* of your changes. That way, when you make a commit, you're actually committing that snapshot. And, in some cases, the staging and committing can actually happen with the same command. If it doesn't make sense yet, don't worry.

And what really is *committing*? It's pretty simple, really. You need to tell Git when to create snapshots in time. And you create these commits with messages that help you refer back should something go wrong. But you'll also learn about *tags* and *branches* that helps to make navigating a project with a hoard of commits a little simpler.

### Staging

To be able to stage your changes, you (obviously) would have had to make changes. Let's say you create a new file – `index.html`. Tip: if you want to stay on the command line for this task, you can do that via:

    $ touch index.html

Now your changes are ready to be staged. You can stage a file like this:

    $ git add [filepath]

In this case, that would be:

    $ git add index.html

Again, hitting Tab as you're typing the path will trigger autocomplete.

#### Staging Multiple Files

Let's say you've added (or changed) a bunch of files. You can stage everything you've changed like this:

    $ git add .

### Committing

Now you're ready to commit. As you might suspect, the command is `git commit`. But this time we are going to pass an argument to add a message to our commit.

    $ git commit -m "[commit message]"

Your message should be in quotation marks. Here we might say something like:

    $ git commit -m "create index"

#### Commit Message Tense

You may have noticed the message is in present tense. My tendency was always to write in past tense. After all, I was writing a message as to what I did. It made sense. But if you think about looking back on snapshots of a project, you'll want to know what that particular snapshot  **does to your project** , not what it did (that doesn't really make sense). And one of the main reasons you're writing these messages is to refer back if you need to reset your repository, so it makes sense.

#### When To Commit

Another couple difficult questions are *When do I commit? *or *How often should I commit?*

They are good and valid questions, but it's really up to you. My general recommendation is *don't commit just to commit*. Here are scenarios in which I typically commit my changes: - I'm switching gears – e.g. I just built a login form and now I'm going to refactor some code - I'm going to try something new – e.g. my login form works, but now I'm going to add validation to it, and I haven't done that before. *Note: depending how in-depth the "trying something new" portion is, this could be a place for a branch, but we'll talk about that later*. - I'm stopping for an extended period of time – e.g. I'm working on a project before my day job begin; even though I might not be at a perfect stopping point, I'll want to commit before going to work in case anything should "happen" throughout the day

#### Tip: Committing Existing Files

Remember I said you could sometimes stage and commit in the same step. Well, if you haven't created any new files, you can use:

    $ git commit -a -m "[commit message]"

And that skips the `git add .` step. Do note this won't commit new files.

## Step 4: Adding Remotes (Intro to GitHub) & Pushing

If you've heard about Git, you've probably heard of GitHub. [GitHub](http://github.com/ "GitHub") is a great site – it's a community for storing and sharing code. Perhaps the best advice I've received was, *put everything up on GitHub*. I transcribe that to you, while adding, *if it isn't proprietary*. GitHub is great because it's free to store public repositories, and it's really easy to share your code should you run into an issue and need some help. And honestly, if you're going to be a developer or designer, embrace the open source world and be prepared to share your work.

### Remote Servers

GitHub, in this case, will be our remote server. If you don't want to put your code on GitHub, I highly recommend adding a remote server that is backed up.

A remote server is a place you can *push* your code to. It's essentially a backup, or a *clone*, or your local repository.

### Adding A Remote

If you're following along, this would be a good time to [create a GitHub account](https://github.com/signup/free "Create GitHub Account"). For this to work, I'm also going to recommend we use the HTTPS method of communicating, which means you'll want to [go through these steps quickly](https://help.github.com/articles/set-up-git#password-caching "Git Password Caching").

Okay. Now you're ready. Create your new repository on GitHub ( **do not initialize it with a README file** ).

{% post_image
    alt="create github repo",
    src="/blog/130704/Screen-Shot-2013-07-04-at-3.28.33-PM-1024x625.png" %}

### Push Changes

GitHub will take you to the empty repo's home page where it suggests means to filling it with content. Since we already have our repository on the command line, we're going to do this:

    $ git remote add origin https://github.com/rocktreedesign/test.git
    $ git push -u origin master

Obviously, replace my location with your own.

From now on, you can push changes just using:

    $ git push

### Push vs. Commit

Yes, there's a very clear difference. When you *push*, you are sending all your (unpushed) *commits* to your remote server. That means while you are working on your local machine and committing changes, you aren't actually backing them up (so to speak).

#### When to Push

You don't necessarily need to push after every commit. At the end of your workday is usually fine, although if you're working in conjunction with someone else, it may make sense to push more often.

## Step 5: Tags

I've been using the word *versions* a lot here. You're probably thinking you've seen *versions *of code all over the place. Mac OS X 10.8.4, Internet Explorer 10, and so on. Well, yes, those are _snapshots_ in a way, and they are _versions_ of code. But, in Git-speak, these are *tags*. Tags are essentially *major commits*. When you want to wrap all your code up and ship it, or maybe just test it, you create a tag.

### Creating Tags

Create a tag like this:

    $ git tag -a v0.1 -m "my first tag"

The `-a` argument here lets you annotate your tag, while the `-m` still acts as an argument to attach a message.

### Pushing Tags

Pushing tags is a little different, as `git push` wont push tags. You can push a single tag like this:

    $ git push origin v0.1

Or you can push all your tags like this:

    $ git push --tags

### When to Tag

This is another good question, and there's no perfect answer. My best answer is if you're going to update the public, you should do so via a tag. Everything from a major release to bug fixes should have a tag associated with it.

### Tagging Nomenclature

This is another practice that is up to you to decide. I work like `v[major version].[minor version].[bug fix]`.

## Step 6: Cloning

So now your code's central repository is on GitHub. It's a neutral site for storing code, not working. But let's say you get a new computer, or maybe you need your code on two computers, or maybe you're collaborating on a project. You'll want the working directory repositories to live on every machine, not just one at a time. To do so, you should clone the repository from GitHub, like so:

    $ git clone [GitHub_path] [local_path]

So, a clone of the repo above, for me, might look like:

    $ git clone https://github.com/rocktreedesign/test.git ~/rocktree/dev/test

In this case, the remote server is already attached to your project, although the first time you push back to the server, you may have to use:

    $ git push origin master

## Step 7: Branching & Merging

Another common practice to keep code organized is called *branching*. Branching is just what you're thinking it is – a way for you to go off on your own branch and continue developing.

You know how we were using the line `git push origin master`? Well, `push` is the action, `origin` is the remote name, and `master` is the branch. By default, master is your main branch whenever creating a new repo.

### Why Branch?

The best example I've heard is around bug fixes. Let's say you released an app to the public about a year ago. Now it's time for a major UI upgrade, so you're going to start working on some new code. Except, you also need to support the app as it is today. Let's say one of your users finds a bug. If you stayed on the same branch, you'd have to fix the bug, and then you'd be pushing out a semi-completed updated UI version that, likely, would be filled with bugs.

With Git, you can create a new branch and work off that branch while supporting your current application.

Of course, there are many, many more uses. I usually branch whenever a project feels stable and I'm going to mess around. And if what I was doing works, when I'm done, I can merge back with the master branch (I'll show you how). Or, if it doesn't work, I can discard and move back to developing from the master branch.

### Creating A New Branch

You can create and checkout a branch at the same time using:

    $ git checkout -b [branch_name]

The system will tell you you've switched to a new branch. If you ever need to check the branch you're on, just run:

    $ git branch

and you'll see an asterisk by the branch you're on.

And to switch back to a branch at any time, just check out the branch:

    $ git checkout master

### Merging

Let's say you've switched to a new branch called `newUI`, and you're ready to merge it with the master branch. The process is really pretty simple. You just checkout the master branch and merge.

    $ git checkout master
    $ git merge newUI

You'll be prompted to enter a message that will coincide with an automatic commit for your merge action.

#### Conflict Resolution

It's possible your code from your two branches will contradict each other. Just listen to the command line response. It will tell you if you have conflicts and where they are. Fix them and then commit your changes and move on.

---

That was a whole heck of a lot of stuff. I hope it hasn't taken you longer than an hour. But even if it has, you've worked hard. Go grab yourself a drink and then get to work with Git.

Cheers!
