export function updatePageToLoginForm() {
    history.pushState('loginFormPage', 'login', 'loginPage');
    document.querySelector('.textAndFormContainer').hidden = true;
    document.querySelector('.categoriesNavContainer').hidden = true;

    document.querySelector('.loginFormContainer').hidden = false;

    //если придется возвращаться назад, то делаем запрос.
    /*let notToLoginFieldsNames = ['userName', 'userPhone'];
    let regForm = document.querySelector('.registrForm');

    for (let field of notToLoginFieldsNames) regForm.elements[field].closest('.inputContainer').hidden = true; */
}