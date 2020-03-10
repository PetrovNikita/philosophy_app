class View {
    constructor() {
        this.addEventListeners();
    }

    addEventListeners() {
        let commentForm = document.querySelector('.commentForm');
        console.log(commentForm);
        commentForm.addEventListener('submit', (event) => {controller.postComment(event)});
    }

    showComment(commentObj) {
        let commentElem = document.createElement('div');
        commentElem.className = "commentInstance";
        commentElem.innerHTML = `${commentObj.userLogin} commented at ${commentObj.commentDate}.`

        let commentText = document.createElement('div');
        commentText.className = "commentText";
        commentText.innerHTML = `${commentObj.commentText}`;

        commentElem.append(commentText);
        document.querySelector('.commentContainer').append(commentElem);
    }

    removeComments() {
        for (let commentElem of document.querySelectorAll('.commentInstance')) commentElem.remove();
    }
}

class Controller {
    postComment(event) {
        console.log(event);
        event.preventDefault();
        //отправлять на сервак + делать в функции блок с комментом сразу и показывать его.
/*        let formData = new FormData(event.target);

        formData.append('userLogin', localStorage.getItem('userLogin'));
        formData.append('textName', sessionStorage.getItem('textName'));
        formData.append('commentDate', new Date());
        console.log(event.target.elements[1].name, event.target.elements[1].value);
        console.log(JSON.stringify(formData));

        model.postComment(formData); */
        let commentText;
        for (let elem of event.target.elements) {
            if (elem.name == 'commentText') {commentText = elem.value};
        };
        
        let commentObj = {
            'commentText': commentText,
            'userLogin': localStorage.getItem('userLogin'),
            'textName': sessionStorage.getItem('textName'),
            'commentDate': new Date(),
        };
        
        model.postComment(commentObj)
            .then( resp => {
                if (resp == "comment got") {
                    console.log(commentObj);
                    view.showComment(commentObj);
                }
            });
    }

    getTextComments(textName) {
        view.removeComments();
        model.getComments(textName);
    }

    showCommentsFromServer(comments) {
        for (let comment of comments) view.showComment(comment);
    }
}

class Model {
    async postComment(commentObj) {
        let req = await fetch('/postComment', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify(commentObj),
            });

        let resp;
        if (req.ok) {
            resp = await req.text(); 
        } else resp = req.status;

        console.log(resp);   
        return resp;
    }

    async getComments(textName) {
        //let encodeTextName = encodeURI(textName);
        //console.log(encodeTextName);
        let req = await fetch (`/getComments/${textName}`);
        let resp;
        if (req.ok) {
            resp = await req.json(); 
        } else resp = req.status;

        console.log(resp);
        controller.showCommentsFromServer(resp.comments);
    }
}

let model = new Model();
let view = new View();
export let controller = new Controller();

