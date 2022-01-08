const userService = require("../user/userService");
const cartService = require("../cart/cartDetailService");
const activateService = require("../activate/activateService")
const randomstring = require("randomstring");

exports.logout = (req, res, next) => {
    req.logout()
    req.session.unAuthID = randomstring.generate(16);
    res.redirect('/')
}

exports.getLogIn = (req, res, next) => {
    if (req.user) {
        return res.redirect('/')
    }
    const wrongPassword = (req.query['wrong-password'] !== undefined)
    res.render('auth/login', {
        title: 'Sign in',
        wrongPassword
    })
}

exports.postLogIn = async (req, res) => {
    await cartService.updateUserCart(req.user.id, req.session.unAuthID);
    res.redirect('/')
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
    /*req.login(user, async function (err) {
        if (err) {
            return next(err);
        }
        await cartService.updateUserCart(req.user.id, req.session.unAuthID);
        //return res.redirect('/');
    });*/
    return res.redirect('/login');
}