---
title: "A Guide to Setting up a New Mac Developer Machine"
description: "It's time to tear into that shiny new Mac and write some code! Here's how I spend my first couple hours with a new machine."
image: /posts/210216/blue--laptop.png
tags:
  - productivity
---

Getting a new Mac is such an exciting process! Sometimes I leave the box sitting on my table for a few days, just to let the anticipation of unboxing it build (is that weird?).

<blockquote class="twitter-tweet">
  <p lang="en" dir="ltr">
    I usually let the just-arrived, unopened Mac box sit on the kitchen table for a few days. Just to let the anticipation of unboxing it build.<br><br>Is that weird?
  </p>
  <p>
    &mdash; Sean C Davis (@seancdavis29)
  </p>
  <p>
    <a href="https://twitter.com/seancdavis29/status/1359872413228482562?ref_src=twsrc%5Etfw">
      February 11, 2021
    </a>
  </p>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

When I finally boot up the machine for the first time, it's still several hours before I'm actually writing code. That's because I really like using the new computer as an opportunity to clean some of the junk I don't need and haven't touched in awhile. I start fresh every time.

But I inevitably forget to do something necessary during the process — like remembering how to get messages from my phone to show up in the Messages app — and I end up frustrated and feeling like I'm wasting time.

I get a new machine every two or three years, which feels like not frequently enough to script this process. But it's enough to want a reference to what I've done in the past.

That's the purpose of this guide. This is a reference largely to serve future me in helping me setup a new Mac developer machine. But I hope you can get something out of it, too!

## Global Preferences

1. **Setup Apple ID.** Adding an Apple ID and connecting it to the computer's primary user is prompted automatically when booting up the machine for the first time.

2. **Remove unused Apple services.** I use Apple apps sparingly. I tend to find those from other developers more beneficial to my workflow. Therefore, I go into _System Preferences_ > _Apple ID_ and disable the following services:

   - Photos
   - Mail
   - Contacts
   - Calendar
   - Siri
   - Keychain
   - News
   - Stocks
   - Home

   That means the only ones that should be enabled are:

   - iCloud Drive
   - Reminders
   - Safari
   - Notes
   - Find My Mac

{% post_image
    src="/posts/210216/sysprefs--apple-id-01.png",
    alt="System Preferences - Apple ID #1",
    classes="my-0",
    flatten=true %}

{% post_image
    src="/posts/210216/sysprefs--apple-id-02.png",
    alt="System Preferences - Apple ID #2",
    classes="my-0",
    flatten=true %}

3. **Remove all applications from dock.** I like a clean dock. Plus, I don't use the majority of those applications. You can remove them by dragging the icon from the dock to the main desktop background. A little _Remove_ tooltip should appear. Let go of the mouse and _Poof!_ it's gone.

{% post_image
    src="/posts/210216/remove-dock-item.gif",
    alt="Remove Application from Dock" %}

4. **Delete unwanted Apple apps.** At the time of writing this, the only ones I've been able to delete are Garage Band and iMovie.

5. **Adjust dock settings.** I like to adjust for the dock to not be visible unless I hover over the bottom of the screen. And the magnification animation is ... well it's fun. These settings are in _System Preferences_ > _Dock & Menu Bar_.

{% post_image
    src="/posts/210216/sysprefs--dock.png",
    alt="System Preferences - Dock & Menu",
    classes="my-0",
    flatten=true %}

