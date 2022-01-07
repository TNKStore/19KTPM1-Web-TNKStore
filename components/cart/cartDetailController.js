const cartDetailService = require('./cartDetailService')

exports.getCart = async (req, res, next) => {
    const cart = await cartDetailService.getCartInDetail(
        req.user ? req.user.id : null,
        req.session.unAuthID)

    res.render('cart/cart', {
        title: 'Cart',
        cart
    })
}