const {DataTypes} = require('sequelize');
const sequelize = require('../models/model')
const Product = require("./product");


Catalog = sequelize.define('catalog', {
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Product.belongsTo(Catalog, {foreignKey: `catalog_id`, targetKey: `id`});

module.exports = Catalog
