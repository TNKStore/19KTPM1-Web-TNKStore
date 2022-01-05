const randomstring = require("randomstring");

module.exports = function userIDMiddleware(req, res, next) {
    if (!req.session.unAuthID) {
        req.session.unAuthID = randomstring.generate(16);
        req.session.viewedProduct = []
    }
    next()
}