const {DataTypes} = require('sequelize');
const sequelize = require('../models/model')


Image = sequelize.define('image', {
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false
    },
    productId: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: `product_id`
    },
    url: {
        type: DataTypes.STRING,
    }
}, {
    freezeTableName: true,
    timestamps: false
})


module.exports = Image
