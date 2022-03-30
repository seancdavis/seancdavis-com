const path = require("path");
const {
  publishPosts,
} = require("../../packages/notion-post-publisher/dist/index");

publishPosts({ postsDir: path.join(__dirname, "../src/posts") }).then(() => {
  console.log("Done.");
});

// const { Client } = require("@notionhq/client");

// // Initializing a client
// const notion = new Client({ auth: process.env.NOTION_API_KEY });

// (async () => {
//   // const response = await notion.search({
//   //   query: "content",
//   //   sort: {
//   //     direction: "ascending",
//   //     timestamp: "last_edited_time",
//   //   },
//   // });
//   // console.log(response);

//   // const database = await notion.databases.retrieve({
//   //   database_id: process.env.NOTION_DATABSE_ID,
//   // });
//   // console.log(database);

//   const response = await notion.databases.query({
//     database_id: process.env.NOTION_DATABSE_ID,
//     filter: {
//       property: "Status",
//       select: {
//         equals: "Draft: Ready",
//       },
//     },
//   });
//   const pageIds = (response.results || []).map((res) => res.id);
//   // console.log(response.results[0]);

//   for (const pageId of pageIds) {
//     // const page = await notion.pages.retrieve({ page_id });
//     // console.log(page);

//     const blockRes = await notion.blocks.children.list({
//       block_id: pageId,
//     });
//     console.log(blockRes);
//   }
// })();
