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
 
    <th>Credits hourse</th>
</tr>
}

const TableBody = ({courses,events,setEvents}) => {

    const putEventInSchedule = (code,subject,time,credits) => {
        //return console.log(time)
        const timesArray = getEventTime(time);
        for(let element of timesArray){
            setEvents((old)=>{
                return [...old, {
                    code,
                    title:`${code} - ${subject}`,
                    start:element.start,
                    end:element.end,
                    credits
                }]
            })
        }
    }

    const checkIsInSchedule = (code) =>  events.find(item=>item.code === code) !== undefined

  
    const checkConflict = (time) =>{
        const times = getEventTime(time)
        for(let event of events){
         for(let time of times){
            if(checkConflict(event,time)){
                return true;
            }
         }   
        }
        return false;
    }

    const TableRow = (el) =>{

        if(!el || !el.el) {
            return <></>
        }
        const [_0,course_code,course_name,_3,course_attr,course_credits,_6,course_time]=el.el;  

        const isInSchedule = checkIsInSchedule(course_code);
        const isConflict  =  checkConflict(course_time);

        if(isInSchedule || isConflict) {
            return <></>
        }

        return <tr>
            <td>{course_code}</td>
            <td>{course_name}</td>
            <td>{course_attr}</td>
            <td>
            <button onClick={()=>{
                putEventInSchedule(course_code,course_name,course_time,Number(course_credits))
            }}>Put in scheudle</button>
            </td>
            <td>{course_time}</td>
            <td>{Number(course_credits)}</td>
        </tr>
    }
   
    return <>
    {courses.map(el=>{
        return <TableRow el={el} />
    })}</>

}
const CourseTable = ({courses,events,setEvents}) => {
 
    if(!courses || courses.length === 0){
        return <div> No course available </div>
    }

    return  <table>
        <TableHeader />
        <TableBody events={events} courses={courses} setEvents={setEvents}/>
    </table>
}


export default CourseTable