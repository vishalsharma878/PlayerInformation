const Sequelize = require('sequelize');

const sequelize = new Sequelize('cricketinformation', 'root', '*******', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;