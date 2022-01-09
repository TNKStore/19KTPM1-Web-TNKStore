const {DataTypes} = require('sequelize');
const sequelize = require('../models/model')
const moment = require("moment");


Bill = sequelize.define('bill', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: DataTypes.SMALLINT,
        field: `user_id`
    },
    address: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: `address`
    },
    phone: {
        type: DataTypes.STRING,
        default: 1
    },
    total: {
        type: DataTypes.INTEGER
    },
    paymentID: {
        type: DataTypes.TINYINT,
        field: `payment_id`
    },
    statusID: {
        type: DataTypes.TINYINT,
        field: `status_id`
    },
    createdAt: {
        type: DataTypes.DATE,
        field: `created_at`,
        get() {
            return {
                date: moment(this.getDataValue('createdAt')).format('DD/MM/YYYY'),
                datetime: moment(this.getDataValue('createdAt')).format('DD/MM/YYYY hh:mm:ss')
            };
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = Bill