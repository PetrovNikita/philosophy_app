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