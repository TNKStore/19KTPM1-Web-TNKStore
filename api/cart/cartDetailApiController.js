const cartDetailApiService = require('./cartDetailApiService')
const cartDetailService = require('../../components/cart/cartDetailService')

exports.get = async (req, res) => {
    const cart = await cartDetailService.getCart(
        req.user ? req.user.id : null, req.session.unAuthID)
    res.status(201).json(cart)
}

exports.add = async (req, res) => {
    const {id: productID} = req.body;
    const cart = await cartDetailApiService.addToCart(
        req.user ? req.user.id : null,
        req.session.unAuthID,
        productID
    )
    res.status(201).json(cart)
}


exports.update = async (req, res) => {
    const {id: productID, quantity: quantity} = req.body;
    const cartDetail = (await cartDetailApiService.update(
        req.user ? req.user.id : null,
        req.session.unAuthID,
        productID,
        quantity
    ))
    res.status(201).json(cartDetail)
}


exports.delete = async (req, res) => {
    const {id: productID} = req.body;
    const numSuccess = (await cartDetailApiService.delete(
        req.user ? req.user.id : null,
        req.session.unAuthID,
        productID
    ))
    res.status(201).json(numSuccess)
}