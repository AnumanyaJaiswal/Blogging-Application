const JWT = require('jsonwebtoken')

const secret_key = "HelloWorld";

function CreateTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role
    }
    const token = JWT.sign(payload , secret_key);
    return token;
}

function ValidateToken(token){
    const payload = JWT.verify(token , secret_key);
    return payload;
}

module.exports = {CreateTokenForUser , ValidateToken}