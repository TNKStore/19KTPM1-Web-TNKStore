module.exports = function loggedInGuard(req, res, next) {
    if (!req.user) {
        return res.redirect('/login');
    }
    next()
}