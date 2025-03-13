const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('school_management', 'root', 'Sita123@@', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = sequelize;