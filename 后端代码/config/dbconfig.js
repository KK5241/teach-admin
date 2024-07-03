const {
    Sequelize
} = require('sequelize');
const initModels = require('../models/init-models')
const DB = new Sequelize('village', 'root', '123456', {
    host: 'localhost', //数据库地址,默认本机
    port: '3307',
    dialect: 'mysql',
    pool: { //连接池设置
        max: 5, //最大连接数
        min: 0, //最小连接数
        idle: 10000
    },
});

DB.authenticate()
    .then(() => console.log('数据库连接成功'))
    .catch((err) => console.log('数据库连接失败：' + error))

const model = initModels(DB)
module.exports = {
    DB,
    ...model
}