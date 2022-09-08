---
title: Should I Add Images to My Git Repository?
description: >-
  To commit or not commit. A list of reasons and resources to support your
  decision.
tags:
  - git
  - developer-advice
image: /posts/220827/should-i-add-images-to-my-git-repository-Tyx4KpPT.png
seo:
  image: /posts/220827/should-i-add-images-to-my-git-repository-MScSAaDo--meta.png
---

Generally speaking, I say no — don't commit and store images in your git repository. However, I understand why many developers choose to use git to track and store images.

In fact, there are some projects in which I have a number of images tracked with git. But generally, if I can avoid it, I do.

## Avoid Storing Images in Git Repositories

I avoid committing images (or any media files) to my git repositories for these reasons:

- **Bloat/Performance:** Media files are likely to be the biggest files in the repository. Adding a number of images can quickly lead to bloat, which increases the time it takes to push and pull. It also means you may pull someone else's committed images that you don't need in your work, which means spending unnecessary energy (and time).
- **Diffing Not Supported:** Git cannot track _what_ has changed _within_ an image file. It just knows that the file changed. Updating an image means storing double the amount of space, as Git now needs to store both images. (There are ways around this, discussed below.)
- **Usage/Optimizations:** Storing images locally typically means they are used on the front end of the tool. In many cases, that may mean that optimizing the images is your responsibility. As you'll see below, there are low-cost services that will optimize images on your behalf, according to your specs.

## Benefits of Storing Images in a Repo

That said, committing images to your repo can come with benefits:

- **Convenience:** It's super convenient to add an image right alongside the code. You don't have to worry about or remember where your images are. You just drop them in a folder and commit.
- **Version History:** Although diffing is not possible, git does know when the file changed, which is valuable information, as it can be used to track an image over time.
- **History Control:** You have full control over your git history, which means that if you need to clear out the history to make more space for images, you totally can. There are risks involved, but it's doable.

## Alternatives to Committing Images

Here are a number of options when you want to avoid committing images to your repo.

### Media Services

Services like [Cloudinary](https://cloudinary.com/) and [Imgix](https://imgix.com/) are amazing alternatives that make it easy to move images out of your repository. They both also have optimized delivery APIs that provide real-time transformations and effects.

In some cases, these services require that you bring a hosting service, like AWS S3. That can seem intimidating at first. But once you get the hang of it, it'll feel like working with any other service. Especially when paired with a tool like [Transmit](https://panic.com/transmit/) to make it easy to upload images.

### Content Management Systems

If your content is already in a CMS, great! If not, you may want to consider if it'd be beneficial to move all your content into a CMS, and then take advantage of the CMS's media-specific features. For example, Contentful has an image delivery API that provides transformations on the fly.

### File-Hosting Services

Services like [Dropbox](https://www.dropbox.com/) could easily be used. You can even have public links for these images.

The biggest downside when compared to the others is that there is no transforming images on the fly.

### GitHub Issues

Last, I have a theory that GitHub issues could become your image host. (Although this is not proven.)

## If You Want to Keep Images in Your Repository

If you do decide to continue committing images, I'll leave you with these final thoughts.

### Git Submodules

Consider first using [git submodules](https://stackoverflow.com/a/5756500/2241124). This can be a clean way to wipe history and start over, or simply avoid downloading the images unless they are relevant to what you're working on.

### Use SVGs Where You Can

If you're going to commit images, use SVG files as much as reasonably possible. SVG files are venctor images (which means they scale very well), but they are also plain text files. This means git can track the changes on the file and not a new copy of the file each time.

### Git LFS + Netlify

Another approach is to use [Git LFS](https://git-lfs.github.com/), which began and is maintained by GitHub. This pairs nicely with [Netlify's Large Media feature](https://docs.netlify.com/large-media/overview/).

---

I hope you now have the confidence necessary to either commit or not commit your image assets.
