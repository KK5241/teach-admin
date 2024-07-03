const {circle} = require('../config/dbconfig.js')

exports.getCircle = async (req,res)=>{
    const result = await circle.findAll({
        attributes: {
            exclude: ['content']
          }
    })
    res.send(result)
}
exports.getCircleDetail = async (req,res)=>{
    const id = req.query.id
    const result = await circle.findAll({
        where:{
            id
        }   
    })
    res.send(result)
}

exports.addCircle = async (req,res)=>{
    const info = req.body.info; // 现在可以通过 req.body 访问表单字段
    const newInfo = JSON.parse(info)
    const file = req.file;
    console.log(newInfo,file);
    await circle.create({
        title:newInfo.title,
        description:newInfo.description,
        content:newInfo.content,
        createDate:newInfo.createTime,
        thumb:file.filename
    })
    res.send('添加成功')
}

exports.deleteCircle = async (req, res) => {
    const id = req.body.id
    await circle.destroy({
        where: {
            id
        }
    })
    res.send('删除成功')
}