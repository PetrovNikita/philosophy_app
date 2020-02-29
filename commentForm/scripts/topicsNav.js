let openButton = document.querySelector('.openTopicsNav');
openButton.addEventListener('click', (event) => openTopicsGroups());
//for (let elem of document.querySelectorAll('.topicsGroup')) {console.log(elem); elem.hidden = true;}

function openTopicsGroups() {
    console.log("click");
    for (let elem of document.querySelectorAll('.topicsGroup')) {console.log(elem); elem.hidden = !elem.hidden;}
};