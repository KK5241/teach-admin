const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task', {
    taskId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    taskName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    courseId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'course',
        key: 'courseId'
      }
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    filePath: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    opinion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    checked: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fileName: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'task',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "taskId" },
        ]
      },
      {
        name: "a",
        using: "BTREE",
        fields: [
          { name: "courseId" },
        ]
      },
    ]
  });
};
