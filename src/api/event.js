import {
    instance
} from './index'

export async function getEvent(id) {
    return await instance.get('/getEvent', {
        params: {
            id
        }
    })
}

export async function addEvent(info, file) {
    const formdata = new FormData()
    formdata.append('info', JSON.stringify(info))
    formdata.append('file', file)
    return await instance.post('/addEvent',
        formdata, {
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8',
            }
        })
}
export async function deleteEvent(id){
    return await instance.post('/deleteEvent',{
        id
    })
}