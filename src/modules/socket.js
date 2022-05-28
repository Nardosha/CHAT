import {formatMessage, getToken} from "./authHelper.js";
import {URL, usersList} from "./variables.js";
import Message from "./Message.js";
import {isOwner} from "./auth.js";
import {messageRender} from './views.js'

console.log("socket");

class Socket {
  constructor() {
    this.token = getToken();
    this.url = URL.SOCKET;
    this.socketUrl = `${this.url + this.token}`;
    this.socket = new WebSocket(this.socketUrl);
  }

  init() {
    console.log("INIT")
    this.socket = new WebSocket(this.socketUrl);
    this.socketLiseners();
    // this.socket.addEventListener("open", this.onOpen);
    // this.socket.addEventListener("message", this.onMessage);
    // this.socket.addEventListener("close", this.onClose);
    // this.socket.addEventListener("error", this.onError);

    console.log("INIT socket", this.socket);

  }

  socketLiseners() {
    this.socket.onopen = e => {
      console.log("OPEN", e);
    }

    this.socket.onmessage = e => {
      console.log(e)
      if (e.isTrusted) {

        const data = JSON.parse(e.data);
        messageRender(data)
        console.log(usersList)
      }


      // console.log("MESSAGE", e);
      // const user = usersList.get(getToken());
      // const messageData = formatMessage(user, e.data)
      // const newMessage = new Message(data);
      //
      // console.log('FROM SOCKET', user);
      // console.log('FROM SOCKET', newMessage);
      //
      // newMessage.print();
    }

    this.socket.onclose = e => {
      console.log("CLOSE", e);
      setTimeout(() => {
        console.log("Переподключение");
        console.log(this)
        this.init();
      });
    }

    this.socket.onerror = e => {
      console.log("ERROR", this.socket, e);
      setTimeout(() => {
        console.log("Переподключение");
        this.init();
      });
    }
  }

  send(data) {
    console.log("send", data);
    try {
      const message = JSON.stringify({text: data})
      this.socket.send(message);
    } catch (e) {
      console.log(e)
    }
  }

  // onOpen(e) {
  //   console.log("socket", this.socket);
  //
  //   console.log("OPEN", e);
  // }

  // onMessage(e) {
  //   console.log("MESSAGE", e);
  //   const user = usersList.get(getToken());
  //   const messageData = formatMessage(user, e.data)
  //   const newMessage = new Message(messageData);
  //
  //   console.log('FROM SOCKET', user);
  //   console.log('FROM SOCKET', newMessage);
  //
  //   newMessage.print();
  // }

  // onClose(e) {
  //   console.log("CLOSE", e);
  //   setTimeout(() => {
  //     console.log("Переподключение");
  //     console.log(this)
  //     this.init();
  //   });
  // }

  // onError(e) {
  //   console.log("ERROR", e);
  // }
}


export const socket = new Socket();
