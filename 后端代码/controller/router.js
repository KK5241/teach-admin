const express = require('express')
const {
    v4: uuidv4
} = require('uuid');

const crypto = require('crypto');
const router = express.Router()
const {
    login,
} = require('./login')

const {getUser,updateAvatar,modifyUser} = require('./user')
const multer = require('multer');
const path = require('path');
const { getCircle,getCircleDetail,addCircle,deleteCircle } = require('./circle');
const {getEvent,addEvent,deleteEvent} = require('./event.js');
const {getComment,addComment} = require('./comment.js')

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
router.get('/getUser',getUser)
router.post('/updateAvatar',upload.single('file'),updateAvatar)
router.post('/modifyUser',modifyUser)
router.get('/getCircle',getCircle)
router.get('/getCircleDetail',getCircleDetail)
router.get('/getEvent',getEvent)
router.post('/addEvent',upload.single('file'),addEvent)
router.post('/deleteEvent',deleteEvent)
router.post('/deleteCircle',deleteCircle)
router.post('/addComment',addComment)
router.get('/getCommnet',getComment)
router.post('/addCircle',upload.single('file'),addCircle)
module.exports = router