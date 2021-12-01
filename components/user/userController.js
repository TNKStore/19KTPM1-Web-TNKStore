exports.login = (req, res, next) => {
    res.render('user/login', {
        title: 'Sign in'
    })
}

exports.getAccount = (req, res, next) => {
    res.render('user/my-account', {
        title: 'My Account'
    })
}

exports.signup = (req, res, next) => {
    res.render('user/signup', {
        title: 'Sign up'
    })
}

exports.getWishlist = (req, res, next) => {
    res.render('user/wishlist', {
        title: 'Wishlist'
    })
}