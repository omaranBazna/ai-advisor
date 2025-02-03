import { getEventTime } from "./utils"

const TableHeader = () => {
    return  <tr>
    <th>
        Course code
    </th>
    
    <th>
        Course name
    </th>

    <th>
        Course attribute
    </th>

    <th>
        Put in schedule
    </th>
    <th>
        Times
    </th>
    <th>
        Section
    </th>
 
    <th>Credits hourse</th>
</tr>
}


const TableRow = ({el,events,setEvents}) =>{

    const putEventInSchedule = (code,subject,time,credits,section) => {
        let NoSpecificTime  = false;
        let timesArray = getEventTime(time);

        if(time.indexOf(", -") != -1){
            NoSpecificTime =    true;
        }
            
        for(let element of timesArray){
         
     
            setEvents((old)=>{
             
            
                return [...old, {
                    code,
                    title:`${code} - ${subject} - ${section}`,
                    start:element.start,
                    end:element.end,
                    credits,
                    NoSpecificTime,
                    section,
                    time
                }]
            })
        }
    }

    const   removeEventFromSchedule=(course_code)=>{
        setEvents((old)=>{
            return old.filter(item=>{
                return item.code !=course_code
            })
        })
    }

    const checkIsInSchedule = (code) =>  events.find(item=>item.code === code) !== undefined

    const checkIsExactlyInSchedule = (code,section) => events.find(item=>item.code === code && item.section==section) !== undefined
    function areEventsInConflict(event1, event2) {
        const event1Start = new Date(event1.start);
        const event1End = new Date(event1.end);
        const event2Start = new Date(event2.start);
        const event2End = new Date(event2.end);
       
        // Check if the events are on the same day
        function isSameDay(date1, date2) {
            return (
                date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate()
            );
        }
    
        // Check if the events overlap
        function isOverlap(start1, end1, start2, end2) {
            return start1 < end2 && start2 < end1;
        }
    
        // Check if they are on the same day
        if (!isSameDay(event1Start, event2Start)) {
            return false;
        }
    
        // Check if they overlap
        if (isOverlap(event1Start, event1End, event2Start, event2End)) {
            return true;
        }
    
        return false;
    }
    
  
    const checkConflict = (time) =>{
        const times = getEventTime(time);
       
        for(let event of events){
         for(let time of times){
           

            if(areEventsInConflict(event,time)){
               
                return true;
            }
          
         }   
        }
        return false;
    }

    if(!el ) {
        return <></>
    }
   
    const [_0,course_code,course_name,_3,course_attr,course_credits,course_section,course_time]=el;

    const checkConflictWithEvents =  checkConflict(course_time);

    return <tr style={{
        background:checkIsInSchedule(course_code)?"gray":(checkConflictWithEvents?"pink":"white")
        
        }} className={checkIsInSchedule(course_code)?"disabled-row":""}>
        <td>{course_code}</td>
        <td>{course_name}</td>
        <td>{course_attr}</td>
        <td>
            {!checkConflictWithEvents && <>
            {!checkIsInSchedule(course_code) && <button
        style={{width:"100%",background:"lightgreen",cursor:"pointer",height:"100%"}}
        onClick={()=>{
            putEventInSchedule(course_code,course_name,course_time,Number(course_credits),course_section)
        }}>Put in schedule</button>}
       
            </>}
            {checkIsExactlyInSchedule(course_code,course_section) && <button
        onClick={()=>{
            removeEventFromSchedule(course_code)
        }}
        style={{width:"100%",background:"pink",cursor:"pointer",height:"100%"}}
        
        >
            Remove 
            </button>}

            {checkConflictWithEvents && !checkIsExactlyInSchedule(course_code,course_section) && <div>
                Conflict
                </div>}
        
        </td>
        <td>{course_time.indexOf(", -") == "-1"?course_time:"No specific time"}</td>
        <td>{course_section}</td>
        <td>{Number(course_credits)}</td>
    </tr>
}

const TableBody = ({courses,events,setEvents}) => {

  

   
   
    return <>
    {courses.map(el=>{
        return <TableRow el={el}  events={events} setEvents={setEvents}/>
    })}</>

}


const CourseTable = ({courses,events,setEvents}) => {
 
    if(!courses || courses.length === 0){
        return <div> No course available </div>
    }

    return  <div style={{width:"100%",display:"flex"}}>
        
        <table style={{width:"100%"}} >
        <TableHeader />
        <TableBody events={events} courses={courses} setEvents={setEvents}/>
    </table>

    
   
    </div>
}


export default CourseTable