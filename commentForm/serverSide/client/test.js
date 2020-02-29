console.log('SCRipt loading!!!');

let form = document.querySelector('.form');
console.log(form);

let user = {
    name: 'John',
    surname: 'Smith'
    };


let body = JSON.stringify(user);

let response = fetch('/user', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: body
});
response.then(res => console.log(res));

