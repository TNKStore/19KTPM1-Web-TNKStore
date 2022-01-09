const Bill = require('../../models/bill')
const cartDetailService = require("../../components/cart/cartDetailService");
const paymentService = require("../../components/checkout/paymentService");
const statusService = require("../../components/checkout/statusService");
const billDetailService = require("../../components/checkout/billDetailService");

exports.create = async (userID, address, phone, paymentMethod) => {
    const shippingCost = 15000;
    const paymentMethodName = (await paymentService.getPaymentByID(paymentMethod)).name
    const statusID = (paymentMethodName === "Thanh toán bằng tiền mặt")
        ? (await statusService.getStatusByName("Chưa thanh toán")).id
        : (await statusService.getStatusByName("Đã thanh toán")).id;
    const cartDetails = await cartDetailService.getCartInDetail(userID);
    let subTotal = 0;

    cartDetails.forEach((_, index) => {
        subTotal += cartDetails[index].product.price * cartDetails[index].quantity;
    })

    const bill = await Bill.create({
        userID: userID,
        total: subTotal + shippingCost,
        address: address,
        phone: phone,
        paymentID: paymentMethod,
        statusID: statusID
    });

    await billDetailService.createFromCart(bill.id, userID);

    return bill;
}
