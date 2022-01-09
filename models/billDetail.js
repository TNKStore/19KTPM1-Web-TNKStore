const {DataTypes} = require('sequelize');
const sequelize = require('../models/model')
const Product = require("./product");
const Bill = require("./bill");


BillDetail = sequelize.define(`billdetail`, {
    billID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: `bill_id`
    },
    productID: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        field: `product_id`
    },
    amount: {
        type: DataTypes.SMALLINT,
        default: 1,
        field: `amount`
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Bill.belongsToMany(Product, {through: BillDetail, foreignKey: `bill_id`})
Product.belongsToMany(Bill, {through: BillDetail, foreignKey: `product_id`})

module.exports = BillDetail