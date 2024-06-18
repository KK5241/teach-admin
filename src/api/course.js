import {instance} from './index'

export async function getCourse(id){
    console.log(id);
    return await instance.post('getCourse',{
        Id:id
    })
}