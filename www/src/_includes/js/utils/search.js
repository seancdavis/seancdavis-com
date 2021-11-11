import algoliasearch from "algoliasearch/lite";
import instantsearch from "instantsearch.js";
import { searchBox, hits } from "instantsearch.js/es/widgets";

onInit(() => {
  const el = document.getElementById("search-page-content");
  if (!el) return;

  const searchClient = algoliasearch(
    "YBEAPU4J0W",
    "40923c0e59f7d0b4a3bb6a6708bfb069"
  );

  const search = instantsearch({
    indexName: "netlify_e4573f7c-db71-4713-864b-2a907bff675a_main_all",
    searchClient,
  });

  search.addWidgets([
    searchBox({
      container: "#search-box",
      autofocus: true,
    }),

    hits({
      container: "#hits",
      cssClasses: {
        item: "component--post-card max-w-xl bg-white shadow-sm mb-0",
      },
      templates: {
        item(hit) {
          let image = "";

          if (hit.image) {
            image = `
              <div class="post-card--image-wrapper">
                <img src="${hit.image}" />
              </div>`;
          }

          return `
            <div>
              ${image}
              <div class="p-4">
                <h2 class="text-2xl mb-1">
                  <a href="${hit.pathname}" class="link-transition">
                    ${hit.title}
                  </a>
                </h2>
                <p class="post-card--description">${hit.description}</p>
              </div>
            </div>
          `;
        },
      },
    }),
  ]);

  search.start();
});
