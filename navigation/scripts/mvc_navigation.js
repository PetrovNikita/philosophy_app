let navButtonAdd = window.matchMedia("(max-width: 600px)").matches;

class Model {

};

class View {
    constructor() {
        this.addListeners();
        this.addNavCreateButton();
    }

    addListeners() {
        let categoryNames = document.querySelector('.categoriesNav');
        categoryNames.addEventListener('mousedown', event => controller.openTextsNames(event));
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

}

let controller = new Controller();
let view = new View();