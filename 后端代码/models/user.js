const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    loginId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    loginPwd: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'role',
        key: 'roleId'
      }
    },
    sex: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    course: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    main: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
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
        name: "ab",
        using: "BTREE",
        fields: [
          { name: "role" },
        ]
      },
    ]
  });
};
