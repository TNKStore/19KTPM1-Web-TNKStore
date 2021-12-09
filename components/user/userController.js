const userService = require('./userService')

exports.getAccount = async (req, res, next) => {
    const orders = req.query['orders'];
    const payment = req.query['payment'];
    const address = req.query['address'];
    const account = req.query['account'];
    const success = (req.query['success'] !== undefined);
    let dashboard;
    if (!orders && !payment && !address && !account) {
        dashboard = "active";
    };
    const user = await userService.findByEmail(req.user.email);
    res.render('user/my-account', {
        title: 'My Account',
        dashboard,
        orders,
        payment,
        address,
        account,
        success,
        user
    });
}

exports.getWishlist = (req, res, next) => {
    res.render('user/wishlist', {
        title: 'Wishlist'
    })
}

exports.changeAccountDetail = async (req, res, next) => {
    const {firstName, lastName, address, phone} = req.body
    userService.updateInfo(req.user.email, firstName, lastName, address, phone)
        .then(
            _ => res.redirect('/customer/my-account?account=active&success'),
            _ => next())
}

exports.changePassword = async (req, res, next) => {
    const {password, newPassword} = req.body;
    const user = await userService.findByEmail(req.user.email);
    const isMatch = await userService.verifyPassword(password, user);

    if (!isMatch) {
        return res.redirected('/customer/my-account?account=active&wrong-password')
    }
    userService.updatePassword(req.user.email, newPassword)
        .then(
            _ => res.redirect('/customer/my-account?account=active&success'),
            _ => next())
}