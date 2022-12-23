import axios from "axios";

const MASTODON_USER_NAME = "squirrel_lee";

const searchUrl =
  process.env.MASTODON_BASE_URL + "/api/v2/search" + `?q=${MASTODON_USER_NAME}`;
const response = await axios.get(searchUrl);
const {
  data: { accounts },
} = response;

console.log("USER ID:", accounts[0]?.id || "NOT FOUND");
