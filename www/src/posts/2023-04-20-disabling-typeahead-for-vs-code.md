---
title: Disabling Typeahead for VS Code
description: >-
  Settings to disabling various methods that provide typeahead functionality in
  VS Code.
tags:
  - vscode
tweet: >-
  This is one of those *for me* blog posts that you might also find useful. I
  like to disable typeahead functionality when recording tutorials
  (intellisense, Copilot, etc.) and I can never remember the right settings.
image: /posts/230420/disabling-typeahead-for-vs-code-oyo8OcJd.png
seo:
  image: /posts/230420/disabling-typeahead-for-vs-code-SCTY8Fzx--meta.png
---

Here are a series of settings that disable various typeahead functionality with VS Code.

## Disabling Intellisense / Suggestions

VS Code has a built-in code suggestion feature. I love this when I'm writing code, but it's in the way when I'm teaching. These settings disable it.

`.vscode/settings.json` {.filename}

```json
{
  "editor.quickSuggestions": {
    "comments": "off",
    "other": "off",
    "strings": "off"
  },
  "editor.suggestOnTriggerCharacters": false,
  "editor.parameterHints.enabled": false
}
```

## Disabling CodeLens

CodeLens can be used by various extensions to help introspect your code. It's also super useful when writing code, but gets in the way when I'm hovering over items when teaching. (Sometimes I keep this turned one on depending on the subject.)

`.vscode/settings.json` {.filename}

```json
{
  "editor.codeLens": false
}
```

## Disabling GitLens

[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) provides some great information about changes to a particular file directly in the code. But it is _super_ distracting when the information is not helpful. This will disable it.

`.vscode/settings.json` {.filename}

```json
{
  "gitlens.codeLens.recentChange.enabled": false,
  "gitlens.codeLens.authors.enabled": false,
  "gitlens.codeLens.enabled": false,
  "gitlens.currentLine.enabled": false
}
```

## Disabling Copilot

GitHub Copilot (paid) uses AI to suggest code. Although I use it in practice, I find it distracting when recording a coding tutorial. This is the setting to disable it.

`.vscode/settings.json` {.filename}

```json
{
  "github.copilot.enable": {
    "*": false
  }
}
```

## Disable All of the Above

Here is all the code above pulled together in one settings snippet.

`.vscode/settings.json` {.filename}

```json
{
  "editor.quickSuggestions": {
    "comments": "off",
    "other": "off",
    "strings": "off"
  },
  "editor.suggestOnTriggerCharacters": false,
  "editor.parameterHints.enabled": false,
  "github.copilot.enable": {
    "*": false
  },
  "editor.codeLens": false,
  "gitlens.codeLens.recentChange.enabled": false,
  "gitlens.codeLens.authors.enabled": false,
  "gitlens.codeLens.enabled": false,
  "gitlens.currentLine.enabled": false
}
```
