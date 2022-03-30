"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishPosts = void 0;
const Post_1 = require("./lib/Post");
const notion_utils_1 = require("./utils/notion-utils");
// TODO:
//
// - [x] Retrieve post and first level of blocks from database
// - [x] Resolve post properties
// - [ ] Add property validations in Post constructor.
// - [ ] Create new post file
// - [ ] Write frontmatter to file
// - [ ] Build block mapper
// - [ ] Update status, publish date, and link for the Notion page
// - [ ] Account for children in blocks only where necessary (lists?)
// - [ ] Account for pagination in blocks
// - [ ] Account for duplicate posts (or just override?)
// - [ ] Support guest author?
//      - If doing this, should probably also support adding an image. Not sure
//        this is the right more right now.
/**
 *
 */
function publishPosts(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageIds = yield (0, notion_utils_1.getPendingPageIds)();
        for (const pageId of pageIds) {
            // const post = new Post(pageId);
            // console.log(post);
            const post = yield Post_1.Post.create(pageId);
        }
    });
}
exports.publishPosts = publishPosts;
