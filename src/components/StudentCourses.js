import { useState } from "react"

export default function StudentCourses({studentCourses,setStudentCourses}){
    const [page,setPage] = useState(0)
     let {needed,token} = studentCourses
 
    const nextPage=()=>{
        if((page+1)*10<needed.length){
            setPage(page+1);
        }
    }
    const prevPage=()=>{
        if(page>0){
            setPage(page-1);
        }
    }

    const tablePage=(page)=>{
        const arr=needed.filter((ele,index)=>{
            return index>page*10 && index<(page+1)*10
        })

        return arr.map(element=>{
           let details;
           if(element.details instanceof Array){
              if(element.details[0] instanceof Array){
                details = element.details[0]
              }else{
                details = element.details
              }
           }
           if(details.length==0){
            return <tr>
                <td>{element.name}</td>
                <td>❌</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
           }
           return <tr>
                <td>{element.name}</td>
                <td>✅</td>
                <td>{details[2]}</td>
                <td>{details[4]}</td>
                <td>{details[3]=="None"?"No":"Yes"}</td>
            </tr>
        })
    }

    const SortBasedOnAvaibility=()=>{
        let newObject ={...studentCourses}
       newObject.token = [...newObject.token]
       newObject.token.sort((a,b)=>{

       
        let details1;
        if(a.details instanceof Array){
           if(a.details[0] instanceof Array){
             details1 = a.details[0]
           }else{
             details1 = a.details
           }
        }

        let details2;
        if(b.details instanceof Array){
           if(b.details[0] instanceof Array){
             details2 = b.details[0]
           }else{
             details2 = b.details
           }
        }     
        
        console.log("a"+JSON.stringify(a))
        console.log("b"+details2)
        return 1
        return details1.length-details2.length
       })
       setStudentCourses(newObject)
    }
    
    if(!studentCourses){
        return <></>
    }
   
    needed = needed.flat()
    return <div>
        <h1>Student courses</h1>
<div style={{display:"flex",flexDirection:"column",alignItems:"start",justifyContent:"center",gap:10}}>
      <div>
       <button onClick={prevPage}>Prev</button>
       <span>{page}</span>
       <button onClick={nextPage}>Next</button>
      </div>
      <table>
        <tr>
            <th>Course Code </th>
            <th onClick={SortBasedOnAvaibility}>Available in Winter 2024 </th>
            <th>Subject</th>
            <th>Times</th>
            <th>Has prerequisite?</th>
        </tr>
        {tablePage(page)}
      </table>
    {/*
      <table>
        <tr>
            <th>Token course</th>
            <th>Grade</th>
        </tr>
        {token.map(element=>{
            return <tr>
                <td>{element.course}</td>
                <td>{element.grade}</td>
            </tr>
        })}
      </table>
      */}
    </div>
    </div>
}