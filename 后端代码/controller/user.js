const {
    user,
    role,
    course
} = require('../config/dbconfig')
const {
    Op
} = require('sequelize');

user.belongsTo(role, {
    foreignKey: 'role',
    as: 'userRole'
})

exports.getUser = async (req, res) => {
    const result = await user.findAll({
        attributes: {
            exclude: ['loginPwd']
        },
        where: {
            role: {
                [Op.not]: '303'
            }
        },
        include: [{
            model: role,
            as: 'userRole'
        }]
    })
    if (result.length > 0) {
        res.status(200).send({
            data: result
        })
    }
}

// exports.getMyUser = async (req,res)

exports.deleteUser = async (req, res) => {
    const {
        id
    } = req.query
    console.log(id);
    const result1 = await course.destroy({
        where: {
            teacherId: id
        }
    })
    const result2 = await user.destroy({
        where: {
            Id: id
        },
    })
    res.status(200).send('删除成功')
}

exports.modifyUser = async (req, res) => {
    const {
        loginId
    } = req.body
    const result = await user.update({

    })
}

exports.updateAvatar = async (req, res) => {
    console.log(req.file);
    const {
        id
    } = req.body
    const file = req.file
    const result = await user.update({
        avatar: `http://localhost:3000/uploads/${file.filename}`
    }, {
        where: {
            id
        }
    })
    if (result.length > 0) {
        res.status(200).send('更新成功')
    }
}

exports.modifyUser1 = async (req,res)=>{
    const {id,name,loginId,role,title,main} = req.body.info
    console.log(id,name,loginId,role,title,main);
    const result = await user.update({
        name,
        main,
        title,
        role,
        loginId      
    },{
        where:{
            id
        }
    })
    if(result.length>0){
        res.status(200).send('更新成功')
    }
}