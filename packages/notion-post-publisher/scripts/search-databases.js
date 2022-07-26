const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// IMPORTANT: Databases must be shared with the integration to be searchable.

(async () => {
  const response = await notion.search({
    query: "playground",
    filter: {
      property: "object",
      value: "database",
    },
    sort: {
      direction: "ascending",
      timestamp: "last_edited_time",
    },
  });
  console.log(response);
})();
