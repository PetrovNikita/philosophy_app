const schemas = require("./mongoose_Schemas.js");


module.exports.postComment = async function (uLogin, req, res) {
    //старый метод .
    let Comment = schemas.Comment;

    console.log(req.path);
    let commentData = {commentPlace : req.body.place , commentText: req.body.commentText, commentDate: new Date()};

    let commentObj = await Comment.findOne({userLogin: uLogin});
    if (commentObj === null) {
        commentObj = {userLogin: uLogin, comments: new Array(commentData)};
        let doc = await Comment.create(commentObj);
    } else {
        commentObj.comments.push(commentData);
        let doc = await Comment.findByIdAndUpdate(commentObj._id, {comments: commentObj.comments});
    };
    console.log(commentObj);

    res.send('Comment got:)');

};


module.exports.loginValueCheckRegister = async function (loginValue) {
    let userAuthData = schemas.userAuthData;

    let userData = await userAuthData.findOne({userLogin: loginValue});
    console.log(userData);
    if (userData) return false
        else return true;

}

module.exports.postTextComment = async function (req, res)  {
    let textComment = schemas.TextComment;
    
    let commentTextData = req.body;
    console.log(commentTextData);

    let obj = {
        userLogin: commentTextData.userLogin,
        textName: commentTextData.textName,
        commentText: commentTextData.commentText,
        commentDate: commentTextData.commentDate,
    };
    try {
        let doc = await textComment.create(obj);
        //console.log(await textComment.find({}));
        console.log("comment got");
        res.send("comment got");
    } catch (err) {
        console.log(`error: ${err.name}`);
        res.send(`error: ${err.name}`);
    }

}