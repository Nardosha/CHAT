import { UI } from "./variables.js";
import { openPopup } from "./popup.js";

function authHandler(e) {
  console.log("AUTH");
  e.preventDefault();
  const email = UI.AUTH_INPUT.value;
  new Promise((resolve, reject) => {
    resolve(authUser(email));
  })
    .then((res) => {
      console.log(res);
      openPopup(UI.POPUP_KEY);
    })
    .catch((e) => {
      alert("Ошибка авторизации!");
      console.log(e);
    });
}

async function authUser(email) {
  const url = "https://mighty-cove-31255.herokuapp.com/api/user";

  const params = {
    email: email,
  };

  const response = await fetch(url, {
    method: "POST",
    body: new URLSearchParams(params),
  });
  const data = await response.json();
  return data;
}

export { authHandler };
