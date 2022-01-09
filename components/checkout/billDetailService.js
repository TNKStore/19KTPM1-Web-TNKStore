const BillDetail = require('../../models/billDetail')
const cartDetailService = require("../cart/cartDetailService");

exports.createFromCart = async (billID, userID) => {
    const cartDetails = await cartDetailService.getCartInDetail(userID);

    for (let index = 0; index < cartDetails.length; ++index) {
        await BillDetail.create({
            billID: billID,
            productID: cartDetails[index].product.id,
            amount: cartDetails[index].quantity
        })
    }

    await cartDetailService.clearAll(userID);
}