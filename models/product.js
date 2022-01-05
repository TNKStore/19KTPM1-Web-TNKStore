const {DataTypes} = require('sequelize');
const sequelize = require('../models/model')
const Image = require("./image")

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
    price: {
        type: DataTypes.INTEGER
    },
    oldPrice: {
        type: DataTypes.INTEGER,
        field: 'old_price'
    },
    updateAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'update_at'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
    description: {
        type: DataTypes.STRING
    },
    catalogID: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: 'catalog_id'
    },
    hide: {
        type: DataTypes.BOOLEAN
    },
    amountView: {
        type: DataTypes.INTEGER,
        default: 0,
        field: 'amount_view'
    },
    amountSold: {
        type: DataTypes.INTEGER,
        default: 0,
        field: 'amount_sold'
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Product.hasMany(Image);
Image.belongsTo(Product, {foreignKey: `product_id`, targetKey: `id`})

module.exports = Product
