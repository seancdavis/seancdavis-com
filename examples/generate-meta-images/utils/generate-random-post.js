const faker = require("faker");

/**
 * Use faker to generate a random post object. This is the shape of the object
 * used throughout the project.
 *
 * @returns object
 */
module.exports = () => {
  return {
    title: faker.lorem.words(5),
    date: faker.date.past(1),
    author: faker.name.findName(),
    body: faker.lorem.paragraphs(3).replace(/\n/gi, "\n"),
  };
};
