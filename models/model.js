const {Sequelize} = require("sequelize");

sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);

module.exports = sequelize;