const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('semester', {
    semesterId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    semesterName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isCurrent: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'semester',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "semesterId" },
        ]
      },
    ]
  });
};
