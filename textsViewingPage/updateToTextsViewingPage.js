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

    
    document.querySelector('.textAndFormContainer').className = 'textAndСommentContainer';
    document.querySelector('.textsContainer').innerHTML = "Choose the text in navigation menu";

    //создаем форму комментария
    let commentFormContainer = document.createElement('div');
    commentFormContainer.className = 'commentFormContainer';
    commentFormContainer.innerHTML = 
        `<form class="commentForm">
            <fieldset>
                <legend>Add your comment</legend>
                <textarea name="commentText"cols="30" rows="3">Your comment</textarea>
            </fieldset>
            <input type="submit" value="Send comment">
        </form>`;
    
    //создаем контейнер для комментария
    let commentContainer = document.createElement('div');
    commentContainer.className = 'commentContainer';
    commentContainer.innerHTML = 
        `<div>
            there will be comments
        </div>`;
    //скрываем, чтоб показать когда текст будет выбран.
    commentFormContainer.hidden = true;
    commentContainer.hidden = true;
    document.querySelector('.textAndСommentContainer').append(commentFormContainer, commentContainer);

    //Добавляем скрипт для обработки комментариев
    let comment_mvcScript = document.createElement('script');
    comment_mvcScript.type = 'module';
    comment_mvcScript.src = "textsViewingPage/comments_mvc.js";
    document.head.append(comment_mvcScript);
};