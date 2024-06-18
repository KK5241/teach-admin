import { createWebHistory, createRouter } from 'vue-router'
import {routes} from './routes.js'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to)=>{
  if(to.path !=='/login'){
    const token = sessionStorage.getItem('token')
    if(!token){
        return '/login'
    }
  }
})
export default router