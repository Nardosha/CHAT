import {UI, usersList} from "./variables.js";
import { closePopup, openPopup } from "./popup.js";
import { getUserInfo, requestAuthUser, requestChangeName, getMessageHistory } from "./api.js";
import User from "./User.js";
import { changeNickname, scroll } from "./views.js";
import { saveToLocalStorage, getInputValue } from "./authHelper.js";
import Message from "./Message.js";

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

function saveUserToken(e) {
  e.preventDefault();
  const token = getInputValue(e);
  document.cookie = token;

  saveUserInfo(token)
  saveToLocalStorage("user_key", token);

  closePopup(UI.POPUPS.KEY.POPUP);
  console.log("saveUserToken", token);
  loadMessages(token)
}

function loadMessages(token) {
  const data = getMessageHistory(token)
  data.then((res) => {
    console.log(res)
    res.map(message => {
      let newMessage = new Message(message)
      newMessage.isOwn = isOwner(newMessage.email)
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
    const token = document.cookie;
    const response = await requestChangeName(newName, token);

    const user = usersList.get(token);
    user.setNewName(response.name);
    user.setLocal()
    changeNickname(response.name);

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

export { authHandler, saveUserToken, changeNicknameHandler };
