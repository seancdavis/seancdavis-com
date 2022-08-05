"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlock = void 0;
const LanguageMap = {
    "plain text": "txt",
    javascript: "js",
    typescript: "ts",
    markdown: "md",
};
class CodeBlock {
    constructor(params) {
        this.language = this.languageKey(params.code.language);
        this.code = this.extractCode(params.code.rich_text);
    }
    render() {
        return `\`\`\`${this.language}\n${this.code}\n\`\`\``;
    }
    /**
     * Combines the text from the rich_text array.
     */
    extractCode(richText) {
        return richText.map((txt) => txt.plain_text).join("");
    }
    /**
     * Find the appropriate language to use for the markdown code block.
     */
    languageKey(language) {
        if (Object.keys(LanguageMap).includes(language)) {
            return LanguageMap[language];
        }
        return language;
    }
}
exports.CodeBlock = CodeBlock;
