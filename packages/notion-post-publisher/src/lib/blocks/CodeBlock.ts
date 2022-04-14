import type { NotionCodeBlock, NotionRichText } from "../../types/notion";

const LanguageMap: { [key: string]: string } = {
  "plain text": "txt",
  javascript: "js",
};

export class CodeBlock {
  code: string;
  language: string;

  constructor(params: NotionCodeBlock) {
    this.language = this.languageKey(params.code.language);
    this.code = this.extractCode(params.code.rich_text);
  }

  render() {
    return `\`\`\`${this.language}\n${this.code}\n\`\`\``;
  }

  /**
   * Combines the text from the rich_text array.
   */
  private extractCode(richText: NotionRichText[]): string {
    return richText.map((txt) => txt.plain_text).join("");
  }

  /**
   * Find the appropriate language to use for the markdown code block.
   */
  private languageKey(language: string): string {
    if (Object.keys(LanguageMap).includes(language)) {
      return LanguageMap[language];
    }
    return language;
  }
}
