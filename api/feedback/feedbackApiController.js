const feedbackApiService = require('./feedbackApiService')

exports.add = async (req, res) => {
    const {productID, fullName, email, review} = req.body;
    const feedback = await feedbackApiService.add(
        parseInt(productID),
        fullName,
        email,
        review
    )
    res.status(201).json(feedback)
}