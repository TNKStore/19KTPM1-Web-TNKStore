const productService = require("./productService");
const catalogService = require("../catalog/catalogService");
const createError = require("http-errors");

exports.list = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    try {
        const products = await productService.list(page, limit);
        const numPages = Math.ceil(products.count / limit);

        if (page > numPages) {
            next(createError(404));
        } else {
            const catalog = await catalogService.list(10)
            const pages = productService.pages(page, numPages)

            res.render('product/products',
                {
                    title: 'TNKStore',
                    product: products.rows,
                    pages: pages,
                    previous: pages[page - 2] || false,
                    next: pages[page] || false,
                    category: catalog,
                    categoryName: 'All'
                });
        }
    } catch (e) {
        console.log(e)
        next(createError(404));
    }
}

exports.getDetail = async (req, res, next) => {
    const id = parseInt(req.params.id)
    if (id) {
        const product = await productService.getDetail(id)
        if (product) {
            const related = await productService.listById(product.catalog_id)
            const catalog = await catalogService.list(10)

            res.render('product/product-detail',
                {
                    title: product.name,
                    product: product,
                    category: catalog,
                    products: related
                });
        } else {
            next(createError(404))
        }
    } else {
        next(createError(404))
    }
}