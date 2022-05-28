import {UI, usersList, URL} from "./variables.js";
import { closePopup, openPopup } from "./popup.js";
import { getUserInfo, requestAuthUser, requestChangeName, getMessageHistory } from "./api.js";
import User from "./User.js";
import { changeNickname, scroll } from "./views.js";
import { saveToLocalStorage, getInputValue, getToken, saveCookie } from "./authHelper.js";
import Message from "./Message.js";
// import Socket from "./socket.js";
import {socket} from "./socket.js";

async function authHandler(e) {
  console.log("authHandler");
  e.preventDefault();

  try {
    const email = getInputValue(e);
    await requestAuthUser(email);

    openPopup(UI.POPUPS.KEY.POPUP);
  } catch (e) {
    alert(e);
    console.log(e);
  }
}

async function saveUserToken(e) {
  console.log('saveUserToken')
  e.preventDefault();
  const token = getInputValue(e);

  saveCookie(token)
  saveUserInfo(token)
  saveToLocalStorage("user_key", token);

  closePopup(UI.POPUPS.KEY.POPUP);

  await loadMessages(token)
  socket.init();
}

function loadMessages(token) {
  console.log("loadMessages");

  const data = getMessageHistory(token)
  data.then((res) => {
    console.log(res)
    res.map(message => {
      console.log(message)
      let newMessage = new Message(message)
      newMessage.print()

      scroll()
    })
  })

}

async function changeNicknameHandler(e) {
  e.preventDefault();
  const newName = getInputValue(e);
  if (!newName) return;

  try {
    //TODO: need some validation method!
    changeNickname(newName);
    const token = getToken()
    const response = await requestChangeName(newName, token);

    const user = usersList.get(token);
    user.setNewName(response.name);
    user.setLocal()

    console.log("changeNicknameHandler", user);
  } catch (e) {
    alert(e);
    console.log(e);
  } finally {
    closePopup(UI.POPUPS.SETTINGS.POPUP);
  }
}

function isOwner(email) {
  const currentUser = localStorage.getItem('user_auth');
  const currentEmail = JSON.parse(currentUser).email;
  return currentEmail === email
}

async function saveUserInfo(token) {
  console.log('saveUserInfo')
  try {
    const userInfo = await getUserInfo(token);
    const user = new User({
      email: userInfo.email,
      name: userInfo.name,
      key: userInfo.token,
      id: userInfo._id,
    });
    user.setLocal();
    usersList.set(user.key, user);

    changeNickname(user.name)
    console.log("saveUserInfo", user);
  } catch (e) {
    alert(e);
    console.log(e);
  }
}

export { authHandler, saveUserToken, changeNicknameHandler, loadMessages, isOwner};
