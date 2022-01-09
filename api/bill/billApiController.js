const billApiService = require('./billApiService');

exports.create = async (req, res) => {
    const {address, phone, paymentMethod} = req.body
    const bill = await billApiService.create(req.user.id, address, phone, parseInt(paymentMethod));

    res.status(201).json(bill);
}