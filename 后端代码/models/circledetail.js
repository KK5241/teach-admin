const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('circledetail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    connect: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    circleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'circle',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'circledetail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "circleId",
        using: "BTREE",
        fields: [
          { name: "circleId" },
        ]
      },
    ]
  });
};
