module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define('Enrollment', {
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    tableName: 'enrollments',
    timestamps: false
  });

  return Enrollment;
};
