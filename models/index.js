const sequelize = require('../config/database');

const db = {};

db.Sequelize = require('sequelize');
db.sequelize = sequelize;

// Import des modèles
db.Message = require('./Message')(sequelize, db.Sequelize.DataTypes);
db.User = require('./User')(sequelize, db.Sequelize.DataTypes);
db.Course = require('./Course')(sequelize, db.Sequelize.DataTypes);
db.Category = require('./Category')(sequelize, db.Sequelize.DataTypes);
db.Review = require('./Review')(sequelize, db.Sequelize.DataTypes);
db.Enrollment = require('./Enrollment')(sequelize, db.Sequelize.DataTypes);
db.Chapter = require('./Chapter')(sequelize, db.Sequelize.DataTypes);
db.Certificate = require('./Certificate')(sequelize, db.Sequelize.DataTypes);
db.CourseCategory = require('./CourseCategory')(sequelize, db.Sequelize.DataTypes);


module.exports = db;
