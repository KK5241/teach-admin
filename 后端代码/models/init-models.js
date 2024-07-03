var DataTypes = require("sequelize").DataTypes;
var _circle = require("./circle");
var _comment = require("./comment");
var _event = require("./event");
var _eventtype = require("./eventtype");
var _menu = require("./menu");
var _relative = require("./relative");
var _role = require("./role");
var _user = require("./user");

function initModels(sequelize) {
  var circle = _circle(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var event = _event(sequelize, DataTypes);
  var eventtype = _eventtype(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var relative = _relative(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  comment.belongsTo(circle, { as: "circle", foreignKey: "circleId"});
  circle.hasMany(comment, { as: "comments", foreignKey: "circleId"});
  event.belongsTo(eventtype, { as: "type_eventtype", foreignKey: "type"});
  eventtype.hasMany(event, { as: "events", foreignKey: "type"});
  relative.belongsTo(menu, { as: "menu", foreignKey: "menuId"});
  menu.hasMany(relative, { as: "relatives", foreignKey: "menuId"});
  relative.belongsTo(role, { as: "role", foreignKey: "roleId"});
  role.hasMany(relative, { as: "relatives", foreignKey: "roleId"});
  user.belongsTo(role, { as: "role", foreignKey: "roleId"});
  role.hasMany(user, { as: "users", foreignKey: "roleId"});
  comment.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(comment, { as: "comments", foreignKey: "userId"});

  return {
    circle,
    comment,
    event,
    eventtype,
    menu,
    relative,
    role,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
