export function updatePageToLoginForm() {
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