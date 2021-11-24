const Product = require('../models/product.model')

let cart = []
cart["product"] = Product.getProducts().slice(2, 5)
cart["subtotal"] = getTotal()
cart["ship"] = 1
cart["total"] = cart["subtotal"] + cart["ship"]

function getCart() {
    return cart;
}

function getTotal() {
    let sum = 0;
    cart.product.forEach((item) => {
        sum += item.price;
    });
    return sum
}

module.exports = {
    getCart
}