import axios from 'axios'
const instance = axios.create({
    baseURL:'http://localhost:3000'
})

instance.interceptors.request.use(config=>{
   console.log(config.url);
   if(config.url !== '/login'){
    const token = sessionStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}` 
    }
   }
   console.log(config); 
   return config
})

export {instance}