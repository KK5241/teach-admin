const {comment,user} = require('../config/dbconfig')
comment.belongsTo(user,{
    foreignKey:'userId',
    as:'commentUser'
})

exports.getComment = async (req,res)=>{
    const id  = req.query.id
    const result = await comment.findAll({
        where:{
            circleId:id
        },
        include:[
            {
                model:user,
                as:'commentUser'    
            }
        ]
    })
    res.send(result)
}

exports.addComment = async (req,res)=>{
    const info = req.body.info
    await comment.create({
        userId:info.id,
        content:info.content,
        createTime:info.createTime,
        circleId:info.circleId
    })
    res.send('添加成功 ')
}