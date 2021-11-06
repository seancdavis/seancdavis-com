export class Alert {
  constructor() {
    this.el = document.getElementById("component--alert");
    this.timeoutId = undefined;
    this.bindEvents();
  }

  bindEvents() {
    const closeTriggerEl = this.el.querySelector('[data-alert="close"]');
    closeTriggerEl.addEventListener("click", () => this.hide());
  }

  update(text) {
    const textEl = this.el.querySelector('[data-alert="text"]');
    textEl.innerText = text;
  }

  show(text) {
    if (text) this.update(text);
    this.el.classList.remove("slide-out");
    this.el.classList.add("slide-in");
    this.timeoutId = setTimeout(() => this.hide(), 3000);
  }

  hide() {
    this.el.classList.remove("slide-in");
    this.el.classList.add("slide-out");
  }
}
