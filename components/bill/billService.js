const Bill = require('../../models/bill')
const Product = require("../../models/product");
const BillDetail = require("../../models/billDetail");
const Payment = require("../../models/payment");
const Status = require("../../models/status");

exports.getAllBills = (userID) => Bill.findAll({
    where: {
        user_id: userID
    },
    include: [
        {model: Product},
        {model: Status}
    ]
})

exports.getBill = (billID, userID) => Bill.findOne({
    where: {
        id: billID,
        user_id: userID
    },
    include: [
        {model: Payment},
        {model: Product, include: [{model: Image}]},
        {model: Status}
    ]
})

exports.getBillDetail = (billID) => BillDetail.findAll({
    where: {
        bill_id: billID
    }
})