const Product = require("../../models/product")
const Catalog = require("../../models/catalog")
const Image = require("../../models/image")

exports.list = (page, limit) => {
    const offset = (page - 1) * limit
    return Product.findAndCountAll({offset: offset, limit: limit})
}

exports.listByCatalogId = (catalog_id, page, limit) => {
    if (page && limit) {
        const offset = (page - 1) * limit
        return Product.findAndCountAll(
            {
                offset: offset, limit: limit,
                where: {catalog_id: catalog_id},
                include: [{model: Image}]
            })
    } else {
        return Product.findAndCountAll(
            {
                where: {catalog_id: catalog_id},
                include: [{model: Image}]
            })
    }
}


exports.listProductWithCatalog = Product.findAll({
    include: [{
        model: Catalog
    }]
})

exports.pages = (page, numPages) => Array(numPages)
    .fill("")
    .map((_, index) => {
        return {
            url: `/products?page=${index + 1}`,
            page: index + 1,
            active: page - 1 === index
        }
    });

exports.getDetail = (id) => Product.findOne({
    where: {
        id: id
    },
    include: [{model: Image}]
})