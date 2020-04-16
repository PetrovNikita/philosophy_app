export function updateToTextsViewingPage() {
    history.pushState({state:'textsViewingPage'}, 'textsViewingPage', 'textsViewingPage');
    document.querySelector('.mainPageContainer').hidden = false;
    document.querySelector('.textAndFormContainer').hidden = false;
    document.querySelector('.categoriesNavContainer').hidden = false;

    document.querySelector('.regPageHeader .logOutButton').hidden = false;
    document.querySelector('.regPageHeader .toRegisterButton').hidden = true;
    document.querySelector('.regPageHeader .toLoginButton').hidden = true;
    document.querySelector('.registrFormContainer').hidden = true;
    document.querySelector('.loginFormContainer').hidden = true;

    let textAndCommentContainer = document.querySelector('.textAndFormContainer'); 
    textAndCommentContainer.className = 'textAndСommentContainer';
    document.querySelector('.textsContainer').innerHTML = "Choose the text in navigation menu";

    //создаем форму комментария
    let commentsAndFormContainer = document.createElement('div');
    commentsAndFormContainer.className = 'commentsAndFormContainer';
    textAndCommentContainer.append(commentsAndFormContainer);
};