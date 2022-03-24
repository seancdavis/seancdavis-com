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
exports.generateImages = void 0;
const post_utils_1 = require("./utils/post-utils");
const background_utils_1 = require("./utils/background-utils");
const generator_1 = require("./generator");
/**
 * Looks for eligible posts that don't have an image and generates one for each.
 * It then generates a second image with the title to be used as the meta image.
 * After uploading both to S3, it adds the appropriate properties to the content
 * piece.
 */
function generateImages(config) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const post of (0, post_utils_1.postsWithoutImage)(config.postsDir)) {
            const bgConfig = (0, background_utils_1.getRandomBackground)();
            const generator = new generator_1.Generator({ post, bgConfig });
            const { featuredImagePath } = yield generator.run();
            console.log(featuredImagePath);
        }
    });
}
exports.generateImages = generateImages;
