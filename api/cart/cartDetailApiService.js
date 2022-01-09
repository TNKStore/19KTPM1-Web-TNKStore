const CartDetail = require("../../models/cartDetail");
const cartDetailService = require("../../components/cart/cartDetailService")
const Product = require("../../models/product");

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

exports.addToCart = async (userID, unAuthID, productID) => {
    // Check if product in cart exists
    const cart = await cartDetailService.getCart(userID, unAuthID);
    const cartDetails = cart.rows.filter((value) => value.productID === parseInt(productID));
    if (cartDetails.length > 0) {
        await this.updateCartDetail(unAuthID, productID, cartDetails[0].quantity + 1)
    } else {
        await CartDetail.create({
            userID: userID || null,
            unAuthID: unAuthID,
            productID: productID
        });
    }
    return await cartDetailService.getCart(userID, unAuthID)
}

exports.update = async (userID, unAuthID, productID, quantity) => {
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