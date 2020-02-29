import {model as model, view as view} from '/regForm/scripts/mvc_regForm.js';
import {view as header_view} from '/header/scripts/mvc_header.js';

export class Controller {

    formDataToModel(event) {
        event.preventDefault();
        
        for (let inputElem of event.target.querySelectorAll('.registrFormField')) {
            console.log(inputElem.name);
            if (!this.submitValidationField(inputElem) && inputElem.name != 'policyAgree') {
                console.log(inputElem.name + ': NOT valid');
                return false;
            };
        };
        //политика обработки данных
        let policyAgreeElem = event.target.querySelector('[name="policyAgree"]');
        if (policyAgreeElem.checked == false) {
            console.log(policyAgreeElem.name + ': False');
            view.createNotificationFormElem(policyAgreeElem.closest('.registrFormPolicyAgree'), 'Agree with information policy.');
            return false;
        };

        let formData = new FormData(event.srcElement);
        console.log(event);

        model.postRegFrom(formData);
    }

    loginFormDataToModel(event) {
        event.preventDefault();

        for (let inputElem of event.target.querySelectorAll('.registrFormField')) {
            console.log(inputElem.name);
            if (!this.submitValidationField(inputElem)) {
                console.log(inputElem.name + ': NOT valid');
                return false;
            }
        };

        let formData = new FormData(event.srcElement);
        console.log(event);

        model.postLoginFrom(formData);
    }

    formFieldFocus(event) {
        console.log(event.target.name +': focusIn');
        event.target.select();
        event.target.style = null;

        let targetContainer = event.target.closest('.inputContainer');
        if (targetContainer && targetContainer.querySelector('.notificationFormElem')) view.removeNotificationFormElem(event);
    }

    //Валидация поля при снятии с него фокусировки.
    fieldDataValidation(event) {
        console.log(event.target.name +': focusOut');
        //проверяем поля ввода.
        if (event.target.className == 'registrFormField' && !this.submitValidationField(event.target)) {
            return;
        };
        //проверка соглашения на обработку данных:
        if (event.target.name == 'policyAgree' && event.target.checked == false) {
            view.createNotificationFormElem(event.target.closest('.registrFormPolicyAgree'), 'Agree with information policy.');
        };

        //Проверка Логина на существование в форме регистрации;
        if (event.srcElement.form.className =="registrForm" && event.target.name == 'userLogin') {
            model.loginExistCheck(event.target.value)
                .then(res => {
                    console.log('login exist: ', res);   
                    if (res == 'false') view.createNotificationFormElem(event.target
                        , `This login is already exist. If you already registered
                        , use login form.`);
                });
        };
    }

    phoneFieldAdd(event) {
        //console.log(event.data, event.target.value);
        view.removeNotificationFormElem(event);
        //ТОЛЬКО ЧИСЛА ПРИ ВВОДЕ
        if (event.data && !event.data.match(/[1-9]/)) {
            console.log(event.data);
            event.target.value = event.target.value.slice(0, -1);
            view.createNotificationFormElem(event.target, 'Please, enter only numbers.');
        };

        //ФОРМАТ
        let symbolMap = new Map([[1, '('], [5, ')'], [9, '-'], [12, '-']]);
        if (symbolMap.has(event.target.value.length)) {
            //console.log('yes');
            event.target.value = event.target.value + symbolMap.get(event.target.value.length);
        };
        
        //ДЛИНА
        if (event.target.value[0] == '8' && event.target.value.length > 15) {
            event.target.value = event.target.value.slice(0, -1);
            view.createNotificationFormElem(event.target, 'For russian numbers this is max length.');
        }
    }

    submitValidationField(inputElem) {
        if (!inputElem.value || inputElem.value == inputElem.defaultValue) {
            console.log('validation');
            view.createNotificationFormElem(inputElem, 'Please, enter something in this field.');
            return false;
        };
        return true;
    }

    enterOnField(event) {
        console.log(event);
        if (event.code == 'Enter') {
            event.preventDefault();

            if (this.submitValidationField(event.target) && event.target.name != 'policyAgree') {
                let nextInputField = event.target.closest('.inputContainer').nextElementSibling.querySelector('.registrFormField');
                nextInputField.select();
            };
        }
    }

    incorrectFormData() {
        view.createIncorrectNotification();
    }

}