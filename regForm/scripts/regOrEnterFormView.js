import {controller} from './mvc_regForm.js';

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
        regForm.querySelector('[name="userPhone"]').addEventListener('input', (event) => controller.phoneFieldInput(event));
        regForm.querySelector('[name = "userLogin"]').addEventListener('input', (event) => controller.loginPasswordFieldAdd(event));
        regForm.querySelector('[name = "userPassword"]').addEventListener('input', (event) => controller.loginPasswordFieldAdd(event));
        regForm.querySelector('.showPassword').addEventListener('click', (event) => controller.showPassword(event));
        regForm.addEventListener('keydown', (event) => controller.enterOnField(event));

        
        loginForm.addEventListener('submit', (event) => controller.loginFormDataToModel(event));
        loginForm.addEventListener('focusin', (event) => controller.formFieldFocus(event));
        loginForm.addEventListener('focusout', (event) => controller.fieldDataValidation(event));
        loginForm.querySelector('.showPassword').addEventListener('click', (event) => controller.showPassword(event));
        loginForm.addEventListener('keydown', (event) => controller.enterOnField(event));
    }

    createNotificationFormElem(target, text) {
        let notivElem = document.createElement('div');
        notivElem.innerHTML = text;
        notivElem.classList.add('notificationFormElem');

        target.style.border = '2px solid red';
        try {
            let targetContainer = target.closest('.inputContainer');
            console.log(target, targetContainer);
            targetContainer.append(notivElem);
        } catch (err) {
            console.log(err.stack);
        };
    }

    removeNotificationFormElem (target) {
        //обнуляем стили поля ввода, добавленные в createNotificationFormElem.
        try {
            target.style = null;
            //для политики обработки данных.
            if (target.closest('.registrFormPolicyAgree')) target.closest('.registrFormPolicyAgree').style = null;
            let notivElem = target.closest('.inputContainer').querySelector('.notificationFormElem');
            if (notivElem) notivElem.remove();
        } catch (err) {
            console.log(err.stack);
        }
    }

    createIncorrectNotification() {
        let incorrectNotificationElem = document.createElement('div');
        incorrectNotificationElem.className = 'incorrectNotif';
        incorrectNotificationElem.innerHTML = `Entered login or password is incorrect, please try again or use <a href='http://localhost:3000/#regFormContainer'>register form</a> to create new user.`;
        try {
        loginForm.querySelector('.registrFormSubmit').append(incorrectNotificationElem);
        } catch (err) {
            console.log(err.stack);
        };
    }
}