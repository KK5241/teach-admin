const {
    task,
    course
} = require('../config/dbconfig')

task.belongsTo(course, {
    foreignKey: 'courseId',
    as: 'taskCourse'
})

//获取任务列表
exports.getTasks = async (req, res) => {
    const {
        Id
    } = req.body
    let whereCondition 
    if (Id) {
        whereCondition = { courseId: Id };
    }
    const result = await task.findAll({
        where:whereCondition,
        include: [{
            model: course,
            as: 'taskCourse'
        }]
    })
    if (result.length > 0) {
        res.status(200).send({
            code: '0',
            data: result
        })
    }
}

//单文件上传

exports.uploadFile = async (req, res) => {
    const id = req.body.id
    console.log(req.file);
    if (req.file) {
        const file = req.file;
        const fileName = file.originalname;
        console.log(fileName);
        // 创建Task实例并保存文件
        const result = await task.update({
            status:'审核中',
            filePath:`http://localhost:3000/uploads/${file.filename}`,
            fileName: file.filename
        }, {
            where: {
                taskId: id
            }
        });
        res.send(`文件上传成功，ID: ${result.Id}`);

    } else {
        res.status(400).send('文件上传失败');
    }
}

exports.deleteFile = async (req,res)=>{
    const {id} = req.body
    const result = await task.update({
        filePath:null,
        fileName:null,
        status:'未上传',
        opinion:'',
        checked:''
    },{
        where:{
            taskId:id
        }
    })
    if(result.length > 0){
        res.status(200).send({code:'0',message:'删除成功'})
    }
}

exports.deleteTask = async (req, res) => {
    const {id} = req.query
    console.log(id);
    const result = await task.destroy({
        where:{
            taskId:id
        }
    })
    res.status(200).send('删除成功')
}

exports.modifyTask = async (req,res)=>{
    const {taskId,checked,opinion} = req.body.row
    console.log(taskId,checked,opinion);
    const result = await task.update({
        checked,
        opinion,
        status:'已审核'
    },{
        where:{
            taskId
        }
    }) 
    if(result.length > 0){
        res.status(200).send('更新成功')
    }
}