const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/client"));


app.get('/', (request, response) => {
    console.log(request.url);
    response.end('Hello from Express, man!');
});

app.get('/register', (request, response) => {
    console.log(`Запрошенный адрес: ${request.url}`);
    response.sendFile(__dirname + '/client/test.html');

app.get('/:id', (request, response) => {
    console.log(request.params.id);
    response.send(`Your id: ${request.params.id}`);
});
/*// получаем путь после слеша
    const filePath = request.url.substr(1);
// смотрим, есть ли такой файл
    fs.access(filePath, fs.constants.R_OK, err => {
    // если произошла ошибка - отправляем статусный код 404
    if(err){
        response.statusCode = 404;
        response.end("Resourse not found!");
    }
    else{
        fs.createReadStream(filePath).pipe(response);
    }
  })*/
});

app.post('/user', jsonParser, function (req, res) {
    console.log('post /user');
    const user = req.body;
    console.log(user);
    res.send('OK');
    })
 ;

 app.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.lastName}`);
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});


//node index_express.js
//nodemon index_express.js


