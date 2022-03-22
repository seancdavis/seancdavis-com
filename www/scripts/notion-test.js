const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

(async () => {
  // const response = await notion.search({
  //   query: "content",
  //   sort: {
  //     direction: "ascending",
  //     timestamp: "last_edited_time",
  //   },
  // });
  // console.log(response);

  // const database = await notion.databases.retrieve({
  //   database_id: process.env.NOTION_DATABSE_ID,
  // });
  // console.log(database);

  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABSE_ID,
    filter: {
      property: "Status",
      select: {
        equals: "Draft: Ready",
      },
    },
  });
  const pageIds = (response.results || []).map((res) => res.id);
  console.log(pageIds);
})();
