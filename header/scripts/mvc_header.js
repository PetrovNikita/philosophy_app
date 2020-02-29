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

    updatePageToLoginForm() {
        history.pushState({state:'loginFormPage'}, 'loginPage', 'loginPage.html');
        document.querySelector('.mainPageContainer').hidden = true;

        document.querySelector('.loginFormContainer').hidden = false;

        window.onpopstate = (event) => {
            if (event.state == null) document.location.href = 'http://localhost:3000';
        }
        //если придется возвращаться назад, то делаем запрос.
        /*let notToLoginFieldsNames = ['userName', 'userPhone'];
        let regForm = document.querySelector('.registrForm');

        for (let field of notToLoginFieldsNames) regForm.elements[field].closest('.inputContainer').hidden = true; */
    }
}



class Controller {
    toLoginPage(event) {
        view.updatePageToLoginForm();
    }

    logOut(event) {
        event.preventDefault();
        document.cookie = document.cookie + ';max-age=-1';
    }
}


let model = new Model();
export let view = new View();
let controller = new Controller();
