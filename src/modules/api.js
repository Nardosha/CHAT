import { URL } from "./variables.js";

export async function requestAuthUser(email) {
  const params = {
    email: email,
  };
  const options = {
    method: "POST",
    body: new URLSearchParams(params),
  };

  try {
    const response = await fetch(URL.AUTH, options);
    const data = await response.json();
    return data;
  } catch (e) {
    throw Error(`Ошибка: ${e}`);
  }
}

export async function requestChangeName(newName, token) {
  const params = {
    name: newName,
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = {
    method: "PATCH",
    body: new URLSearchParams(params),
    headers,
  };
  try {
    const response = await fetch(URL.AUTH, options);
    const data = await response.json();
    return data;
  } catch (e) {
    throw Error(`Ошибка: ${e}`);
  }
}

export async function getUserInfo(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(URL.USER_INFO, options);
    const data = await response.json();
    return data;
  } catch (e) {
    alert(e);
    console.log(`Ошибка: ${e}`);
  }
}

export async function getMessageHistory(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(URL.HISTORY, options);
    const data = await response.json();
    return data.messages.splice(0, 5);
  } catch (e) {
    alert(e);
    console.log(`Ошибка: ${e}`);
  }
}
