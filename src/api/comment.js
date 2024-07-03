import {instance} from './index' 

export async function getComment(id){
    return await instance.get('/getCommnet',{
        params:{
            id
        }
    })
}
export async function addComment(info){
    return await instance.post('/addComment',{
        info
    })
}