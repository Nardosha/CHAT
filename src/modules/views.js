import { UI, usersList } from "./variables.js";
// import Socket from "./socket.js";
import { socket } from "./socket.js";
import {formatMessage, getToken} from "./authHelper.js";
import Message from "./Message.js";
import { isOwner } from './auth.js'


function submitHandler(e) {
  e.preventDefault();
  console.log("submitHandler");

  let messageValue = UI.MESSAGE.INPUT.value;
  if (!messageValue) return;

  socket.send(messageValue);
  UI.MESSAGE.INPUT.value = "";
}


function scroll() {
  setTimeout(() => {
    const target = UI.MESSAGE.CONTAINER.lastElementChild;
    target.scrollIntoView({ block: "center", behavior: "smooth" });
  })
}

function changeNickname(newName) {
  Array.from(UI.MESSAGE.CONTAINER.querySelectorAll('.own .nickname')).map(
    name=> name.textContent = newName);
}

function messageRender(message) {
  // const d = "{\"_id\":\"6292408f4eebda0016c484a3\",\"text\":\"test 39\",\"user\":{\"email\":\"tennisistka.70@gmail.com\",\"name\":\"tennisistka.70@gmail.com\"},\"createdAt\":\"2022-05-28T15:32:31.610Z\",\"updatedAt\":\"2022-05-28T15:32:31.610Z\",\"__v\":0}"
  const user = usersList.get(getToken());
  // const messageData = formatMessage(user, message)
  console.log(message)
  const newMessage = new Message(message);

  console.log(user);
  console.log("messageRender", newMessage);

  newMessage.print();
  scroll();
}

export { submitHandler, scroll, changeNickname, messageRender };
