export default function(fn,delay){
    var timeId;
    return function(){
        if(timeId){
            return 
        }
        timeId = setTimeout(()=>{
            fn(),
            timeId = null
        },delay)
    }
}