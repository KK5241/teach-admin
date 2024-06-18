var DataTypes = require("sequelize").DataTypes;
var _course = require("./course");
var _menu = require("./menu");
var _relative = require("./relative");
var _role = require("./role");
var _semester = require("./semester");
var _task = require("./task");
var _user = require("./user");

function initModels(sequelize) {
  var course = _course(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var relative = _relative(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var semester = _semester(sequelize, DataTypes);
  var task = _task(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  task.belongsTo(course, { as: "course", foreignKey: "courseId"});
  course.hasMany(task, { as: "tasks", foreignKey: "courseId"});
  relative.belongsTo(menu, { as: "menu", foreignKey: "menuId"});
  menu.hasMany(relative, { as: "relatives", foreignKey: "menuId"});
  relative.belongsTo(role, { as: "role", foreignKey: "roleId"});
  role.hasMany(relative, { as: "relatives", foreignKey: "roleId"});
  user.belongsTo(role, { as: "role_role", foreignKey: "role"});
  role.hasMany(user, { as: "users", foreignKey: "role"});
  course.belongsTo(user, { as: "teacher", foreignKey: "teacherId"});
  user.hasMany(course, { as: "courses", foreignKey: "teacherId"});

  return {
    course,
    menu,
    relative,
    role,
    semester,
    task,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
