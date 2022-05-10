import { UI } from "./variables.js";

function getPopupName(link) {
  const popupName = link.getAttribute("href").replace("#", "");
  const currentPopup = document.getElementById(popupName);
  openPopup(currentPopup);
}

function openPopup(currentPopup) {
  if (!currentPopup) return;
  const activePopup = document.querySelector(".popup._open");

  if (activePopup) {
    closePopup(activePopup);
  }

  currentPopup.classList.add("_open");
}

function closePopup(currentPopup) {
  if (!currentPopup) return;

  if (currentPopup.classList.contains("_open")) {
    currentPopup.classList.remove("_open");
  }
}

function ready() {
  openPopup(UI.POPUPS.AUTH.POPUP);
}

export { getPopupName, openPopup, closePopup, ready };
