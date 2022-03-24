import type { Post } from "./post-utils";
import type { ResolvedBackgroundConfig } from "./background-utils";

export class Canvas {
  constructor({
    post,
    bgConfig,
  }: {
    post: Post;
    bgConfig: ResolvedBackgroundConfig;
  }) {
    console.log("I AM CANVAS", { post, bgConfig });
  }
}
