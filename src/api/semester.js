import {instance} from './index'

export async function getSemester(){
    return instance.get('/getSemester')
}
export async function modifySemester(newvalue,oldvalue){
    return instance.post('/modifySemester',{
        newvalue,
        oldvalue
    })
}