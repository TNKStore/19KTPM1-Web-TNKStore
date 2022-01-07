const {DataTypes} = require('sequelize');
const sequelize = require('../models/model')
const Product = require("./product");
const User = require("./user");


CartDetail = sequelize.define('cartdetail', {
    userID: {
        type: DataTypes.SMALLINT,
        field: `user_id`
    },
    unAuthID: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: `unauth_id`
    },
    productID: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        field: `product_id`
    },
    quantity: {
        type: DataTypes.SMALLINT,
        default: 1
    }
}, {
    freezeTableName: true,
    timestamps: false
})

CartDetail.belongsTo(Product, {targetKey: `id`, foreignKey: `product_id`});
CartDetail.belongsTo(User, {targetKey: `id`, foreignKey: `user_id`});

module.exports = CartDetail