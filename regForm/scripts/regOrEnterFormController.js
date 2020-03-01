import {model as model, view as view} from '/regForm/scripts/mvc_regForm.js';
import {view as header_view} from '/header/scripts/mvc_header.js';
import {updateToTextsViewingPage} from '/textsViewingPage/updateToTextsViewingPage.js'

export class Controller {

    formDataToModel(event) {
        event.preventDefault();
        
        for (let inputElem of event.target.querySelectorAll('.inputContainer input')) {
            console.log(inputElem.name);
            if (!this.submitValidationField(inputElem) 
            ) {
                return false;
            };
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
        //удаляем элементы-нотификации.
        view.removeNotificationFormElem(event.target);
    }

    //Валидация поля при снятии с него фокусировки.
    fieldDataValidation(event) {
        console.log(event.target.name +': focusOut');
        //проверяем поля ввода.
        if (!this.submitValidationField(event.target)) {
            return;
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
        view.removeNotificationFormElem(event.target);
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

    //общая для всех полей (кроме policyAgree) проверка ввода
    submitValidationField(inputElem) {
        //если поле было снято с фокуса и повторно не прошло проверку - старую нотификацию удаляем. (также чинит когда значение менялось без focusin).
        view.removeNotificationFormElem(inputElem);
        //поля ввода данных (все кроме политики).
        if (inputElem.className == 'registrFormField' && (!inputElem.value || inputElem.value == inputElem.defaultValue)) {
            console.log('validation not passed: ', inputElem.name);
            view.createNotificationFormElem(inputElem, 'Please, enter something in this field.');
            return false;
        };

        //политика обработки данных.
        if (inputElem.className == 'policyAgree' && inputElem.checked == false) {
            console.log('validation not passed: ', inputElem.name);
            view.createNotificationFormElem(inputElem.closest('.registrFormPolicyAgree'), 'Agree with information policy.');
            return false;
        };

        return true;
    }

    enterOnField(event) {
        console.log(event);
        if (event.code == 'Enter') {
            event.preventDefault();

            if (this.submitValidationField(event.target) && event.target.name != 'policyAgree') {
                try {
                    let nextInputField = event.target.closest('.inputContainer').nextElementSibling.querySelector('.registrFormField');
                    nextInputField.select();
                } catch (err) {
                    console.log(err.stack);
                }
            };
        }
    }

    incorrectFormData() {
        view.createIncorrectNotification();
    }

    toTextsViewingPage() {
        updateToTextsViewingPage();
    }

}