const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize('school_management', 'root', 'Sita123@@', {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
    logging: false,
});

module.exports = sequelize;