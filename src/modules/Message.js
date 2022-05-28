import { UI } from "./variables.js";
import {getFromLocalStorage, getToken} from "./authHelper.js";
import {getUserInfo} from "./api.js";

export default class Message {
  constructor({ user: { email, name }, text, createdAt, updatedAt, _id }) {
    this.email = email;
    this.name = name;
    this.text = text;
    this.createdAt = createdAt || new Date().getDate()
    this.updatedAt = updatedAt;
    this.id = _id;
    this.isOwn = false;
  }

  checkIsOwn() {
    const savedEmail = getFromLocalStorage('user_auth').email;
    const token = getFromLocalStorage('user_key');
    this.isOwn = this.email === savedEmail
    if (this.isOwn) {
      this.name = getFromLocalStorage('user_auth').name;
    }

  }

  print() {
    this.checkIsOwn()

    this.messageText =
      UI.MESSAGE.TEMPLATE.content.querySelector(".message__text");
    this.messageUsername =
      UI.MESSAGE.TEMPLATE.content.querySelector(".message__user");
    this.messageDate =
      UI.MESSAGE.TEMPLATE.content.querySelector(".message__time");
    this.messageAvatar = UI.MESSAGE.TEMPLATE.content.querySelector("img");

    this.messageText.innerHTML = this.text;
    console.log('NAME', this.name)
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
