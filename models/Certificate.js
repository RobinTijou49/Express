module.exports = (sequelize, DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    enrollment_id: DataTypes.INTEGER,
    issue_date: DataTypes.DATE,
    serial_number: DataTypes.STRING
  }, {
    tableName: 'certificates',
    timestamps: false
  });

  return Certificate;
};
