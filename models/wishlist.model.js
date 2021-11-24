const Product = require('../models/product.model')


function getProducts() {
    return Product.getProducts().slice(1, 4)
}

module.exports = {
    getProducts
}