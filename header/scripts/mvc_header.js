import {updatePageToLoginForm} from '/loginFormPage/toLoginFormPage.js';

class Model {

}

class View {
    constructor() {
        this.addFormListeners();
    }

    addFormListeners() {
        try {
            let logOutButton = document.querySelector('.logOutButton');
            logOutButton.addEventListener('mousedown', event => controller.logOut(event));

            let toLoginButton = document.querySelector('.toLoginButton');
            toLoginButton.addEventListener('click', (event) => controller.toLoginPage(event));

            let toRegistrButton = document.querySelector('.toRegisterButton');
            toRegistrButton.addEventListener('click', (event) => controller.toRegistrForm(event));
        } catch (err) {
            console.log(err.stack)
        };
    }
}



class Controller {
    toLoginPage(event) {
        updatePageToLoginForm();
    }

    logOut(event) {
        document.cookie = document.cookie + ';max-age=-1';
        document.location.href = "http://localhost:3000/";
    }

    toRegistrForm(event) {
        //console.log(event, event.target.baseURI, document.location.href);
        if (document.location.href.endsWith("/loginPage")) {
            document.location.href = "http://localhost:3000/";
        };
    }
}


let model = new Model();
export let view = new View();
let controller = new Controller();
