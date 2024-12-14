import { useState } from "react"

export default function StudentCourses({fillSchedule,studentCourses,setStudentCourses}){
  
    const [onlyWinter,setOnlyWinter] = useState(false);
    const [onlyMetPre , setOnlyMetPre] = useState(false);
     let {needed,token} = studentCourses
     const flatted=[]
   
     for(let need of needed){

      for(let el of need){
       
        let name = el.name
        let details = el.details
       

        if(details.length==0){
          flatted.push([name,"-","-","-","-","-","-"])
          continue
        }

    
        
        for(let row of details){
          flatted.push([name,...row])
          
        }

     
      }
      
     }

   
    
 
 

    const tablePage=()=>{
     
      const arr =  flatted.filter(element=>{
         return element[1] !== "-" || !onlyWinter
      }).filter(element=>{
        const met_pre = element[6];
        const has_pre = element[4] !== "None"
        return !onlyMetPre || (!has_pre || met_pre)
      })
      
      arr.sort((a,b)=>{
        let code1 = Number(a[0].split(" ")[1])
        let code2 = Number(b[0].split(" ")[1])
        
        return code1-code2

      })
      return arr.map(element=>{   
    const course_code  = element[0]
    const course_name = element[3];
    const course_times = element[5];
    const met_pre = element[6];
    const has_pre = element[4] !== "None"
    const available_winter = element[1] !== "-"
       

      return  <tr>
        <td>{course_code}</td>
        <td>{available_winter?"✅":"x"}</td>
        <td>{course_name}</td>
        <td>{course_times}</td>
        <td>{has_pre?"Yes":"No"}</td>
        <td>{(!has_pre || met_pre)?"Yes":"No"}</td>
        
    </tr>
      })
  
    }

    
    
    if(!studentCourses){
        return <></>
    }
   
    needed = needed.flat()
    
    return <div>
        <h1>Student courses</h1>
<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
    
      <div style={{cursor:"pointer",border:"2px solid grey",padding:5,borderRadius:5,background:"lightgreen"}} onClick={()=>{
        setOnlyWinter(!onlyWinter)
      }}> {onlyWinter?"Show all course":"Keep only winter semeter"}</div>

<div style={{cursor:"pointer",border:"2px solid grey",padding:5,borderRadius:5,background:"lightgreen"}} onClick={()=>{
       
       setOnlyMetPre(!onlyMetPre)
      }}> {onlyMetPre?"Show all courses":"Keep only satisfied"}</div>

<div  style={{cursor:"pointer",border:"2px solid grey",padding:5,borderRadius:5,background:"lightgreen"}} onClick={()=>{
        let arr =  flatted.filter(element=>{
          return element[1] !== "-" 
       })
       
       arr.sort((a,b)=>{
         let code1 = Number(a[0].split(" ")[1])
         let code2 = Number(b[0].split(" ")[1])
         
         return code1-code2
 
       })
     arr =  arr.map(element=>{   
     const course_code  = element[0]
     const course_name = element[3];
     const course_times = element[5];
     const met_pre = element[6];
     const has_pre = element[4] !== "None"
     const available_winter = element[1] !== "-"
       return {
        course_code,
        course_name,
        course_times
       }
    })


       fillSchedule(arr);
      }}> Fill in schedule</div>
      <table style={{height:500}}>
        <tr>
            <th>Course Code </th>
            <th>Available in Winter 2024 </th>
            <th>Subject</th>
            <th>Times</th>
            <th>Has prerequisite?</th>
            <th>Satisfied pre-requisite</th>
        </tr>
        {tablePage()}
        
      </table>
      
    </div>
    </div>
}