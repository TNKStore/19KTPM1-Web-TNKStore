const {DataTypes} = require('sequelize');
const sequelize = require('../models/model')

User = sequelize.define('user', {
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
    },
    email: {
        type: DataTypes.STRING,
        field: 'email',
        unique: true
    },
    pwd: {
        type: DataTypes.STRING,
        field: 'pwd'
    },
    phone: {
        type: DataTypes.STRING,
        field: 'phone'
    },
    address: {
        type: DataTypes.STRING,
        field: 'address'
    }

}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = User
