import Login from '../components/Login/Login.vue'
import Home from '../components/Home/Home.vue'
import HomePage from '../components/HomePage/HomePage.vue'
import Teach from '../components/Teach/Teach.vue'
import Class from '../components/Class/student.vue'
import Task from '../components/Task/Task.vue'
import FileManage from '../components/FileManage/fileManage.vue'
import User from '../components/User/User.vue'
export const routes = [
    {
        path: '/',
        component: Home,
        meta:{
            name:'首页'
        },
        children: [
            {
                path: 'home',
                component: HomePage,
                meta:{
                    name:'详情'
                }
            },
            {
                path:'teach',
                component:Teach,
                meta:{
                    name:'课程表'
                }
            },
            {
                path:'class',
                component:Class,
                meta:{
                    name:'学生管理'
                }
            },
            {
                path:'task',
                component:Task,
                meta:{
                    name:'任务情况'
                }
            },
            {
                path:'fileManage',
                component:FileManage,
                meta:{
                    name:'教学文件管理'
                },
            },
            {
                path:'user',
                component:User,
                meta:{
                    name:'用户管理'
                }
            },
        ]
    },
    {
        path: '/login',
        component: Login
    },
]