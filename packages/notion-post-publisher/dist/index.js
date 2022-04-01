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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishPosts = void 0;
const Post_1 = require("./lib/Post");
const notion_utils_1 = require("./utils/notion-utils");
const chalk_1 = __importDefault(require("chalk"));
/**
 *
 */
function publishPosts(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const pageIds = yield (0, notion_utils_1.getPendingPageIds)();
        for (const pageId of pageIds) {
            try {
                const post = yield Post_1.Post.create(pageId);
                const filename = yield post.writeToFile(config.postsDir);
                console.log(chalk_1.default.green.bold("[success]"), `Added post: ${filename}`);
            }
            catch (err) {
                if (err instanceof Error) {
                    console.error(chalk_1.default.red.bold("[error]"), err.message);
                    console.error(`Failed on Notion page: ${pageId}`);
                }
                process.exit(1);
            }
        }
    });
}
exports.publishPosts = publishPosts;
