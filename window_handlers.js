import {updatePageToLoginForm} from './loginFormPage/toLoginFormPage.js'

history.pushState('home', 'HOME');
console.log(history.state);

window.onpopstate = (event) => {
    console.log(event);
    console.log('state: pop ' + history.state);
    if (history.state == 'home') document.location.href = 'http://localhost:3000';
    if (history.state == 'loginFormPage') {
        document.location.href = 'http://localhost:3000';
        updatePageToLoginForm();
    };
};

window.onload = (event) => {
    console.log(event);
    console.log('state: onload ' + history.state);

    if (history.state == 'loginFormPage') {
        document.location.href = 'http://localhost:3000';
        updatePageToLoginForm();
    };
};