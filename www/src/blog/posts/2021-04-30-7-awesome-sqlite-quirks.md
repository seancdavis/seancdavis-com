---
title: 7 Things that Make SQLite Unique and Awesome
date: 2021-04-30
description: SQLite is not like the others. But what makes it different also makes it a pretty cool database engine.
image: /blog/210430/210430-sqlite-quirks.png
tags:
  - repost-grouparoo
  - sqlite
canonical_url: https://www.grouparoo.com/blog/7-awesome-sqlite-quirks
---

I became very close with SQLite in the few weeks it took me to build out [Grouparoo's SQLite plugin](https://github.com/grouparoo/grouparoo/tree/1c42a9159395dc1b83073ac52a6d15c6828ae908/plugins/@grouparoo/sqlite). Through that process I came to find that SQLite is not like the others. It has a handful of [quirks, caveats, and gotchas](https://www.sqlite.org/quirks.html) when compared to other databases like [MySQL](https://www.mysql.com/) and [PostgreSQL](https://www.postgresql.org/).

Here are seven of those quirks that I find most interesting:

## 1. SQLite is serverless

SQLite doesn't require a separate process to run, as other databases do. As [their docs mention](https://www.sqlite.org/serverless.html):

> With SQLite, the process that wants to access the database reads and writes directly from the database files on disk.

That also means there is no separate process to install SQLite. It tends to _just work_. It's likely for that reason that it is believed to be [the most widely deployed and used database engine](https://www.sqlite.org/mostdeployed.html).

## 2. The Database is (usually) contained within a file

SQLite database files are not hidden away. When you're working with Postgres, you're unlikely to go looking for where the data is actually stored on your machine. You're much more likely to simply access that data through Postgres.

You can take that approach with SQLite, too. Except, the database is often right in front of you. It's just a file. In fact, you can create a new file — e.g. `my_database.sqlite` — and _voila!_ you have yourself a SQLite database.

## 3. The database can also be run in memory

What is super cool about SQLite is that it can also run in memory. That makes the database instance more or less ephemeral. But it also provides a means of speeding up reads and writes over accessing data from your computer's disk.

## 4. SQLite is liberal/flexible

SQLite is smart. Well, at least it tries to be. This section from their docs says it all:

> The original implementation of SQLite sought to follow [Postel's Law](https://en.wikipedia.org/wiki/Robustness_principle) which states in part "Be liberal in what you accept". This used to be considered good design - that a system would accept dodgy inputs and try to do the best it could without complaining too much.

Generally speaking, SQLite tries to do the best it can with the input you provide. Having written a lot of Ruby code in my life, I enjoy this approach. It's not without its downsides. And it requires that you understand what's going on under the hood if you're going to use it. But flexibility can be powerful.

## 5. There are only five datatypes

Yeah, it's weird. They are:

- `NULL`
- `INTEGER`
- `REAL` (i.e. float)
- `TEXT`
- `BLOB` (i.e. raw)

Ummmm ... No dates or booleans!!?

Nope. SQLite keeps things simple. It converts booleans to integers, and it [has a series of functions](https://www.sqlite.org/lang_datefunc.html) for handling date and time representations, but typically stores dates as strings.

## 6. Column types are (almost) meaningless

Most databases look at the column to determine the data type of a particular value. SQLite looks at the value itself and considers the column type only within the over-arching idea of [type affinity](https://www.sqlite.org/datatype3.html#type_affinity).

In other words, if your column is of a certain series of types, SQLite will attempt to put it in the right format. Otherwise, it'll do the best it can. And if it can't figure out the type, it just leaves the value as it was.

This can lead to chaos — like having the multiple data types in for the same column. But if you're using an [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping), those conversions will likely be handled for you and you won't have to worry about SQLite types.

I went through a few examples to demonstrate this quirk with Node.js [in this post](/blog/understanding-types-sqlite-node).

## 7. Quotes are also flexible

SQL has two distinct purposes for single quotes and double quotes. Single quotes are for string literals, while double quotes are reserved for identifiers.

But, SQLite tries to be smart about what you put in. So if you used single quotes for a column name or double quotes for the values in an `INSERT` statement, they're likely to work just fine.

---

SQLite is weird and wonderful. It's lightweight, probably available whenever you need it, and has a fairly low barrier to entry.

I hope you learned something about SQLite here and are ready to give it a try!

If you want to talk about it, [hit us up](https://www.grouparoo.com/chat). We're a small group of nerds who love chatting about databases.
