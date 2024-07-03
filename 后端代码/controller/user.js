const {user} = require('../config/dbconfig')
const jwt = require('jsonwebtoken')
const secretKey = 'jwtkey123'
exports.getUser = async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1]
    if(token){
        try {
            const info = jwt.verify(token,secretKey)
            const result = await user.findAll({
                where:{
                    loginId:info.loginId
                }
            })
            res.send(result)
        } catch (error) {
            console.log(error);
        }
    }else{
        res.send('请求失败')
    }
}

exports.updateAvatar = async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const file = req.file
    if(token){
        try {
            const info = jwt.verify(token,secretKey)
            const result = await user.update({
                avatar:file.filename
            },
                {
                where:{
                    loginId:info.loginId
                }
            })
            res.send(result)
        } catch (error) {
            console.log(error);
        }
    }else{
        res.send('请求失败')
    }
}
exports.modifyUser = async (req,res)=>{
    const token = req.headers.authorization.split(' ')[1]
    const a = req.body.info
    if(token){
        try {
            const info = jwt.verify(token,secretKey)
            await user.update({
                name:a.name,
                sex:a.sex,
                roleId:a.roleId,
                age:a.age
            },
                {
                where:{
                    loginId:info.loginId
                }
            })
            res.send('更新成功')
        } catch (error) {
            console.log(error);
        }
    }else{
        res.send('请求失败')
    }
   
}