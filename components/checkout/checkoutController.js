exports.checkOut = (req, res, next) => {
    res.render('cart/checkout', {
        title: 'TNKStore'
    })
}