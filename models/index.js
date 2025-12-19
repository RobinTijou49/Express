const sequelize = require('../config/database');

const db = {};

db.Sequelize = require('sequelize');
db.sequelize = sequelize;

// Import des modèles
db.Message = require('./Message')(sequelize, db.Sequelize.DataTypes);
db.User = require('./User')(sequelize, db.Sequelize.DataTypes);


module.exports = db;
