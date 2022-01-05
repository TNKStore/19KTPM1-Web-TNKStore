const productService = require("../product/productService");
const catalogService = require("./catalogService");
const createError = require("http-errors");

exports.list = async (req, res, next) => {
    const id = parseInt(req.params.id) || 1;
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    try {
        const category = await catalogService.getByID(id)
        const products = await productService.listByCatalogId(id, page, limit);
        const numPages = Math.ceil(products.count / limit);

        if (page > numPages) {
            next(createError(404));
        } else {
            const catalog = await catalogService.list(10)
            const pages = productService.getPages(page, numPages)

            res.render('product/products',
                {
                    title: 'TNKStore',
                    product: products.rows,
                    pages: pages,
                    previous: pages[page - 2] || false,
                    next: pages[page] || false,
                    category: catalog,
                    categoryName: category.name
                });
        }
    } catch (error) {
        console.log(error)
        next(createError(404));
    }
}
