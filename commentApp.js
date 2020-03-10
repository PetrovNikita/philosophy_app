var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');
var fs = require("fs");
const hbs = require("hbs");
const mongoose = require("mongoose");
const posts = require("./serverScripts/posts");
const gets = require("./serverScripts/gets");
const autentification = require("./serverScripts/autentification");
 
var app = express();
var jsonParser = bodyParser.json();
var textParser = bodyParser.text();
var upload = multer();

app.set("view engine", "hbs");
app.set("views", __dirname);
hbs.registerPartials(__dirname + "/commentForm/partials");
app.use(express.static(__dirname));
app.use(upload.array()); 

// подключение
mongoose.connect("mongodb://localhost:27017/commentdb", { useNewUrlParser: true }, (err) => {
    if (err) console.log(err);

    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});



/* Тест монги
let com = {
    login: 'abc',
    password: 'a',
    comments: [
        {
            commentPlace: 'b',
            commentDate: new Date() 
        },
        {
            commentText: 'efsrsv',
        }
    ]
}
let comment = new Comment(com); */

/*
Тест Монги. Remove работает только с кол-бэком
comment.save()
    .then( (doc)=> {console.log(doc); Comment.remove({}, (err, doc) => {console.log(doc)}); })
    .then(res => console.log(res) )
    .then( () => Comment.find({}) )
    .then((docs) => console.log(docs));
    */

/*
Тест монги № 2.
async function f () {
    await comment.save();
    let rem = await Comment.remove();
    let docs = await Comment.find();
    console.log(rem, docs);
} ;

f();*/

app.get('/', (req, res) => {
    console.log(req.path);
    gets.getCategories()
        .then(result => res.render("registrationPage.hbs", {
            categories: result,
    }));

})

app.get('/loginPage', (req, res) => {
    console.log(req.path);
    res.redirect('/');
})

app.get('/textsViewingPage', (req, res) => {
    console.log(req.path);
    gets.getCategories()
    .then(result => res.render("textsViewingPage/textsViewingPage.hbs", {
        categories: result,
}));
})

app.get('/add', (req, res) => {
    console.log(req.path);
    res.render("form.hbs", {
        userLastName: "Kryash",
        topic: "How I meet her",
        }
    //, (err, html)=> res.end(html)
    );
        //.sendFile(__dirname + '/commentForm/form.html');
});

app.get('/get/comment/:userLogin', (req, res) => {
    gets.getUserCommentsbyLogin(req, res).catch(( err) => console.log(err));
});

app.get('text/comment/:userLogin', (req, res) => {
    res.sendFile(__dirname + 'text.html');
});

//регистрация пользователя
app.post('/reg', async (req, res)=> {
    console.log(req.path);
    console.log(req.body);

    let sessionCookie = await autentification.autentificateUser(req.body);
    if (!sessionCookie) {
        res.send('User_Exist');
    };
    res.setHeader("Set-Cookie", `sessionCookie=${sessionCookie}; path=/`);
    res.setHeader("userLogin", req.body.userLogin);
    res.send('success'); 
    //res.redirect('/add');
});

//проверка логина на существование при регистрации
app.post('/loginCheck', textParser, async(req, res) => {
    console.log(req.path, req.body);
    let result = await posts.loginValueCheckRegister(req.body);
    console.log(result);
    res.send(result);
});

//обработка при логине зарегистрованного пользователя
app.post('/login', async(req, res) => {
    console.log(req.path, req.body);
    let result = await autentification.loginUserAutentification(req.body);
    console.log(result);
    if (result == "Incorrect_Password" || result == "No_User_Found") {
        res.send(result);
    } else {
        res.setHeader("Set-Cookie", `sessionCookie=${result}; path=/`);
        res.setHeader("userLogin", req.body.userLogin);
        res.send('success'); 
    };
})

//СТАРАЯ отправка коммента
app.post('/post/comment', async (req, res) => { 
    console.log(req.headers.cookie);
    let userLogin = await autentification.passUser(req.headers.cookie);
    if (userLogin) {
        posts.postComment(userLogin, req, res).catch(err => console.log(err));
    }
    else {
        console.log('To registration.');
        res.send('To registration.');
    }
} );

//НОВАЯ отправка на сервер коммента
app.post('/postComment', jsonParser, async (req, res) => { console.log(req.path); posts.postTextComment(req, res);});

//выдача текста при нажатии в категориях
app.get('/getText/:textName', async (req, res) => {
    if (! await autentification.passUser(req.headers.cookie)) {
        console.log('no access'); 
        res.send(`{
            "textName": "",
            "textBody": "Register or login on site to read texts and comments"
        }`);
    };
    gets.getText(req, res).catch((err) => console.log(err)) 
} );

app.get('/getComments/:textName', async (req, res) => {
    let encode = req.params["textName"];
    //let decodeTextName = decodeURI(encode);
    console.log(encode);
    let comments = await gets.getTextComments(encode);
    res.send(JSON.stringify( {'comments': comments} ));
})


process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});



//nodemon commentApp.js

