const {Sequelize, DataTypes} = require('sequelize');
const Product = require("./product");
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);


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
