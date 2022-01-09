const BillDetail = require('../../models/billDetail')
const cartDetailService = require("../cart/cartDetailService");
const productService = require("../product/productService");

exports.createFromCart = async (billID, userID) => {
    const cartDetails = await cartDetailService.getCartInDetail(userID);

    for (let index = 0; index < cartDetails.length; ++index) {
        await BillDetail.create({
            billID: billID,
            productID: cartDetails[index].product.id,
            amount: cartDetails[index].quantity
        })
    }

    await productService.exportCartToBill(userID);
    await cartDetailService.clearAll(userID);
}