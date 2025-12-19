module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    label: DataTypes.STRING
  }, {
    tableName: 'categories',
    timestamps: false
  });

  return Category;
};
