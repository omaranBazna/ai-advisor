import { totalCredits } from "./utils"
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef } from "react";

const StudentCoursesSchedule = ({events,setEvents}) =>{
    const calendarRef = useRef(null);
    return <>
    <h1>Total credits : {totalCredits(events)}</h1>
    <div style={{width:"50%",height:"1000px"}}> 
    <FullCalendar
        initialDate={"2024-11-17"}
        ref={calendarRef}
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        headerToolbar={{ left: "", center: "", right: "" }}
        dayHeaderContent={(day) =>day.text.substring(0,3)}
        height={"100%"}
        eventClick={(info)=>{
            let code = info.event._def.title.split("-")[0].trim()
            setEvents((old)=>{
            return old.filter(item=>item.code !=code)
            
            })
        }}
    
    />
    </div>
    </>
}


export default StudentCoursesSchedule