const {DataTypes} = require('sequelize')
const sequelize = require('../models/model')
const Bill = require("./bill");

Status = sequelize.define('status', {
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
})

Bill.belongsTo(Status, {targetKey: `id`, foreignKey: `status_id`})

module.exports = Status