const CartDetail = require("../../models/cartDetail");
const Product = require("../../models/product");
const cartDetailService = require("../../components/cart/cartDetailService")
const productService = require("../../components/product/productService")

exports.updateCartDetail = (unAuthID, productID, quantity) =>
    CartDetail.update({
            quantity: quantity
        },
        {
            where: {
                unauth_id: unAuthID,
                product_id: productID
            }
        })

async function isAvailable(productID, require) {
    const product = await productService.getDetail(productID);
    return require <= product.amount;
}

exports.addToCart = async (userID, unAuthID, productID, quantity) => {
    // Check if product in cart exists
    const cart = await cartDetailService.getCart(userID, unAuthID);

    const cartDetails = cart.rows.filter((value) => value.productID === parseInt(productID));
    if (cartDetails.length > 0) {
        const newQuantity = cartDetails[0].quantity + quantity;
        if (!(await isAvailable(productID, newQuantity))) {
            return null;
        }
        await this.updateCartDetail(unAuthID, productID, newQuantity)
    } else {
        if (!(await isAvailable(productID, quantity))) {
            return null;
        }
        await CartDetail.create({
            userID: userID || null,
            unAuthID: unAuthID,
            productID: productID,
            quantity: quantity
        });
    }
    return await cartDetailService.getCart(userID, unAuthID)
}

exports.update = async (userID, unAuthID, productID, quantity) => {
    if (!(await isAvailable(productID, quantity))) {
        return null;
    }
    const cartDetail = await (userID ? CartDetail.findOne({
            where: {
                user_id: userID,
                productID: productID
            },
            include: [
                {model: Product}
            ]
        }) : CartDetail.findOne({
            where: {
                unauth_id: unAuthID,
                productID: productID
            },
            include: [
                {model: Product}
            ]
        })
    )
    cartDetail.quantity = quantity
    return cartDetail.save();
}

exports.delete = async (userID, unAuthID, productID) => {
    return userID ? CartDetail.destroy({
        where: {
            user_id: userID,
            productID: productID
        }
    }) : CartDetail.destroy({
        where: {
            unauth_id: unAuthID,
            productID: productID
        }
    })
}

exports.clearOutOfStock = async (userID) => {
    const cart = await cartDetailService.getCartInDetail(userID);

    for (const cartDetail of cart) {
        if (cartDetail.quantity > cartDetail.product.amount) {
            await cartDetail.destroy();
        }
    }
}