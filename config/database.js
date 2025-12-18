const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../mds_b3dev_api_dev.db3'),
  logging: false
});


module.exports = sequelize;
