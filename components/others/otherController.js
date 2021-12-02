const productService = require('../product/productService')
const catalogService = require('../catalog/catalogService')
const createError = require("http-errors");

exports.getHome = async (req, res, next) => {
    try {
        const products = await productService.list(1, 10)

        res.render('index',
            {
                title: 'TNKStore',
                products: products.rows,
                category: await catalogService.list(null)
            });
    } catch (e) {
        console.log(e);
        next(createError(404));
    }
}


exports.getContact = async (req, res, next) => {
    res.render('contact',
        {
            title: 'Contact Us'
        });
}
