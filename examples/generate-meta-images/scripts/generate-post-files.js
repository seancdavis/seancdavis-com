const faker = require("faker");
const fs = require("fs");
const glob = require("glob");
const path = require("path");
const slugify = require("slugify");
const yaml = require("yaml");

const postsDir = path.join(__dirname, "../content");

// Create posts directory if it doesn't exist.
const initDir = () => {
  if (fs.existsSync(postsDir)) {
    glob.sync(`${postsDir}/*.md`).map((f) => fs.unlinkSync(f));
  } else {
    fs.mkdirSync(postsDir);
  }
};

// Convert a post object into a string that can be written to file.
const formatMarkdown = (post) => {
  const { body } = post;
  delete post.body;
  return `---\n${yaml.stringify(post)}---\n\n${body}\n`;
};

// Generates random post content using faker.
const generateRandomPost = () => {
  return {
    title: faker.lorem.words(5),
    date: faker.date.past(1),
    author: faker.name.findName(),
    body: faker.lorem.paragraphs(3).replace(/\n/gi, "\n"),
  };
};

// Generate a random markdown file.
const generateFile = () => {
  const post = generateRandomPost();
  // Resolve filename and start over if the file already exists.
  const basename = slugify(post.title, { strict: true, lower: true });
  const filename = `${basename}.md`;
  const filePath = path.join(postsDir, filename);
  if (fs.existsSync(filePath)) {
    console.log("Found duplicate file. Trying again ...");
    return generateFile();
  }
  // Format the content and write to file.
  const content = formatMarkdown(post);
  fs.writeFileSync(filePath, content);
};

// Do the loop
const run = (dest) => {
  initDir(dest);
  const iterator = [...Array(10)];
  return iterator.map(() => generateFile(dest));
};

run();
