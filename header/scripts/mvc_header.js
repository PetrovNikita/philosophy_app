import {updatePageToLoginForm} from '/loginFormPage/toLoginFormPage.js';

class Model {

}

class View {
    constructor() {
        this.addFormListeners();
    }

    addFormListeners() {
        let logOutButton = document.querySelector('.logOutButton');
        logOutButton.addEventListener('mousedown', event => controller.logOut(event));

        let toLoginButton = document.querySelector('.toLoginButton');
        toLoginButton.addEventListener('click', (event) => controller.toLoginPage(event));

    }
}



class Controller {
    toLoginPage(event) {
        updatePageToLoginForm();
    }

    logOut(event) {
        event.preventDefault();
        document.cookie = document.cookie + ';max-age=-1';
    }
}


let model = new Model();
export let view = new View();
let controller = new Controller();
