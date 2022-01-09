const CartDetail = require("../../models/cartDetail")
const {Op} = require("sequelize");
const Product = require("../../models/product");
const Image = require("../../models/image");

exports.updateUserCart = async (userID, unAuthID) => {
    const cart = (await this.getCart(userID)).rows
    const productIDs = Array(cart.length)
        .fill("")
        .map((_, index) => cart[index].productID);
    // Update new only
    await CartDetail.update(
        {
            user_id: userID
        },
        {
            where: {
                unauth_id: unAuthID,
                product_id: {
                    [Op.notIn]: productIDs
                }
            }
        }
    )
    // Delete duplicate
    await CartDetail.destroy({
        where: {
            unauth_id: unAuthID,
            user_id: null
        }
    })
}

exports.getCart = (userID, unAuthID) =>
    userID ? CartDetail.findAndCountAll({
        where: {
            user_id: userID
        }
    }) : CartDetail.findAndCountAll({
        where: {
            unauth_id: unAuthID
        }
    })

exports.getCartInDetail = (userID, unAuthID) =>
    userID ? CartDetail.findAll({
        where: {
            user_id: userID
        },
        include: [
            {model: Product, include: [{model: Image}]}
        ]
    }) : CartDetail.findAll({
        where: {
            unauth_id: unAuthID
        },
        include: [{model: Product, include: [{model: Image}]}]
    })

exports.clearAll = async (userID, unAuthID) =>
    (userID ? await CartDetail.findAll(
            {
                where: {
                    user_id: userID
                }
            })
        : await CartDetail.findAll(
            {
                where: {
                    unAuthID: unAuthID
                }
            }))
        .forEach((value) => {
            value.destroy()
        })