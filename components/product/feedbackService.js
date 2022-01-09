const Feedback = require('../../models/feedback')

exports.getPages = (id, page, numPages) => Array(numPages)
    .fill("")
    .map((_, index) => {
        return {
            url: `/products/${id}?reviews=${index + 1}`,
            page: index + 1,
            active: page - 1 === index
        }
    })


exports.list = (productID, page, limit) => {
    const offset = (page - 1) * limit

    return Feedback.findAndCountAll({
        where: {
            product_id: productID
        },
        offset: offset, limit: limit,
        order: [
            ['created_at', 'DESC']
        ]
    })
}