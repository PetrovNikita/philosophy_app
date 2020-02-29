import {controller} from './mvc_form.js';

export class FormView {
    constructor() {
        this.addFormListeners();
    }

    //добавляем прослушку отправки формы - вызов в конструкторе при создании.
    addFormListeners () {
        let postCommentForm = document.querySelector('.commentForm');
        postCommentForm.addEventListener('submit', (event) => controller.formDataToModel(event));

        let getCommentForm = document.querySelector('.getCommentForm');
        getCommentForm.addEventListener('change', (event) => {
            this.oldCommentsDelete();
            controller.getCommentFromModel(event);
        });
        getCommentForm.addEventListener('submit', event => event.preventDefault());
    }

    commentAppend(commentData) {
        for (let com of commentData.comments) {
            console.log(com.commentText);
            let elem = document.createElement('div');
            elem.innerHTML = com.commentText;
            elem.classList.add("userComment");
            document.body.append(elem);
        }
    }
    
    oldCommentsDelete() {
        for (let node of document.querySelectorAll('.userComment') ) node.remove();
    }
}