import Clipboard from "clipboard";

onInit(() => {
  const selector = ".component--copy-button";
  const triggers = document.querySelectorAll(selector);
  if (triggers.length === 0) return;
  new Clipboard(selector);
});
