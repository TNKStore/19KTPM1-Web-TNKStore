const {DataTypes} = require('sequelize');
const sequelize = require('../models/model')
const Bill = require("./bill");

Payment = sequelize.define('payment', {
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false,
        field: `id`
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: `name`
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Bill.belongsTo(Payment, {targetKey: `id`, foreignKey: `payment_id`});

module.exports = Payment
