export const UI = {
  BODY: document.querySelector("body"),

  POPUPS: {
    LINKS: document.querySelectorAll(".popup-link"),
    CLOSE_ICON: document.querySelectorAll(".popup-close"),

    AUTH: {
      POPUP: document.getElementById("popup-auth"),
      FORM: document.getElementById("form-auth"),
      INPUT: document.getElementById("input-auth"),
    },

    KEY: {
      POPUP: document.getElementById("popup-confirm"),
      FORM: document.getElementById("form_confirm"),
      INPUT: document.getElementById("input-key"),
    },

    SETTINGS: {
      POPUP: document.getElementById("popup-settings"),
      FORM: document.getElementById("form_settings"),
      INPUT: document.getElementById("input-nickname"),
    },
  },

  MESSAGE: {
    OWN: document.querySelectorAll(".own"),
    OWN_NICKNAME: document.querySelectorAll(".nickname"),
    INPUT: document.getElementById("input-message"),
    FORM: document.getElementById("form-message"),
    CONTAINER: document.querySelector(".message__container"),
    TEMPLATE: document.getElementById("message-template"),
  },
};

export const defaultUserName = {
  NAME: "username",
};

export const URL = {
  AUTH: "https://mighty-cove-31255.herokuapp.com/api/user",
  USER_INFO: "https://mighty-cove-31255.herokuapp.com/api/user/me",
  MESSAGE: "https://mighty-cove-31255.herokuapp.com/api/user",
  SOCKET: "https://mighty-cove-31255.herokuapp.com/api/user",
};

export const usersList = new Map();
