const schemas = require("./mongoose_Schemas.js");


module.exports.postComment = async function (uLogin, req, res) {
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