const SERVER_URI = "http://127.0.0.1:5000"

export const checkCourse = async(course,token) => {
    return await fetch(`${SERVER_URI}/check_course`,{
        method:"POST",
        headers:{
        'content-type':"application/json",
        },
        body:JSON.stringify({data:course,token})
    }).then(res=>{
        return res.json();
    }).then(res=>{
        
        return res
       
    })
}

export const checkAttr = async(attr,token) => {
    return await fetch(`${SERVER_URI}/check_attr`,{
        method:"POST",
        headers:{
        'content-type':"application/json",
        },
        body:JSON.stringify({data:attr,token})
    }).then(res=>{
        return res.json();
    }).then(res=>{
        return res;
    });
}