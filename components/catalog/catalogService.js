const Catalog = require("../../models/catalog")

exports.list = limit => {
    if (limit) {
        return Catalog.findAll({offset: 0, limit: limit})
    } else {
        return Catalog.findAll()
    }
}

exports.getByID = id => Catalog.findOne({where: {id: id}})