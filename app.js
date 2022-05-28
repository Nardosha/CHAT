import {getPopupName, closePopup, ready, openPopup} from "./src/modules/popup.js";
import { UI } from "./src/modules/variables.js";
import {submitHandler} from "./src/modules/views.js";
import {authHandler, saveUserToken, changeNicknameHandler} from "./src/modules/auth.js";
import {checkAuth} from "./src/modules/authHelper.js";


UI.POPUPS.LINKS.forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        console.log('LISTENER.POPUP_LINKS')
        getPopupName(link);
    });
});


UI.POPUPS.CLOSE_ICON.forEach(closeIcon => {
    closeIcon.addEventListener("click", (e) => {
        e.preventDefault()
        const currentPopup = closeIcon.closest('.popup')

        if (currentPopup.id === 'popup-auth') {
            alert('Введите почту!')
            return
        }
        closePopup(currentPopup)

        if (currentPopup.id === 'popup-confirm') {
            openPopup(UI.POPUPS.AUTH.POPUP)
        }
    })
})

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded')
    checkAuth()
})

UI.POPUPS.AUTH.FORM.addEventListener("submit", authHandler)
UI.POPUPS.KEY.FORM.addEventListener("submit", saveUserToken)
UI.POPUPS.SETTINGS.FORM.addEventListener('submit', changeNicknameHandler)

UI.MESSAGE.FORM.addEventListener('submit', submitHandler)
