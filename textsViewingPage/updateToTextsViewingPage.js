export function updateToTextsViewingPage() {
    history.pushState({state:'textsViewingPage'}, 'textsViewingPage', 'textsViewingPage.html');
    document.querySelector('.mainPageContainer').hidden = false;

    document.querySelector('.regPageHeader .logOutButton').hidden = false;
    document.querySelector('.regPageHeader .toRegisterButton').hidden = true;
    document.querySelector('.regPageHeader .toLoginButton').hidden = true;
    document.querySelector('.registrFormContainer').hidden = true;
    document.querySelector('.loginFormContainer').hidden = true;

    window.onpopstate = (event) => {
        if (event.state == null) document.location.href = 'http://localhost:3000';
    }
}