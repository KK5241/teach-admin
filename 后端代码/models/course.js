const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('course', {
    courseId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    courseNum: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    courseName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    teacherId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    class: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    semester: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'course',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "courseId" },
        ]
      },
      {
        name: "teacherId",
        using: "BTREE",
        fields: [
          { name: "teacherId" },
        ]
      },
    ]
  });
};
