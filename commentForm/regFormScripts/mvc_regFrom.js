class Model {
    async postRegFrom(formData) {
        let post = await fetch('/reg',{
            method: 'POST',
            body: formData,
        });
        let headers = post.headers.get("userLogin");
        console.log(headers);
        let resp = await post.text();
        alert(resp);
//переход на страницу с формами.
        document.location.href = 'http://localhost:3000/add';
    }

}

class View {
    constructor() {
        this.addFormListeners();
    }

    addFormListeners(){
        let regForm = document.querySelector('.registrForm');
        console.log(regForm);
        regForm.addEventListener('submit', (event) => controller.formDataToModel(event));

        let logOutButton = document.querySelector('.logOutButton');
        logOutButton.addEventListener('mousedown', event => controller.logOut(event));

        let categoryNames = document.querySelector('.categoriesNav');
        console.log(categoryNames);
        categoryNames.addEventListener('mousedown', event => controller.openTextsNames(event));
    }
}

class Controller {
    formDataToModel(event) {
        event.preventDefault();

        let formData = new FormData(event.srcElement);

        model.postRegFrom(formData);
    }

    logOut(event) {
        event.preventDefault();
        document.cookie = document.cookie + ';max-age=-1';
    }

    openTextsNames(event) {
        event.preventDefault();
        console.log(event);
    }
}

let model = new Model();
let view = new View();
let controller = new Controller();

