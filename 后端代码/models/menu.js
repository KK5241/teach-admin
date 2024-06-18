const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    menuId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    menuName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'menu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "menuId" },
        ]
      },
    ]
  });
};
