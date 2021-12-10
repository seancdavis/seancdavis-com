---
title: Export Bear Notes to Markdown Files
description: Bear is one of the best editors out there, but lacks workflows for your content. Here's how to programmatically write Bear notes to local markdown files.
image: /posts/210616/orange--bear-to-markdown.png
tags:
  - javascript
  - node
---

I love [Bear](https://bear.app/). The only other writing experience I've had that rivaled it was [Ulysses](https://ulysses.app/). It's an absolute joy to use to author content with markdown.

The biggest issue I have with Bear is that it's not easy to do anything with the content _outside_ of the application. But in the end, what you're authoring within Bear is just markdown (or it _can_ be), and that content should be portable to wherever you can make it most actionable.

Here's a guide to get you started in building a workflow around your Bear notes by exporting them to markdown files.

## The Example

We're going to write a single [Node.js](/posts/wtf-is-node) script that will export notes from Bear into markdown files with frontmatter metadata elsewhere on your machine.

In this specific example, we're going to target active notes (i.e. _not trashed_). And in the frontmatter, we'll add five key-value pairs:

- `id`: The ID of the note within the database.
- `title`: The title of the note, which comes from the note's main `<h1>` tag.
- `slug`: A _slugified_ version of the title that we'll use to name the file.
- `updatedAt`: The last time the note was updated in the Bear app.
- `tags`: An array of tags used within the note.

You can always adjust to store the data that you care about.

We're going to keep this super simple. We'll find the database, make a copy, and query it directly with the [sqlite3](https://www.npmjs.com/package/sqlite3) package. If I were going to build a real workflow that I wanted to last, I'd probably look at putting a more formal system together using an ORM like [Sequelize](https://sequelize.org/) or [Prisma](https://www.prisma.io/). But I want to keep us focused here.

### One Quick _Gotcha!_

Since Bear is setup to author in markdown, we're not actually going to change the content in any way, although I'll mention where you could do that work if you would like.

However, the current version of Bear has its own style of markdown. Therefore, your mileage may vary if you're using that default markdown style. You may have to build a parser to convert it to actual markdown.

An easy way around that is to use [_markdown compatibility mode_](https://bear.app/faq/Markup%20:%20Markdown/Markdown%20compatibility%20mode/). Personally, I prefer to do this anyways because it has parity with authoring in other applications.

## Step 1: Locate and Examine the Database

Before we write any code, we have to find the database. Fortunately, [someone had the same question](https://bear.app/faq/Where%20are%20Bear's%20notes%20located/) and there's an answer that I've found success with so far.

As part of this process we will copy the database each time before we run the command. But, before we begin, go ahead and manually copy the database to some more-easily accessible location. Then open it up to look at the content and schema. My favorite app for this is [TablePlus](https://tableplus.com/), but there's also the popular [DB Browser for SQLite](https://sqlitebrowser.org/).

You'll notice the database is littered with obscure table and column names. Here's what's important to know for this exercise:

- The notes are located in a table called `ZSFNOTE`.
- Within that table, `ZTRASHED` tells us if the note is active.
- We can grab the other attributes we need (except tags) directly:
  - `Z_PK` is the ID
  - `ZTITLE` is the note title
  - `ZTEXT` is the main body content
  - `ZMODIFICATIONDATE` is the last updated date
- Tags are located in `ZSFNOTETAG` where `Z_PK` is its ID and `ZTITLE` is its title.
- Tags can be joined to notes through the `Z_7TAGS` table, where `Z_7NOTES` is the note's ID and `Z_14TAGS` is the tag's ID.

Phew! Are you already tired?

Hopefully not, because we haven't even written any code yet. If you are, take a break and rest that brain. And then let's write some code!

## Step 2: Setup

Let's begin by creating a new directory for your project and setting it up. [Here are the steps I take when adding a new JavaScript project](/posts/new-javascript-project-setup/).

Follow steps 1-3. In Step 3, add the following to your `.gitignore` file, in addition to `node_modules`:

`.gitignore` {.filename}

```
database.sqlite
tmp/
```

For Step 4, we're going to work with a few libraries:

- [sqlite3](https://www.npmjs.com/package/sqlite3)
- [slugify](https://www.npmjs.com/package/slugify)
- [js-yaml](https://www.npmjs.com/package/js-yaml)

We can install them with one command:

    $ npm install sqlite3 slugify js-yaml

We'll deal with the `package.json` scripts later on.

## Step 3: Get Notes from the Database

First thing we're going to do is add a script to copy the database. Put this in a `utils` directory.

`utils/copyDatabase.js` {.filename}

```js
const fs = require("fs");
const path = require("path");
const HOME = require("os").homedir();

const srcPath = path.join(
  HOME,
  "/Library/Group Containers/9K33E3U3T4.net.shinyfrog.bear/Application Data/database.sqlite"
);
const destPath = path.join(__dirname, "../database.sqlite");

if (!fs.existsSync(srcPath)) {
  console.error(`Could not find Bear database: ${srcPath}`);
  process.exit(1);
}

fs.copyFileSync(srcPath, destPath);
console.log(`Copied Bear database: ${destPath}`);
```

This will copy the database to the root of your project, or it will let you know that it couldn't find the database.

Then let's add our main script at `index.js`:

`index.js` {.filename}

```js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");
const { promisify } = require("util");

const query = promisify(db.all).bind(db);

const getNotesQuery = `
  SELECT
    Z_PK as id,
    ZTITLE as title,
    ZTEXT as body,
    ZSUBTITLE as subtitle,
    ZTRASHED as deleted,
    ZMODIFICATIONDATE as updatedAt
      FROM ZSFNOTE
      WHERE deleted = 0;`;

const main = async () => {
  const notes = await query(getNotesQuery);
  console.log(notes);
};

main()
  .finally(() => {
    console.log("Done.");
  })
  .catch((err) => {
    throw new Error(err.message);
  });
```

There's not much going on here. We connect to a database then run the SQL query shown to grab all the active notes and log them to the console.

{% callout type="info" %}
There's some fanciness in here that protects us from madness later on. The SQLite library uses callbacks by default, which means it will run a function we give it after the query is complete.

A more modern [JavaScript](/posts/wtf-is-javascript/) pattern is to use promises through `async` and `await`. That's what's going on here. We promisify the SQLite query and then run the main part of our code within an async function so that we can be sure each line is resolved before moving on to the next.
{% endcallout %}

Next, now we can add the scripts to `package.json` so we can run these two commands:

`package.json` {.filename}

```json
{
  // ...
  "scripts": {
    "preexport": "node ./utils/copyDatabase.js",
    "export": "node index.js"
  }
}
```

While it looks a little funny, NPM has this handy method of [running scripts before and after other scripts](https://docs.npmjs.com/cli/v7/using-npm/scripts#pre--post-scripts). When we run the `export` command, the `preexport` will automatically be run first. Thus, we copy the database every time, and then run the main script.

We could have combined this into a single script. But I like this because it feels like two very different actions — copy the database, then export markdown files from it.

You can test it all out now by running the `export` script:

    $ npm run export

You should see content from your active notes logged to your console.

[Here is the code](https://github.com/seancdavis/seancdavis-com/tree/548636b855013885c53a038b54972398cdb70afe/examples/bear-to-markdown) at this point in time if you'd like to look. There may be a few extra things in there.

## Step 4: Add Tags

Next, let's do the same thing (continue to log our notes to the console), but collect the tags.

The SQL query gets much more complex here. It looks like this:

```sql
SELECT
  'Note'.'Z_PK' AS 'id',
  'Note'.'ZTITLE' AS 'title',
  'Note'.'ZTEXT' AS 'body',
  'Note'.'ZTRASHED' AS 'deleted',
  'Note'.'ZMODIFICATIONDATE' AS 'updatedAt',
  'Tags'.'Z_PK' AS 'Tags.id',
  'Tags'.'ZTITLE' AS 'Tags.title',
  'Tags->NoteTag'.'Z_7NOTES' AS 'Tags.NoteTag.NoteId',
  'Tags->NoteTag'.'Z_14TAGS' AS 'Tags.NoteTag.TagId'
    FROM 'ZSFNOTE' AS 'Note'
    LEFT OUTER JOIN 'Z_7TAGS' AS 'Tags->NoteTag' ON 'Note'.'Z_PK' = 'Tags->NoteTag'.'Z_7NOTES'
    LEFT OUTER JOIN 'ZSFNOTETAG' AS 'Tags' ON 'Tags'.'Z_PK' = 'Tags->NoteTag'.'Z_14TAGS'
    WHERE 'Note'.'ZTRASHED' = 0;
```

This is doing some fancy join stuff. It will ultimately provide a line representing every instance of every tag in every note. That means that some rows returned will be duplicate notes. So we have to collect notes in a bit of a different way.

Our `main()` function gets updated to this, with some comments for context:

```js
const main = async () => {
  // Reference to store note data.
  let notes = [];
  // Query the database for notes and their tag. There will be a row returned
  // for each tag that a note contains.
  const queryResult = await query(getNotesQuery);
  // Get a unique set of IDs for the notes returned, as more than one row may
  // contain the same note.
  const noteIds = new Set(queryResult.map((res) => res.id));
  // Collects all notes matching the passed ID and builds an object to represent
  // that note.
  const buildNoteObject = (noteId) => {
    // Find all rows from the query result matching the passed ID.
    const rows = queryResult.filter((row) => row.id === noteId);
    // Return a null object if we were given a bad ID.
    if (rows.length === 0) return null;
    // Extract relevant attributes out of the first row. Each of these is
    // assumed to be the same value in any row. We're picking the first one
    // because we know there will always be a first one.
    const { id, title, body, deleted, updatedAt } = rows[0];
    // Collect the tag names. Each row in the query result has its own unique
    // tag name, assuming the tag was only used once in the document.
    const tags = rows.map((row) => row["Tags.title"]);
    // Build the object and return it.
    return { id, title, body, deleted, updatedAt, tags };
  };
  // Loop through the notes and store the result in the notes object.
  noteIds.forEach((id) => {
    notes.push(buildNoteObject(id));
  });
  // Log our result.
  console.log(notes);
};
```

[Here is the file in its entirety at this point](https://github.com/seancdavis/seancdavis-com/blob/81ae1f1001afdad298c870fb300fe925ee1ea3da/examples/bear-to-markdown/index.js).

## Step 5: Write Notes to File

Now we have _just about_ everything we need to write the notes to file.

First, we need one more attribute to write the file — the filename! We'll get that by _slugifying_ the title. [Here's the change to make that happen](https://github.com/seancdavis/seancdavis-com/commit/2c0664c). And the resulting file [looks like this](https://github.com/seancdavis/seancdavis-com/blob/2c0664c/examples/bear-to-markdown/index.js).

Now we're ready to write the note to file! Let's add another function inside our `main()` function to export the note. This will take a prepared note object, build its fronmatter and body, and then write it to file.

Then we can iterate over each note and run these functions.

First, add the js-yaml dependency to the top of your file:

`index.js` {.filename}

```js
const yaml = require("js-yaml");
```

Then add a few lines to create the export directory if it doesn't exist:

```js
const outputDir = path.join(__dirname, "./tmp/export");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
```

Note that we're going to write these files to a `tmp/export` directory within your current project.

And add some new lines to the `main()` function:

```js
const main = async () => {
  // ...
  // Builds frontmatter and then writes the note to file.
  const exportNote = (note) => {
    const filePath = path.join(outputDir, `${note.slug}.md`);
    const { id, title, slug, body, tags } = note;
    const frontmatter = yaml.dump({ id, title, slug, tags });
    const content = `---\n${frontmatter}---\n\n${body}`;
    fs.writeFileSync(filePath, content);
    return { filePath, content };
  };
  // Loop through the notes and store the result in the notes object.
  noteIds.forEach((id) => {
    const note = buildNoteObject(id);
    const { filePath } = exportNote(note);
    console.log(`Wrote note to file: ${filePath}`);
  });
};
```

Altogether, the file should now look [like this](https://github.com/seancdavis/seancdavis-com/blob/d279f54/examples/bear-to-markdown/index.js).

Run the command again:

    $ npm run export

And then check your `tmp/export` directory for these new files.

Now you should be able to take a note from Bear that looks like this:

```
# Hello World

#export-me

I'm so cool!
```

And the resulting file, `tmp/export/hello-world.md`, looks like this:

```md
---
id: 203
title: Hello World
slug: hello-world
tags:
  - export-me
---

# Hello World

#export-me

I'm so cool!
```

Pretty cool, right!?

## Next Steps

That's a start to something that could be super powerful and enable you to bring Bear into a more efficient workflow for you personally.

But on its own, it's not much. Maybe it's good enough for you. But you'll probably want to do more with it if it's really going to be effective. Here are some thoughts I have on what I might do next:

- If this workflow grows in complexity for you, it'd likely be easier to work with an ORM. It could help keep the code a little simpler and keep you away from nasty SQL statements.
- Instead of simply targeting notes that weren't trashed, you might want to target through some other means, like a specific tag or set of tags.
- This doesn't extract files from the content. Images that you've dropped inline are still hidden away on your machine. You may want to extract them.
- Syncing seems like a dangerous game to play here. But if you do proper backups of the database and know what you're doing, it might be something to explore.
- I'm not protecting against duplicate tags or filenames, both of which could happen.
- Write some tests if you're going to take this into a production-level workflow!

## A Closing Question

I hope you got something out of this and it has helped you work more efficiently. I'll leave you with a question before I go:

_Is there any value in this being a library of sorts?_ In other words, if instead of going through this entire process, you could have installed an NPM package and run something like this:

    $ bearapp export

I've considered building something like this, but I'm not sure of the usage it would get. I'd love to know what you think or what you are doing with your Bear exporter.

Keep writing, keep exporting, keep being awesome!
