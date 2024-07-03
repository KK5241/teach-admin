import Login from '../components/Login/Login.vue'
import Home from '../components/Home/Home.vue'
import Circle from '../components/Circle/Circle.vue'
import Event from '../components/Event/Event.vue'
import CircleDetail from '../components/Circle/CircleDetail.vue'
import HomePage from '../components/HomePage/HomePage.vue'
import Statistics from '../components/Statistics/Statistics.vue'
import notice from '../components/notice/notice.vue'
export const routes = [
    {
        path: '/',
        component: Home,
        meta:{
            name:'首页'
        },
        children: [
            {
                path: 'circle',
                component: Circle,
                meta:{
                    name:'通知公告'
                }
            },
            {
                path: 'data',
                component: HomePage,
                meta:{
                    name:'数据大屏'
                }
            },
            {
                path: 'event',
                component: Event,
                meta:{
                    name:'事件登记'
                }
            },
            {
                name: "circleDetail",
                path: '/circle/:id',
                component:CircleDetail,
                meta: {
                    title: '文章详情'
                }
            },
            {
                name: "statistics",
                path: '/statistics',
                component:Statistics,
                meta: {
                    title: '事件统计'
                }
            },
            {
                name: "notice",
                path: '/notice',
                component:notice,
                meta: {
                    title: '通知发布'
                }
            },
        ]
    },
    {
        path: '/login',
        component: Login
    },
]