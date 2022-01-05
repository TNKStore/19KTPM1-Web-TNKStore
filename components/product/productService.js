const Product = require("../../models/product")
const Catalog = require("../../models/catalog")
const Image = require("../../models/image")
const {Op} = require("sequelize");

const criteria = [
    {url: `/products?sort=newest`, value: `Mới nhất`, criteria: `newest`, column: [`created_at`, 'DESC']},
    {url: `/products?sort=popular`, value: `Phổ biến`, criteria: `popular`, column: [`amount_view`, 'DESC']},
    {url: `/products?sort=most_sale`, value: `Bán chạy`, criteria: `most_sale`, column: [`amount_sold`, 'DESC']}
];

exports.getCriteria = (catalog) => catalog ? Array(criteria.length)
    .fill("")
    .map((_, index) => {
        let criterion = criteria[index];
        criterion.url = `/products?catalog=${catalog}&sort=${criterion.criteria}`;
        return criterion;
    }) : criteria;

const priceRange = [
    {
        url: `/products?price=0,1000000`,
        value: `Dưới 1.000.000₫`,
        range: `0,1000000`,
        price: [0, 1000000]
    },
    {
        url: `/products?price=1000000,5000000`,
        value: `Từ 1.000.000₫ đến 5.000.000₫`,
        range: `1000000,5000000`,
        price: [1000000, 5000000]
    },
    {
        url: `/products?price=5000000,10000000`,
        value: `Từ 5.000.000₫ đến 10.000.000₫`,
        range: `5000000,10000000`,
        price: [5000000, 10000000]
    },
    {
        url: `/products?price=10000000,20000000`,
        value: `Từ 10.000.000₫ đến 20.000.000₫`,
        range: `10000000,20000000`,
        price: [10000000, 20000000]
    },
    {
        url: `/products?price=20000000,50000000`,
        value: `Từ 20.000.000₫ đến 50.000.000₫`,
        range: `20000000,50000000`,
        price: [20000000, 50000000]
    },
    {
        url: `/products?price=50000000,10000000000`,
        value: `Trên 50.000.000₫`,
        range: `50000000,10000000000`,
        price: [50000000, 10000000000]
    }
];

exports.getPriceRange = (catalog, orderBy) => {
    let query = "";
    if (catalog) {
        query += `catalog=${catalog}&`;
    }

    if (orderBy) {
        query += `sort=${orderBy}&`;
    }

    return (query === "") ? priceRange
        : Array(priceRange.length)
            .fill("")
            .map((_, index) => {
                const range = priceRange[index];
                range.url = `/products?${query}price=${range.range}`;
                return range
            });
}

exports.getPages = (page, numPages, orderBy) => orderBy ? Array(numPages)
    .fill("")
    .map((_, index) => {

        return {
            url: `/products?page=${index + 1}&sort=${orderBy}`,
            page: index + 1,
            active: page - 1 === index
        }
    }) : Array(numPages)
    .fill("")
    .map((_, index) => {

        return {
            url: `/products?page=${index + 1}`,
            page: index + 1,
            active: page - 1 === index
        }
    });

exports.list = (page, limit, catalogID, orderBy, price, search) => {
    const offset = (page - 1) * limit
    let options = {
        offset: offset, limit: limit,
        include: [{model: Image}]
    }
    let where = {}
    if (catalogID) {
        where.catalog_id = catalogID;
    }
    if (price) {
        const range = priceRange.filter((value) => value.range === price)[0].price
        where.price = {[Op.between]: range}
    }
    if (search) {
        where.name = {[Op.like]: `%${search}%`}
    }
    if (Object.keys(where).length) {
        options.where = where
    }
    if (orderBy) {
        const col = criteria.filter((value) => value.criteria === orderBy)[0].column;
        options.order = [col];
    }
    return Product.findAndCountAll(options)
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

exports.getDetail = (id) => Product.findOne({
    where: {
        id: id
    },
    include: [{model: Image}]
})

exports.updateAmountView = async (id) => {
    const product = await this.getDetail(id);
    product.amountView += 1;
    return product.save();
}