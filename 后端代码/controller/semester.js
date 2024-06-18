const {semester}  = require('../config/dbconfig')

exports.getSemester = async (req,res)=>{
    const result = await semester.findAll()
    if(result.length>0){
        res.status(200).send({code:'0',data:result})
    }
}
exports.modifySemester = async (req,res)=>{
    const {newvalue,oldvalue} = req.body
    const result1 = await semester.update({
        isCurrent:'是'
    },{
        where:{
           semesterName:newvalue 
        }
    })
    const result2 = await semester.update({
        isCurrent:'否'
    },{
        where:{
           semesterName:oldvalue 
        }
    })
    res.status(200).send('更新成功')
}