---
title: Understanding Types with SQLite and Node.js
date: 2021-04-22
description: SQLite is simple but very cool and powerful. Yet, it's a little quirky when it comes to handling types. Let's explore that goofiness together, and see how we can protect against it when using Node.
image: /blog/210422/210422-sqlite-types.png
tags:
  - repost-grouparoo
  - node
  - sqlite
canonical_url: https://www.grouparoo.com/blog/understanding-types-sqlite-node
---

Two fun facts about [SQLite](https://www.sqlite.org/index.html):

1. The initial release was more than 20 years ago!
2. It is the [most widely used database](https://www.sqlite.org/mostdeployed.html) (and likely one of the most widely deployed pieces of software).

And here are a few of my opinions on SQLite:

- It's super cool.
- We don't talk about it enough.
- It's actually really easy to use (which is likely why it's so widely used).
- It is a little quirky.

So let's talk about this super cool thing. Let's look at how easy it is to use with Node.js before spending some time uncovering its quirks, which mostly have to do with how it handles data types.

## A Quick SQLite Example with Node.js

If you're able to run Node on your machine and install packages [via NPM](https://www.npmjs.com/), then you can very easily create and manipulate a SQLite database. Let's go through an example in which we do just that — create a database, users table, and a few users.

(Note: You can also work with SQLite without Node or NPM. That's just what we're using for our examples here today.)

To get started, create a new directory for your project:

    $ mkdir my-sqlite-project
    $ cd my-sqlite-project
    $ npm init -y

<Alert variant="primary">
  <p className="mb-0">
    <strong>Pro Tip:</strong> This is the point at which I usually drop a{" "}
    <code>.gitignore</code> file that ignores the <code>node_modules</code>{" "}
    directory. And then I run <code>git init</code> so I can start tracking my
    changes.
  </p>
</Alert>

Now that you have an empty directory, let's install our dependencies:

    $ npm install sqlite3 faker

<Alert variant="primary">
  <p className="mb-0">
    Notice this installs{" "}
    <a href="https://github.com/marak/Faker.js/">Faker.js</a> in addition to the
    SQLite library. Faker is a nice and simple library that will help us add
    random data when we create new users.
  </p>
</Alert>

Next, create an `index.js` file with the following code:

```js
const sqlite3 = require("sqlite3").verbose()
const faker = require("faker")
const path = require("path")
const { promisify } = require("util")

// Create a new database named mydb.sqlite in the root of this project.
const dbFilePath = path.join(__dirname, "mydb.sqlite")
const db = new sqlite3.Database(dbFilePath)

// Use the promise pattern for SQLite so we don't end up in callback hell.
const query = promisify(db.all).bind(db)

// SQL query for creating a users table if it doesn't already exist.
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    "id" INTEGER PRIMARY KEY,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "created_at" TEXT
  )
`

// Generate user attributes using faker.
const newUser = {
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  created_at: Date.now()
}

/**
 * Run an INSERT query on some given table and insert the given object.
 */
const create = async ({ table, object }) => {
  const keys = Object.keys(object).join(",")
  const values = Object.values(object)
    .map(v => `"${v}"`)
    .join(",")
  const res = await query(`INSERT INTO ${table} (${keys}) VALUES (${values})`)
  return res
}

/**
 * Read all records and all their columns from some given table.
 */
const read = async ({ table }) => {
  const res = await query(`SELECT * FROM ${table}`)
  return res
}

/**
 * The main controller of this script. This is inside an async function so we
 * can use the promise pattern.
 */
const run = async () => {
  // Create users table if it doesn't exist.
  await query(createTableQuery)
  // Create a new user.
  await create({ table: "users", object: newUser })
  // Read all the users.
  const users = await read({ table: "users" })
  // Print to the console.
  console.log(users)
}

run()
```

Then run the script:

    $ node index.js

After you do that, two things should happen:

1. You should see some output in the console that is an array containing a single user with the values you just randomly generated. Something like:

   ```js
   ;[
     {
       id: 1,
       email: "Dawson39@yahoo.com",
       first_name: "Dorris",
       last_name: "West",
       created_at: "1619034411275"
     }
   ]
   ```

2. You should have a new file in your project called `mydb.sqlite`. This is your database!

You can open up your database file with a SQLite browser. I'm a big fan of [TablePlus](https://tableplus.com/), which has a free version. But you can also use the simple-but-popular [DB Browser for SQLite](https://sqlitebrowser.org/).

If you open your users table, you should see the same record represented as was printed to the console.

See how easy that was?

Now that we have that basic example in place, let's keep it around while we dig into some of SQLite's quirks.

## SQLite Type Quirks

SQLite is weird. Well, it's not really _weird_, it's just ... simple. So it _feels_ weird in comparison to other beefy (and structured) databases like [PostgreSQL](https://www.postgresql.org/) or [MySQL](https://www.mysql.com/).

Most of the quirks with SQLite have to do with how it handles types. And that's in large part because of how SQLite stores its data (as a file on your file system). That's right. That `mydb.sqlite` file you created in the simple example above is your entire database. Cool, right?

Let's dig in to the basics of SQLite's data types before we look at how we can better work with them when writing a program with Node.js.

### Understanding SQLite Types

SQLite only has [five data types](https://www.sqlite.org/datatype3.html):

- `NULL`: The value is a NULL value.
- `INTEGER`: The value is a signed integer, stored in 1, 2, 3, 4, 6, or 8 bytes depending on the magnitude of the value.
- `REAL`: The value is a floating point value, stored as an 8-byte IEEE floating point number.
- `TEXT`: The value is a text string, stored using the database encoding (UTF-8, UTF-16BE or UTF-16LE).
- `BLOB`: The value is a blob of data, stored exactly as it was input.

What the heck does that mean? Reading between the lines, it means that the data in your database is either going to be (in JavaScript speak) a `string` or a `number`, at least for the majority of cases.

That's right. That means there are no dates or booleans in SQLite. WTF?

### SQLite does not store date objects

SQLite has [date functions](https://www.sqlite.org/lang_datefunc.html), but it will ultimately store the actual value as either a string or number.

For example, I could run this query against the users table from above:

```sql
INSERT INTO users (email,created_at) VALUES ('hello@example.com',date('now'))
```

And the value will be stored as `2021-04-21`, as a string.

### SQLite also doesn't store booleans

Instead, booleans used in SQL statements are converted to either `0` or `1`. In other words, `true` in an insert statement becomes `1` when it's stored in the database.

## How Type Affinity Works in SQLite

SQLite uses what is called _dynamic typing_. Where most other databases set the data type of some given value by the column definition, SQLite looks more directly at the value itself.

But, there is some magic happening through what SQLite calls _type affinity_ on columns in a database. You can set a type for a column, but it's really just a _recommended_ type. SQLite will do its best to convert the value to that type, but it may not always work as you'd expect.

The goofy thing here is that aside from matching a type affinity name when setting the type of a column, the name is virtually meaningless. It can be anything. [Here are a set of types that map to type affinities in SQLite](https://www.sqlite.org/datatype3.html#affinity_name_examples).

Let's go through some specific examples to see what happens when we use the Node sqlite3 library to interact with a SQLite database.

## Type Affinity Examples with SQLite and Node.js

Let's go through a few examples together to show how type affinity works with SQLite and how we can use JavaScript to gain more control over types by manually casting them. Then we'll close with a cool approach for getting around all this nonsense.

Using the example from the beginning of the post, let's add a few columns to our users table. Edit the `createTableQuery` in `index.js`:

```js
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    "id" INTEGER PRIMARY KEY,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "created_at" TEXT,
    "a" TEXT,
    "b" INTEGER,
    "c" CHEESE
  )
