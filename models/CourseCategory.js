module.exports = (sequelize, DataTypes) => {
  const CourseCategory = sequelize.define('CourseCategory', {
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    tableName: 'course_categories',
    timestamps: false
  });
    return CourseCategory;
};