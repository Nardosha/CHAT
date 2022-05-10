import { UI } from "./variables.js";

export default class Message {
  constructor({ user: { email, name }, text, createdAt, updatedAt, _id }) {
    this.name = name;
    this.email = email;
    this.text = text;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = _id;
    this.isOwn = false;
  }

  print() {
    this.messageText =
      UI.MESSAGE.TEMPLATE.content.querySelector(".message__text");
    this.messageUsername =
      UI.MESSAGE.TEMPLATE.content.querySelector(".message__user");
    this.messageDate =
      UI.MESSAGE.TEMPLATE.content.querySelector(".message__time");
    this.messageAvatar = UI.MESSAGE.TEMPLATE.content.querySelector("img");

    this.messageText.innerHTML = this.text;
    this.messageUsername.textContent = this.name;
    this.messageDate.textContent = this.createdAt;

    this.messageItem = UI.MESSAGE.TEMPLATE.content.cloneNode(true);
    this.messageItem.querySelector(".message__item").id = this.id;

    if (this.isOwn) {
      this.messageItem.querySelector(".message__item").classList.add("own");
    }
    UI.MESSAGE.CONTAINER.append(this.messageItem);

    return this.messageItem;
  }
}
