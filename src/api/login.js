import {instance} from './index.js'

export async function getLogin(user){
    return await instance.post('/login',user)
}

    