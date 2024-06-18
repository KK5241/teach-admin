const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    roleId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    roleName: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "roleId" },
        ]
      },
    ]
  });
};
