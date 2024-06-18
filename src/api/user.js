import { instance } from "./index";

export async function getUser(id){
    return instance.get('/getUser',{
        params:{
            id
        }
    })
}

export async function deleteUser(id){
    return instance.delete('/deleteUser',{
        params:{
            id
        }
    })
}

export async function updateAvatar(id,file){
    console.log(id,file);
    return instance.post('/updateAvatar',{
        id,
        file
    },{
        headers:{
            'Content-Type': 'multipart/form-data;charset=utf-8',
        }
    })
}

export async function modifyUser1(info){
    console.log('#',info);
    return instance.post('/modifyUser1',{
        info
    })
}