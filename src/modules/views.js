import { UI } from "./variables.js";

function submitHandler(e) {
  e.preventDefault();
  let messageValue = UI.MESSAGE.INPUT.value;
  if (!messageValue) return;

  // printMessage(messageValue);
  scroll();
  UI.MESSAGE.INPUT.value = "";
}

function scroll() {
  const target = UI.MESSAGE.CONTAINER.lastElementChild;
  target.scrollIntoView({ block: "center", behavior: "smooth" });
}

function changeNickname(newName) {
  console.log(Array.from(UI.MESSAGE.OWN_NICKNAME))
  Array.from(UI.MESSAGE.OWN_NICKNAME).map(name => name.textContent = newName)
}

export { submitHandler, scroll, changeNickname };

