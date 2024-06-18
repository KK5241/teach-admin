const {course,user} = require('../config/dbconfig')

course.belongsTo(user,{
    foreignKey: 'teacherId',
    as:"courseUser"
})
async function getCourse(req,res){
    const {Id} = req.body
    let a
    if(Id){
        a = {
            teacherId:Id
        }
    }
    const result = await course.findAll({
        where:a,
        include:[
            {
                model:user,
                as:'courseUser'
            }
        ]
    })
    if(result.length > 0){
        res.status(200).send({code:'0',data:result})
    }
}

module.exports = {
    getCourse
}