6. (Touch Bar machines only) [**Remove Siri from the touch bar**](https://support.apple.com/en-om/guide/mac-help/mchl5a63b060/11.0/mac/11.0). It's possible that nothing in this world makes me angrier than unintentionally prompting Siri.

7. **Remove magical spelling things.** I like to know when I've spelled something wrong, but I do not like when words or characters are changed automatically. So I go to _System Preferences_ > _Keyboard_ > _Text_ tab and remove all smart options. I also do this as necessary in other text-editing apps, like Notes and Bear.

{% post_image
    src="/posts/210216/sysprefs--keyboard.png",
    alt="System Preferences - Keyboard",
    classes="my-0",
    flatten=true %}

## Messages App & Contacts

On my most recent machine I chose to have messages sync to iCloud. This enables previous messages to appear on a new machine, rather than starting from scratch.

I also don't use Apple Contacts. I prefer to use my Google account to manage my contacts. It's syncs better across all the services I use (email, in particular).

1. **Add Google account to Contacts.** Go to _System Preferences_ > _Internet Accounts_ and add the Google account. Only enable the _Contacts_ service.

{% post_image
    src="/posts/210216/sysprefs--internet-accounts.png",
    alt="System Preferences - Internet Accounts",
    classes="my-0",
    flatten=true %}

2. **Setup messages.** Open Messages application, then go to _Preferences_ > _iMessage_ tab and check _Enable Messages in iCloud_ for my Apple ID. This syncs previous messages.

{% post_image
    src="/posts/210216/sysprefs--messages.png",
    alt="iMessage - Preferences",
    classes="my-0",
    flatten=true %}

## Finder Preferences

I have found that I can move faster through Finder with a few adjustments.

1. **Change view setting to _Columns_.** It helps me getting a better sense of where I am.

{% post_image
    src="/posts/210216/finder--cols.png",
    alt="Finder Preferences - Columns View" %}

2. **Start new sessions in my home directory.** Go to _Preferences_ (`cmd`+`,`) > _General_ tab and choose my home directory for the _New Finder windows show_ setting.

{% post_image
    src="/posts/210216/finder--new-window.png",
    alt="Finder Preferences - New Window Setting",
    classes="my-0",
    flatten=true %}

3. **Enable filename extensions.** Also in _Preferences_, but in the _Advanced_ tab, check _Show all filename extensions_.

{% post_image
    src="/posts/210216/finder--extensions.png",
    alt="Finder Preferences - Enable File Extensions",
    classes="my-0",
    flatten=true %}

4. **Show hidden files.** In any Finder window, use the shortcut `cmd`+`shift`+`.` to toggle viewing hidden files and folders. I like to see them.

## The Command Line

The command line is where the fun really begins! This is the foundation for pretty much everything else we'll do in this guide.

1. **Choose to open Terminal with Rosetta.** This is because the most recent machine I purchased was in the early days of the Apple M1 chip. Rosetta is kind of like a _compatibility mode_. I tried installing all this without Rosetta and ran into too many issues.

   To open Terminal with Rosetta, navigate in Finder to your Applications directory. Then navigate to _Utilities_ and highlight Terminal. Hit `cmd`+`i` to bring up the Info panel. (Or secondary click and choose _Get Info_.) Check _Open using Rosetta_.

   This will likely prompt a download of Rosetta. Go ahead and finish that process.

   And if Terminal was previously open, quit it before continuing.

{% post_image
    src="/posts/210216/terminal--info.png",
    alt="Terminal - Get Info",
    classes="my-0",
    flatten=true %}

2.  **Install command-line tools.** Open Terminal and run:

```
$ xcode-select --install
```

3.  **Install Oh My ZSH.** ZSH is the default shell on new Macs. But I still like the Oh My ZSH package. Run this command:

```
$ sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

4.  **Install [Homebrew](https://brew.sh/).**

```
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

5.  If you're **NOT** using Rosetta, you may have to **add Homebrew to your `PATH`**. If using ZSH, this is likely the command you'll want to run:

```
$ echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> ~/.zshrc
```

6.  **Make a workspace directory** for all your code. I've recently called it `workspace`. I used to call it `code`. I've also seen others call it `sites`. Run this command (or similar):

```
$ mkdir ~/workspace
```

## Install Casks

Homebrew has this concept of [casks](https://formulae.brew.sh/cask/), which is a super awesome way to install applications and avoid going to each website individually.

The command looks like this:

    $ brew install --cask [item]

For my particular setup, I installed each of the following applications. You may want a different set.

- `1password`
- `alfred`
- `chromedriver`
- `db-browser-for-sqlite`
- `dropbox`
- `google-chrome`
- `iterm2`
- `muzzle`
- `notion`
- `postico`
- `sequel-pro`
- `sketch`
- `slack`
- `spectacle`
- `transmit`
- `tuple`
- `visual-studio-code`

Note that you can chain these together in a single command. But if one fails, you'll have to find out where you are and pick up where it failed.

These items I've been able to install in the past, but did not work when running Terminal with Rosetta. I had to download them separately from their respective websites.

- `copyclip`
- `shift`

## Install More Programs!

There's more to install with Homebrew. The programs in this section are not casks and some require extra effort after installation. They get installed without the `--cask` option:

    $ brew install [item]

Those that didn't require any extra work, at least initially were:

- `docker`
- `netlify-cli`

### Services

I installed three services, which means I have to start them after they've been installed. Install with:

    $ brew install redis postgresql mysql@5.7

MySQL is `v5.7` because it was purchased by Oracle, and newer versions (`v8`) are proprietary.

After they are installed, you can start the services:

    $ brew services start redis
    $ brew services start postgresql
    $ brew services start mysql@5.7

### direnv

I like [direnv](https://direnv.net/) for managing contextual environment variables. Install:

    $ brew install direnv

And add the hook to your `~/.zshrc` (or similar) file:

    $ echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc

### nvm

I use [nvm](https://github.com/nvm-sh/nvm) for managing version of Node.js. To install:

    $ brew install nvm

And then make a home directory for it.

    $ mkdir ~/.nvm

And copy the necessary output to `~/.zshrc`. For me this was:

`~/.zshrc` {.filename}

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

### Heroku

Heroku is installed a little differently:

    $ brew tap heroku/brew
    $ brew install heroku

## App Store Apps

Casks were not available for the following applications that I use, which are only available through the App Store and not their websites.

- [Bear](https://bear.app/)
- [Notability](https://www.gingerlabs.com/)

## Other Applications

Here are some other applications I installed manually through their websites:

- [CopyClip2](https://fiplab.com/apps/copyclip-for-mac)
- [Shift](https://tryshift.com/)
- [ScreenFlow](https://www.telestream.net/screenflow/)
- [Audacity](https://www.audacityteam.org/)

## Set Application/Program Preferences

Now that all these apps are installed, it's time to get them set up.

### Chrome

1. Add primary user.
2. Add more people (if necessary) by going to the People menu.
3. Sign into extensions, as necessary. For me on the latest install, that was just 1Password.
4. I also [remove controls from touch bar](https://support.google.com/chrome/answer/7570714?hl=en). I've accidentally brushed the Refresh button enough times to simple remove all the stupid, useless touch bar functions.

### Spectacle

1. Adjust Spectacle to not interfere with Shift's shortcuts. I set the halves sections to `ctrl`+`cmd`+`arrow`.
2. I also set it to launch at startup.

{% post_image
    src="/posts/210216/spectacle--prefs.png",
    alt="Spectacle Preferences",
    classes="my-0",
    flatten=true %}

### Alfred

1. Change Spotlight shortcut to `option` + `spacebar`. Do this in _System Preferences_ > _Keyboard_ > _Shortcuts_ tab. Change `cmd`+`space` shortcut to `option`+`space`.

{% post_image
    src="/posts/210216/sysprefs--keyboard-shortcuts.png",
    alt="System Preferences - Keyboard Shortcuts",
    classes="my-0",
    flatten=true %}

2. Set Alfred hotkey shortcut to `cmd`+`spacebar`.

{% post_image
    src="/posts/210216/alfred--hotkey.png",
    alt="Alfred Preferences - Hotkey",
    classes="my-0",
    flatten=true %}

3. Put prefixes in front of all the system commands. I've accidentally shut down my computer for the last time! (Another option is to prompt a confirmation, but I like this pattern.)

{% post_image
    src="/posts/210216/alfred--system.png",
    alt="Alfred Preferences - System",
    classes="my-0",
    flatten=true %}

### iTerm2

1. iTerm2 is another terminal, so I it should also be opened with Rosetta on Apple M1 machines. Do this in the same way you did for Terminal.
2. Enable `Esc+` for left and right option keys. This is [the way to delete full words](/posts/delete-full-words-terminal/). This image shows the option enabled only for the left option key.

{% post_image
    src="/posts/210216/iterm--meta.png",
    alt="iTerm2 Preferences - Meta Key",
    classes="my-0",
    flatten=true %}

3. [Install Dracula theme](https://draculatheme.com/iterm/) (or your theme of choice).
4. [Open new tabs in the previous workspace](https://medium.com/ayuth/new-tab-iterm2-with-in-current-directory-627b0c31734a).

### VS Code

1. Turn on Sync Settings by opening the Command Palette (`cmd`+`shift`+`p`), typing _sync_ and then choosing to enable Sync Setting. You'll have to sign in with either Microsoft or GitHub to enable this feature.

{% post_image
    src="/posts/210216/vscode--settings-sync.png",
    alt="VS Code Settings Sync",
    classes="my-0",
    flatten=true %}

## Setup Git & GitHub

1. [Generate SSH key and setup git](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account):

```
$ ssh-keygen -t ed25519 -C "your@email.address"
```

2. [Add public key to GitHub account](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account).
3. Configure git

```
$ git config --global user.name "Your Name"
$ git config --global user.email your@email.address
```

## Next Steps

Holy smokes! I think that might be it, but it was a lot, wasn't it?

Your next step is to take a minute and do whatever you do to relax. Then start writing some code!

---

_What did you learn from this? What do you do differently when setting up a new machine? [I'd love to hear from you](https://twitter.com/seancdavis29)._
