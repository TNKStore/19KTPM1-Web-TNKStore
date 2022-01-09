const Feedback = require('../../models/feedback')

exports.add = (productID, fullName, email, review) =>
    Feedback.create({
        productID: productID,
        fullName: fullName,
        email: email,
        content: review
    })