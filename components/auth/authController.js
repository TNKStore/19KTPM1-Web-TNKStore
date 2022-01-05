const userService = require("../user/userService");

exports.logout = (req, res, next) => {
    req.logout()
    res.redirect('/')
}

exports.login = (req, res, next) => {
    if (req.user) {
        return res.redirect('/')
    }
    const wrongPassword = (req.query['wrong-password'] !== undefined)
    res.render('auth/login', {
        title: 'Sign in',
        wrongPassword
    })
}

exports.getSignUp = (req, res, next) => {
    if (req.user) {
        return res.redirect('/')
    }
    const error = (req.query['error'] !== undefined)
    res.render('auth/signup', {
        title: 'Sign up',
        error
    })
}

exports.postSignUp = async (req, res, next) => {
    const {firstName, lastName, email, password, phone, address} = req.body
    if (await userService.findByEmail(email))
        return res.redirect('/signup?error');
    const user = await userService.register(email, firstName, lastName, password, phone, address)
    req.login(user, function (err) {
        if (err) {
            return next(err);
        }
        return res.redirect('/');
    });
}