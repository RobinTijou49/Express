module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    instructor_id: DataTypes.INTEGER
  }, {
    tableName: 'courses',
    timestamps: false
  });
    return Course;
};
