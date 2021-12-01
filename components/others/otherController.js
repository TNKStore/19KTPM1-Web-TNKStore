const productService = require('../product/productService')
const catalogService = require('../catalog/catalogService')

exports.getHome = async (req, res, next) => {
    const products = await productService.list(1, 10)

    res.render('index',
        {
            title: 'TNKStore',
            products: products.rows,
            category: await catalogService.list(null)
        });
}


exports.getContact = async (req, res, next) => {
    res.render('contact',
        {
            title: 'Contact Us'
        });
}
