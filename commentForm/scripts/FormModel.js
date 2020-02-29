import {controller} from './mvc_form.js';

export class FormModel {

//данные пользователей, Map(userId, userData)
    constructor() {
        this._ModelData = new Map();
    }

//добавление данных в модель
    modelPushData (formData) {
        let response = fetch('/post/comment',{
            method: 'POST',
            body: formData,
        });
        response
            .then(res => {return res.text()})
            .then(res => console.log(res));
    }


//получение данных для заданного пользователя
    modelGetData (userLogin) {
        //let data = this._ModelData.get(userId);

        let response = fetch("/get/comment/" + userLogin);
        response
            .then(result => {
                return result.json();
            })
            .then(res => {
                console.log("Model: ", res);
                controller.commentDataToView(res);
            });
    }
}