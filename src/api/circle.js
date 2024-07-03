import {
    instance
} from './index'

export async function getCircle() {
    return await instance.get('/getCircle')
}
export async function getCircleDetail(id) {
    return await instance.get('/getCircleDetail', {
        params: {
            id
        }
    })
}

export async function addCircle(info, file) {
    const formdata = new FormData()
    formdata.append('info', JSON.stringify(info))
    formdata.append('file', file)
    return await instance.post('/addCircle',
        formdata, {
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8',
            }
        })
}

export async function deleteCircle(id){
    return await instance.post('/deleteCircle',{
        id  
    })
}