module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    tableName: 'reviews',
    timestamps: false
  });

  return Review;
};