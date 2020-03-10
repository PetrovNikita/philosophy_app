const schemas = require("./mongoose_Schemas.js");
let textCommentSchema = schemas.textCommentSchema;
let commentSchema = schemas.commentSchema;

//получение комментов при переходе на страницу текста.
module.exports.getTextComments = async function (textName) {
    try {
        let comments = await textCommentSchema.find({textName: textCommentSchema});
    } catch (err) {
        console.log(err);
    }

    return comments;
};

