const schemas = require("./mongoose_Schemas.js");
let userAuthData = schemas.userAuthData;

//при регистрации
module.exports.autentificateUser = async function (FData) {

    let obj = {
        userLogin: FData.userLogin,
        userPassword: FData.userPassword,
        userFirstName: FData.userName,
        userPhoneNumber: FData.userPhone,
        sessionCookie: FData.userLogin + '123',
    };

    let doc;

    let userObj = await userAuthData.findOne({userLogin: FData.userLogin});
    if (userObj === null) {
        userObj = obj;
        doc = await userAuthData.create(userObj);
        console.log("New user created!!!");
    } else {
        return false;
    };

    console.log(doc);
    return obj.sessionCookie;
};

module.exports.loginUserAutentification = async function (FData) {
    let obj = {
        userLogin: FData.userLogin,
        userPassword: FData.userPassword,
        sessionCookie: FData.userLogin + '123',
    };

    let doc;
    let userObj = await userAuthData.findOne({userLogin: FData.userLogin});
    if (userObj) {
        if (userObj.userPassword == obj.userPassword) {
            doc = await userAuthData.findByIdAndUpdate(userObj._id, {sessionCookie: obj.sessionCookie});
            console.log("Correct_Password");
            return obj.sessionCookie;
            } 
        else {
            console.log("Incorrect_Password");
            return "Incorrect_Password";
        };
    } else {
        return "No_User_Found";
    };
};

//при действии на странице
module.exports.passUser = async function (cookie) {
    try {
        let sessCookie;
        for (let cook of cookie.split(';')) {
            if (cook.split('=')[0] == 'sessionCookie') sessCookie = cook.split('=')[1];
        }

        let userObj = await userAuthData.findOne({sessionCookie: sessCookie});
        return userObj === null ? false : userObj.userLogin;
    } catch (err) {
        console.log('error');
    };
    return false;
}