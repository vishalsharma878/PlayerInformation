const Sequelize = require('sequelize');
const sequelize = require('../util/databasePath'); // Import your Sequelize configuration

const Player = sequelize.define('Player', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  dob: Sequelize.DATEONLY,
  photo: Sequelize.STRING,
  birthplace: Sequelize.STRING,
  summary: Sequelize.TEXT,
  matches: Sequelize.INTEGER,
  score: Sequelize.INTEGER,
  fifties: Sequelize.INTEGER,
  centuries: Sequelize.INTEGER,
  wickets: Sequelize.INTEGER,
  average: Sequelize.DOUBLE,
});

module.exports = Player;