`
```

Here we've recreated the `users` table with three new columns:

- `a` of type `TEXT`. This matches the `TEXT` affinity.
- `b` of type `INTEGER`. This matches the `INTEGER` affinity.
- `c` of type `CHEESE`. This has no affinity.

Then, let's set `a`, `b`, and `c` on our `newUser` object to be a random number.

```js
const newUser = {
  email: faker.internet.email(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  created_at: Date.now(),
  a: faker.datatype.number(),
  b: faker.datatype.number(),
  c: faker.datatype.number()
}
```

Before we load the content into the database, let's check the type. And when we retrieve it from the database, we'll check the types again.

```js
const run = async () => {
  await query(createTableQuery)

  const user = newUser()
  // Log the data types going into the database.
  Object.entries(user).map(([key, value]) =>
    console.log(`${key}: ${typeof value}`)
  )
  await create({ table: "users", object: user })

  const users = await read({ table: "users" })
  // Log the types coming out of the database.
  Object.entries(users[0]).map(([key, value]) =>
    console.log(`${key}: ${value} (${typeof value})`)
  )
}
```

Delete the database `mydb.sqlite` and run the script:

    $ node index.js

Notice what you see on the console. Before the data went into the database, each of our new values was a `number`:

```
a: number
b: number
c: number
```

