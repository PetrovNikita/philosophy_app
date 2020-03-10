const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// установка схемы
const commentSchema = new Schema({
    userLogin: String,
    textName: String,
    comments: [
        {
            commentPlace: String,
            commentText: String,
            commentDate: Date,
        }
    ]
});
module.exports.Comment = mongoose.model("comment", commentSchema);


let userAuthData = new Schema({
    userLogin: String,
    userPassword: String,
    userFirstName: String,
    userPhoneNumber: String,
    sessionCookie: String,
});
module.exports.userAuthData = mongoose.model("userAuthData", userAuthData);

let categorySchema = new Schema({
    categoryName: String,
    textsNames: [String],
})
module.exports.Category = mongoose.model("Category", categorySchema);

let textSchema = new Schema({
    textName: String,
    textBody: String,
})
module.exports.Text = mongoose.model("Text", textSchema);

let textCommentSchema = new Schema({
    userLogin: String,
    textName: String,
    commentText: String,
    commentDate: Date,
})
module.exports.TextComment = mongoose.model("TextComment", textCommentSchema);