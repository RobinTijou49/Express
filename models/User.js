module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    role: DataTypes.STRING
  }, {
    tableName: 'users',
    timestamps: false
  });

  return User;
};
