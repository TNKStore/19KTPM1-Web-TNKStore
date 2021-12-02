const {DataTypes} = require('sequelize');
const sequelize = require('../models/model')
const Catalog = require("./catalog")

Product = sequelize.define('product', {
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    img: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    old_price: {
        type: DataTypes.INTEGER
    },
    update_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    description: {
        type: DataTypes.STRING
    },
    catalog_id: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    hide: {
        type: DataTypes.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Product.belongsTo(Catalog, {foreignKey: `catalog_id`, targetKey: `id`})

module.exports = Product
