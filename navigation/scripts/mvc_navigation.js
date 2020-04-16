let navButtonAdd = window.matchMedia("(max-width: 600px)").matches;

class View {
    constructor() {
        this.addListeners();
        this.addNavCreateButton();
    }

    addListeners() {
        let categoryNames = document.querySelector('.categoriesNav');
        categoryNames.addEventListener('mousedown', event => controller.openTextsNames(event));
        categoryNames.addEventListener('click', event => controller.getChoosenText(event));
    }

    addNavCreateButton() {
        if (navButtonAdd) {
            let categoriesNavContainer = document.querySelector('.categoriesNavContainer');
            categoriesNavContainer.hidden = true;
            
            let navOpenButton = document.createElement('button');
            navOpenButton.className = 'navOpenButton';
            navOpenButton.innerText = 'Open navigation';
            navOpenButton.onclick = () => {
                categoriesNavContainer.hidden = !categoriesNavContainer.hidden;
                navOpenButton.innerText = categoriesNavContainer.hidden ? 'Open navigation' : 'Close navigation';
            }
            
            document.querySelector('.main').append(navOpenButton);
        };
    }

    showChoosenText(textObj) {
        document.querySelector('.textsContainer').innerHTML = `<h2>${textObj.textName}</h2>${textObj.textBody}`;
        document.querySelector('.commentFormContainer').hidden = false;
        document.querySelector('.commentsContainer').hidden = false;
    }

}

class Controller {
    static openedTextsParent;

    openTextsNames(event) {
        console.log(event.target, event.target.parentNode.querySelectorAll('.textsNames'));

        if (!event.target.classList.contains('categoryName')) return false;

        for (let elem of event.target.parentNode.querySelectorAll('.textsNames')) elem.hidden = !elem.hidden;
        
        if (Controller.openedTextsParent !== event.target.parentNode && Controller.openedTextsParent) {
            for (let elem of Controller.openedTextsParent.querySelectorAll('.textsNames')) elem.hidden = !elem.hidden;
        };

        Controller.openedTextsParent == event.target.parentNode ? Controller.openedTextsParent = null : Controller.openedTextsParent = event.target.parentNode;
    }

    getChoosenText(event) {
        if (!event.target.classList.contains('textsNames')) return false;
        let textName = event.target.innerText;
        let textObj = model.getText(textName)
            .then(res => {
                console.log(res);
                view.showChoosenText(res);
            });
        
        window.showCommentsComponent(textName);
    }

}

class Model {
    async getText(textName) {
        sessionStorage.setItem('textName', textName);
        let textObj = await fetch(`/getText/${textName}`);
        let text = await textObj.json();

        return text;
    }
}

let controller = new Controller();
let view = new View();
let model = new Model();