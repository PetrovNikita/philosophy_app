import {controller} from './mvc_regForm.js';

export class Model {
    async postRegFrom(formData) {
        let post = await fetch('/reg',{
            method: 'POST',
            body: formData,
        });

        let resp = await post.text();
        console.log(resp);
        if (resp == 'success') {
//переход на страницу с формами.
            document.location.href = 'http://localhost:3000/add';
        };
        if (resp == 'User_Exist') {
            controller.incorrectFormData();
        }
    }

    async postLoginFrom(formData) {
        let post = await fetch('/login',{
            method: 'POST',
            body: formData,
        });

        let resp = await post.text();
        console.log(resp);
        if (resp == 'success') {
//переход на страницу с формами.
            document.location.href = 'http://localhost:3000/add';
        };
        if (resp == 'Incorrect_Password' || resp == 'No_User_Found') {
            controller.incorrectFormData();
        };
    }

    async loginExistCheck(loginValue) {
        let post = await fetch ('/loginCheck', {
            method: 'POST',
            body: loginValue,
        });

        let resp = await post.text();
        return resp;
    }

}