That's what we should have expected, considering we set those attributes as random numbers.

For me, when they came out of the database, they looked different:

```
a: '91057' (string)
b: 9807 (number)
c: 31711 (number)
```

Notice that `a` is now a `string`. Why? Because we set the column's type affinity to a value that SQLite will use to try to convert to a string. Meanwhile, nothing happened with the `CHEESE` column because it has no affinity, so it left it as a number.

### Try again, but with strings

If we do that again, but change `faker.datatype.number()` to `faker.datatype.string()`, we will see something slightly different.

The types going in are all strings:

```
a: string
b: string
c: string
```

But coming out they are still all strings:

```
a: 'i_`kneb8|]' (string)
b: '/@adUCVEV3' (string)
c: '@8eMpbKoFk' (string)
```

The reason `b` wasn't converted to a number is because SQLite doesn't know how to convert that random string to a number. There's no logical choice for what the number should be. So it leaves the original value as is.

### Using a number as a string

Now, one last time. Let's use a number again, but let's convert it to a string. Change `faker.datatype.string()` to `faker.datatype.number.toString()`.

Now, going in we still have all strings:

```
a: string
b: string
c: string
```

But coming out, it looks a little different:

```
a: '42995' (string)
b: 22072 (number)
c: 3466 (number)
```

Whoa! Something weird happened this time. Now our affinities match for `a` and `b` as they did in the first example. This is example SQLite knows how to turn `"22072"` into an integer.

But `c` _changed_ from being a string to a number. That's because SQLite is trying to do the best it can't with what it is given. And in this case it figured it could turn the string into a number, so it did that. The only way to have kept it as a string would have been to use an appropriate affinity mapping value.

## Typecasting SQLite Queries using Node.js

This quirk is pretty interesting and clever, but it's dangerous in real-world scenarios when you don't have bounds around how it can behave. You don't want your database turning strings into numbers without knowing why that's happening.

One approach is to write your own getters and setters that typecast values more strictly. That way your program has more control over what is going into and coming out of the database.

For example, consider a function that takes user data retrieved from the database and parses a `created_at` field to convert it from an integer into a JavaScript date object. That might look something like this:

```js
const normalizeUser = obj => {
  return { ...obj, created_at: new Date(parseInt(obj.created_at)) }
}
```

The list goes on and on, but that could be a lot to manage as your application grows.

## Or Use an ORM!

As your application grows in size and complexity, it likely will make sense to make use of some other library that can handle this typecasting logic for you. These libraries are called ORMs, which stands for _object-relational mapping_. That's a fancy term for a tool that makes it easier to move from database to database without needing to change the syntax used to manipulate data in the database.

At Grouparoo, we use [Sequelize](https://sequelize.org/) to interact with our application database.

Here's a simple example that does essentially what we were doing in the introductory example using Sequelize:

```js
const faker = require("faker")
const path = require("path")

const { Sequelize, Model, DataTypes } = require("sequelize")

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "mydb.sqlite")
})

const userAttrs = {
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
}

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  },
  { sequelize, modelName: "user" }
)

const run = async () => {
  await sequelize.sync()
  const users = await User.findAll()
  users.map(user =>
    Object.entries(user.dataValues).map(([key, value]) =>
      console.log(`${key} (${typeof value}): ${value}`)
    )
  )
}

run()
```

Notice here that I'm more explicit about the column types. Sequelize then handles the typecasting for me. For example, running this once, this was the object returned to me from the database:

```
id (number): 1
email (string): Erling_Friesen50@gmail.com
firstName (string): Easton
lastName (string): Kub
createdAt (object): Tue Apr 20 2021 13:50:17 GMT-0400 (Eastern Daylight Time)
updatedAt (object): Tue Apr 20 2021 13:50:17 GMT-0400 (Eastern Daylight Time)
```

Notice that it actually sent `date` objects for `createdAt` and `updatedAt`. (Also notice that Sequelize handled setting those values when I created the record. I didn't have to do anything.)

There are plenty of other ORMs out there. Sequelize is among the most popular for Node. Another I came across recently is [Prisma](https://www.prisma.io/).

---

That's all for this exploration through how types work with SQLite when using a Node.js library. I hope you learned something!
