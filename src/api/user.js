import { instance } from "./index";

export async function getUser(){
    return instance.get('/getUser')
}

export async function deleteUser(id){
    return instance.delete('/deleteUser',{
        params:{
            id
        }
    })
}

export async function updateAvatar(file){
    console.log(file);
    return instance.post('/updateAvatar',{
        file
    },{
        headers:{
            'Content-Type': 'multipart/form-data;charset=utf-8',
        }
    })
}

export async function modifyUser(info){
    return instance.post('/modifyUser',{
        info
    })
}