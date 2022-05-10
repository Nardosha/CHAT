import { UI } from "./variables.js";

export function getInputValue(e) {
  const input = e.target.querySelector(".form-input");
  const value = input.value;
  if (!value) throw new Error("Некорректные данные!");
  clearInput(input);
  return value;
}

export function clearInput(el) {
  if (el === UI.POPUPS.AUTH.INPUT || !el) return;
  el.value = "";
}

export function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    alert(e);
    console.log(e);
  }

  console.log("saveToLocalStorage");
}
