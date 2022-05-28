export const UI = {
  BODY: document.querySelector("body"),
  CHAT_NAME: document.querySelector('.chat_name'),

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
    OWN_NICKNAME: document.querySelectorAll(".message__user.nickname"),
    INPUT: document.getElementById("input-message"),
    FORM: document.getElementById("form-message"),
    CONTAINER: document.querySelector(".message__container"),
    TEMPLATE: document.getElementById("message-template"),
  },
};

export const URL = {
  AUTH: "https://mighty-cove-31255.herokuapp.com/api/user",
  USER_INFO: "https://mighty-cove-31255.herokuapp.com/api/user/me",
  HISTORY: "https://mighty-cove-31255.herokuapp.com/api/messages",
  SOCKET: `ws://mighty-cove-31255.herokuapp.com/websockets?`,
};

export const usersList = new Map();
