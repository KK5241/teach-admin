const express = require('express')
const {
    v4: uuidv4
} = require('uuid');
const {
    getUser,
    deleteUser,
    updateAvatar,
    modifyUser1
} = require('./user')
const crypto = require('crypto');
const router = express.Router()
const {
    login
} = require('./login')
const {
    getCourse
} = require('./course')
const multer = require('multer');
const path = require('path');
const {
    getTasks,
    uploadFile,
    deleteFile,
    deleteTask,
    modifyTask
} = require('./task')
const {getSemester,modifySemester} = require('./semester')

//文件上传中间件配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/uploads/'); // 指定文件保存的路径
    },
    filename: function (req, file, cb) {
        // 生成唯一的前缀，例如使用 uuidv4
        const prefix = uuidv4();
        // 使用 md5 哈希算法生成文件名哈希
        const hash = crypto.createHash('md5').update(prefix).digest('hex');
        // 创建完整的文件名，包括扩展名
        const filename = `${hash}${path.extname(file.originalname)}`;
        // 调用 cb 函数并传递新的文件名
        cb(null, filename);
    }
});



//文件上传的中间件
const upload = multer({
    storage
});

router.post('/login', login)
router.post('/getCourse', getCourse)
router.post('/getTasks', getTasks)
router.post('/upload', upload.single('file'), uploadFile);
router.post('/deleteFile', deleteFile)
router.get('/getUser', getUser)
router.delete('/deleteUser', deleteUser)
router.delete('/deleteTask', deleteTask)
router.post('/updateAvatar', upload.single('file'),  updateAvatar)
router.post('/modifyTask', modifyTask)
router.post('/modifyUser1', modifyUser1)
router.get('/getSemester', getSemester)
router.post('/modifySemester', modifySemester)
module.exports = router