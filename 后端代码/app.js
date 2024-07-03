const express = require('express')
const router = require('./controller/router')
const cors = require('cors')
const app = express()

app.use(cors())
//允许客户端访问静态资源的配置
app.use('/assets', express.static('assets'));

app.use(express.urlencoded())
app.use(express.json())
app.use(router)

app.listen(3000, () => {
    console.log('https://www.localhost:3000');
})