const {DataTypes} = require('sequelize')
const sequelize = require('../models/model')
const Product = require("./product");
const moment = require("moment");

Feedback = sequelize.define('feedback', {
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING
    },
    fullName: {
        type: DataTypes.STRING,
        field: `fullname`
    },
    createdAt: {
        type: DataTypes.DATE,
        field: `created_at`,
        default: moment(),
        get() {
            return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY hh:mm:ss');
        }
    },
    productID: {
        type: DataTypes.SMALLINT,
        field: `product_id`
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Feedback