const { raw } = require('mysql');
const {
    user,
    role,
    menu,
    relative
} = require('../config/dbconfig')
const jwt = require('jsonwebtoken')
const secretKey = 'jwtkey123'
user.belongsTo(role, {
    foreignKey: 'roleId',
    as: 'roleAlias'
});
role.belongsToMany(menu, {
    through: relative,
    foreignKey: 'roleId'
});
menu.belongsToMany(role, {
    through: relative,
    foreignKey: 'menuId'
});
async function login(req, res) {
    console.log("1")
    const {
        loginId,
        loginPwd,
    } = req.body
    console.log(loginId, loginPwd);
    const result = await user.findAll({
        where: {
            loginId: loginId,
            loginPwd: loginPwd,
        },
        include: [{
            model: role,
            as: 'roleAlias',
            include: {
                model: menu,
                through: {
                    model: relative,
                    attributes: ['roleId', 'menuId'],
                }
            }
        }, ],
        raw:true
    })
    if (result.length > 0) {
        console.log(result);
        const token = jwt.sign({
                loginId: loginId,
                role: role
            },
            secretKey, {
                expiresIn: '10h'
            }
        )
        res.json({
            code: '0',
            msg: '登陆成功',
            token: token,
            data:result
        })
    } else {
        res.json({
            code: '400',
            msg: '用户名或密码错误',
            data: null
        })
    }
}

module.exports = {
    login
}

