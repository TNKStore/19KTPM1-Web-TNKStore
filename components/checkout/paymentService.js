const Payment = require('../../models/payment')

exports.getAllMethods = Payment.findAll()

exports.getPaymentByID = (id) => Payment.findOne({
    where: {
        id: id
    }
})