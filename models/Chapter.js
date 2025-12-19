module.exports = (sequelize, DataTypes) => {
  const Chapter = sequelize.define('Chapter', {
    course_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    duration: DataTypes.INTEGER
  }, {
    tableName: 'chapters',
    timestamps: false
  });

  return Chapter;
};