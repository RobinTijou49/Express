module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: { notEmpty: true }
    },
    room: {                   
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Messages',
    timestamps: true,         
    updatedAt: false          
  });

  return Message;
};
