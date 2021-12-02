const {DataTypes} = require('sequelize');
const sequelize = require('../models/model')


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

module.exports = Catalog
