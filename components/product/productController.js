const productService = require("./productService");
const catalogService = require("../catalog/catalogService");
const userService = require("../user/userService");
const createError = require("http-errors");
const feedbackService = require("./feedbackService");

exports.list = async (req, res, next) => {
    let page = parseInt(req.query.page) || 1;
    const {sort: orderBy, price, catalog, search} = req.query;

    const limit = 9;
    try {
        let products = await productService.list(page, limit, catalog, orderBy, price, search);
        const numPages = Math.ceil(products.count / limit);

        if (page > numPages) {
            if (numPages > 0) {
                page = numPages;
                products = await productService.list(page, limit, catalog, orderBy, price, search);
            }
        }

        const catalogs = await catalogService.list(10)
        const pages = productService.getPages(page, numPages, catalog, orderBy, price, search)
        const criteria = productService.getCriteria(catalog)
        const range = productService.getPriceRange(catalog, orderBy)

        res.render('product/products',
            {
                title: 'TNKStore',
                product: products.rows,
                pages: pages,
                previous: pages[page - 2] || false,
                next: pages[page] || false,
                sort: orderBy ? criteria.filter((value) => value.criteria === orderBy)[0].value
                    : "Product sort by",
                priceRange: price ? range.filter((value) => value.range === price)[0].value
                    : "Product price range",
                range,
                criteria,
                searchQuery: search || "Search product",
                category: catalogs,
                categoryName: catalog ? (await catalogService.getByID(catalog)).name : 'All'
            });

    } catch (e) {
        console.log(e)
        next(createError(404));
    }
}

exports.getDetail = async (req, res, next) => {
    const id = parseInt(req.params.id)
    if (id) {
        const isViewed = req.session.viewedProduct.includes(id);
        const product = isViewed ? await productService.getDetail(id) :
            await productService.updateAmountView(id)
        if (!isViewed)
            req.session.viewedProduct.push(id);

        if (product) {
            const related = await productService.listByCatalogId(product.catalog_id)
            const catalog = await catalogService.list(10)

            let page = parseInt(req.query.reviews) || 1;
            const limit = 5;
            let feedbacks = await feedbackService.list(id, page, limit);
            const numPages = Math.ceil(feedbacks.count / limit);

            if (page > numPages) {
                if (numPages > 0) {
                    page = numPages;
                    feedbacks = await feedbacks.list(id, page, limit);
                }
            }

            const pages = feedbackService.getPages(id, page, numPages)

            res.render('product/product-detail',
                {
                    title: product.name,
                    product: product,
                    category: catalog,
                    products: related.rows,
                    user: req.user ? await userService.findByEmail(req.user.email) : null,
                    feedback: feedbacks.rows,
                    pages: pages,
                    previous: pages[page - 2] || false,
                    next: pages[page] || false,
                });
        } else {
            next(createError(404))
        }
    } else {
        next(createError(404))
    }
}