const userService = require("../user/userService");
const cartDetailService = require("../cart/cartDetailService");
const paymentService = require("../checkout/paymentService");

exports.checkOut = async (req, res, next) => {
    const user = await userService.findByEmail(req.user.email)
    const cart = await cartDetailService.getCartInDetail(req.user.id, req.session.unAuthID)
    let subTotal = 0;
    cart.forEach((cartDetail) => {
        subTotal += cartDetail.quantity * cartDetail.product.price
    });
    const shippingCost = 15000;
    const payments = await paymentService.getAllMethods

    res.render('cart/checkout', {
        title: 'TNKStore',
        user: user,
        cart,
        subTotal,
        shippingCost,
        grandTotal: subTotal + shippingCost,
        payments
    })
}