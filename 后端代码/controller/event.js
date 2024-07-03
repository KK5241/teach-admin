const {
    event,
    user
} = require('../config/dbconfig')

event.belongsTo(user, {
    foreignKey: 'userId',
    as: 'eventUser'
})
exports.getEvent = async (req, res) => {
    const id = req.query.id
    var userId = null
    if (id) {
        userId = {
            userId: id
        }
    }
    console.log(id);
    const result = await event.findAll({
        where: userId,
        include: [{
            model: user,
            as: 'eventUser'
        }]
    })
    res.send(result)
}

exports.addEvent = async (req, res) => {
    const info = req.body.info; // 现在可以通过 req.body 访问表单字段
    const newInfo = JSON.parse(info)
    const file = req.file;
    await event.create({
        address: newInfo.address,
        type: newInfo.type,
        createTime: newInfo.createTime,
        picture: file.filename,
        content: newInfo.content,
        userId: newInfo.userId
    })
    res.send('添加成功')
}

exports.deleteEvent = async (req, res) => {
    const id = req.body.id
    await event.destroy({
        where: {
            id
        }
    })
    res.send('删除成功')
}