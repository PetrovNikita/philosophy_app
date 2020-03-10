const schemas = require("./mongoose_Schemas.js");

module.exports.getUserCommentsbyLogin = async function(req, res) {
    let Comment = schemas.Comment;

    console.log(req.path);
    let requiredLogin = req.params["userLogin"];

    let result = await Comment.findOne({userLogin: requiredLogin});
    if (result) {
        console.log(result);
        let jsonObj = JSON.stringify(result);
        res.send(jsonObj);
    } else {
        res.send(JSON.stringify({commentText: "Can not found this user"}));
    };
}

/*let c = [
    {
        categoryName: 'The most main',
        textsNames: ['The most main in person', 'The most main thing in live'],
    },
    {
        categoryName: 'Imagine the situation',
        textsNames: ['Fight or not'],
    }
]; */

module.exports.getCategories = async function() {
    let Category = schemas.Category;

    //for (let o of c) await Category.create(o);
    return await Category.find({}); 
}

//Добавление текстов.
/*let texts = [
    {
        textName: 'The most main in person',
        textBody: '<div>What for you is the most important thing in other person?</div>',
    },
    {
        textName: 'Fight or not',
        textBody: '<span>What would you choose?</span>',
    },
    {
        textName: 'The most main thing in live',
        textBody: '<p>Happiness - the most important think in your live. What makes you happy?</p>',
    }
];
console.log('gets');
schemas.Text.insertMany(texts, (err) => console.log(err)); */

module.exports.getText = async function(req, res) {
    console.log(req.path);
    let textNameStr = req.params["textName"];
    let textDoc = await schemas.Text.findOne({textName: textNameStr}, (err, res) =>  console.log);
    if (textDoc) {
        res.send(JSON.stringify(textDoc));
        console.log(textDoc);
        console.log("Text sended.");
    } else {
        res.send("Text not found");
        console.log("Text not found");
    };
}

module.exports.getTextComments = async function (textName) {
    let textComment = schemas.TextComment;
    let comments;
    try {
        comments = await textComment.find({textName: textName});
    } catch (err) {
        console.log(err);
    }
    console.log(comments.length);
    return comments;
};
