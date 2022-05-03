import { getPopupName, closePopup, ready } from "./src/modules/popup.js";
import { UI } from "./src/modules/variables.js";
import {submitHandler} from "./src/modules/views.js";


UI.POPUP_LINKS.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    getPopupName(link);
  });
});

UI.POPUP_CLOSE_ICON.forEach(closeIcon => {
    closeIcon.addEventListener("click", (e) => {
        e.preventDefault()
        const currentPopup = closeIcon.closest('.popup')
        closePopup(currentPopup)
    })
})

UI.MESSAGE_FORM.addEventListener('submit', submitHandler)

