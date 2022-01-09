const userService = require('./userService')
const billService = require("../bill/billService");
const moment = require("moment");

exports.getAccount = async (req, res, next) => {
    const orders = req.query['orders'];
    const address = req.query['address'];
    const account = req.query['account'];
    const success = (req.query['success'] !== undefined);
    const failure = (req.query['failure'] !== undefined);

    const bill = orders ? await billService.getAllBills(req.user.id) : null;
    if (bill) {
        bill.forEach((value, index) => {
            bill[index].createdAt =  moment(bill[index].createdAt).format('DD/MM/YYYY');
        })
    }

    const user = await userService.findByEmail(req.user.email);
    res.render('user/my-account', {
        title: 'My Account',
        orders,
        address,
        account,
        success,
        failure,
        user,
        bill
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
        return res.redirect('/customer/my-account?account=active&wrong-password')
    }
    userService.updatePassword(req.user.email, newPassword)
        .then(
            _ => res.redirect('/customer/my-account?account=active&success'),
            _ => next())
}

exports.updateAddress = async (req, res, next) => {
    const {address, phone} = req.body;
    const success = await userService.updateAddress(req.user.id, address, phone);

    if (success > 0) {
        return res.redirect('/customer/my-account?address=active&success');
    }
    return res.redirect('/customer/my-account?address=active&failure');
}