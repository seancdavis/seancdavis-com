import Clipboard from "clipboard";

onInit(() => {
  const selector = ".component--copy-button";
  const triggers = document.querySelectorAll(selector);
  if (triggers.length === 0) return;
  const clipboard = new Clipboard(selector);

  clipboard.on("success", () => {
    if (App?.Alert) {
      App.Alert.show("URL copied to clipboard.");
    }
  });
});
