import {controller} from './mvc_regForm.js';
import {view as header_view} from '/header/scripts/mvc_header.js';

let regForm = document.querySelector('.registrForm');
let loginForm = document.querySelector('.loginForm');

export class View {
    constructor() {
        this.addFormListeners();
    }

    addFormListeners() {
    
        regForm.addEventListener('submit', (event) => controller.formDataToModel(event));
        regForm.addEventListener('focusin', (event) => controller.formFieldFocus(event));
        regForm.addEventListener('focusout', (event) => controller.fieldDataValidation(event));
        regForm.querySelector('[name="userPhone"]').addEventListener('input', (event) => controller.phoneFieldAdd(event));
        regForm.addEventListener('keydown', (event) => controller.enterOnField(event));

        
        loginForm.addEventListener('submit', (event) => controller.loginFormDataToModel(event));
        loginForm.addEventListener('focusin', (event) => controller.formFieldFocus(event));
        loginForm.addEventListener('focusout', (event) => controller.fieldDataValidation(event));
        loginForm.addEventListener('keydown', (event) => controller.enterOnField(event));
    }

    createNotificationFormElem(target, text) {
        let notivElem = document.createElement('div');
        notivElem.innerHTML = text;
        notivElem.classList.add('notificationFormElem');

        target.style.border = '2px solid red';
        let targetContainer = target.closest('.inputContainer');
        console.log(target, targetContainer);
        targetContainer.append(notivElem);
    }

    removeNotificationFormElem (event) {
        let notivElem = event.target.closest('.inputContainer').querySelector('.notificationFormElem');
        if (notivElem) notivElem.remove();
    }

    createIncorrectNotification() {
        let incorrectNotificationElem = document.createElement('div');
        incorrectNotificationElem.className = 'incorrectNotif';
        incorrectNotificationElem.innerHTML = `Entered login or password is incorrect, please try again or use <a href='http://localhost:3000/#regFormContainer'>register form</a> to create new user.`;
        loginForm.querySelector('.registrFormSubmit').append(incorrectNotificationElem);
    }
}