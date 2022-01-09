const billApiService = require('./billApiService');

exports.create = async (req, res) => {
    const {address, phone, paymentMethod} = req.body
    const bill = await billApiService.create(req.user.id, address, phone, parseInt(paymentMethod));
    if (bill == null) {
        return res.status(406).json(null);
    }
    res.status(201).json(bill);
}