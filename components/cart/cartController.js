exports.getCart = (req, res, next) => {
    res.render('cart/cart', {
        title: 'Cart',
        cart: []
    })
}

exports.checkOut = (req, res, next) => {
    res.render('cart/checkout', {
        title: 'TNKStore'
    })
}