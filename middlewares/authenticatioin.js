const { ValidateToken } = require("../Services/authentication");

function checkForAuthenticatioin(token){
    return (req, res, next) =>{
        const tokenCookieValue = req.cookies[token];
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = ValidateToken(tokenCookieValue)
            req.user = userPayload;
        } catch (error) {
            console.log(error.message);
        }
    
        next()
    }
}

module.exports = checkForAuthenticatioin