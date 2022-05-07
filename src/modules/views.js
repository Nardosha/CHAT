import { UI } from "./variables.js";

function submitHandler(e) {
  e.preventDefault();
  let messageValue = UI.MESSAGE_INPUT.value;
  if (!messageValue) return;

  printMessage(messageValue);
  scroll();
  UI.MESSAGE_INPUT.value = "";
}

function printMessage(text) {
  const templateText =
    UI.MESSAGE_TEMPLATE.content.querySelector(".message__text");
  const templateUsername =
    UI.MESSAGE_TEMPLATE.content.querySelector(".message__user");
  const templateDate =
    UI.MESSAGE_TEMPLATE.content.querySelector(".message__time");
  const templateAvatar = UI.MESSAGE_TEMPLATE.content.querySelector("img");

  templateText.innerHTML = text;
  templateUsername.textContent = "Natosha";
  templateDate.textContent = "15:30";

  const message = UI.MESSAGE_TEMPLATE.content.cloneNode(true);
  UI.MESSAGE_CONTAINER.append(message);
}

function scroll() {
  const target = UI.MESSAGE_CONTAINER.lastElementChild;
  target.scrollIntoView({ block: "center", behavior: "smooth" });
}

export { submitHandler };

export { printMessage, scroll };
