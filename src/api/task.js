import {
    instance
} from './index.js'

export async function getTasks(id) {
    return await instance.post('/getTasks', {
        Id: id
    })
}

export async function uploadFile(file, id, callback) {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', file, file.name);
    console.log(formData); 
    return await instance.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data;charset=utf-8',
        },

        onUploadProgress: (e) => {
            // 处理上传进度
            callback(e)
          }
    })
}

export async function deleteFile(id){
    return await instance.post('/deleteFile',{
        id
    })
}
export async function deleteTask(id){
    return instance.delete('/deleteTask',{
        params:{
            id
        }
    })
}

export async function modifyTask(row){
    return instance.post('/modifyTask',{
        row
    })
}