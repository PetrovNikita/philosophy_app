//Контроллер
import {model, view} from './mvc_form.js';

export class FormController {

    formDataToModel(event) {
        event.preventDefault();

        let formData = new FormData(event.srcElement);
/*        for (let elem of formElems) {
            //условие отбора ключей из инпутов (без submit'а).
            if (elem.name!='add' && elem.name) data[elem.name] = elem.value;
        } */
        alert('Thank you for your comment.');

        model.modelPushData(formData);

    }

    commentDataToView(data) {
        view.commentAppend(data);
    }

    getCommentFromModel(event) {
        let userLogin = event.srcElement.value;
        console.log(userLogin);

        model.modelGetData(userLogin);
    }

}
