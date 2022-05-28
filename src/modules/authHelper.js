import {UI, usersList} from "./variables.js";
import {ready} from "./popup.js";
// import Socket from "./socket.js";
import {socket} from "./socket.js";
import { loadMessages } from './auth.js'
import {getUserInfo} from "./api.js";
import User from "./User.js";

export function getInputValue(e) {
  const input = e.target.querySelector(".form-input");
  const value = input.value;
  if (!value) throw new Error("Некорректные данные!");
  clearInput(input);
  return value;
}

export function getToken() {
  if (document.cookie) {
    const token = document.cookie.replaceAll('=', '')
    console.log('FROM COOKIE', token)
    return token
  }
  console.log('getToken')

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

export function getFromLocalStorage(key) {
  console.log("getFromLocalStorage");

  try {
    const user = JSON.parse(localStorage.getItem(key));
    console.log('FROM LOCAL', user)
    return user
  } catch (e) {
    alert(e);
    console.log(e);
  }
}


export function saveCookie(token) {
  document.cookie = token;
}

export async function checkAuth() {
  console.log('checkAuth')

  try {
    const tokenFromLocal = getFromLocalStorage("user_key");
    const tokenFromCookie = getToken()
    console.log('tokenFromLocal', tokenFromLocal, 'tokenFromCookie', tokenFromCookie)

    if (tokenFromCookie !== tokenFromLocal) {
      console.log(tokenFromLocal, tokenFromCookie)
      ready();
      return
    }
    const userInfo = await getUserInfo(tokenFromLocal)
    const user = new User({
      email: userInfo.email,
      name: userInfo.name,
      key: userInfo.token,
      id: userInfo._id,
    });
    console.log(user)
    usersList.set(user.key, user);
    loadMessages(tokenFromCookie)
    socket.init();
    console.log(usersList)

  } catch (e) {
    console.log('checkAuth', e)
  }



}

export function formatMessage(userInfo, message) {
  const date = new Date().getDate();
  return {
    user: {
      email: userInfo.email,
      name: userInfo.name,
    },
    text: message,
    createdAt: date,
    updatedAt: date,
    _id: userInfo.id,
  };
}