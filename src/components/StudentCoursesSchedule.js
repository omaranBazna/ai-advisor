import { totalCredits } from "./utils"
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef ,useState } from "react";
const Report = ({events,setShowReport})=>{
    return <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.53)",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        zIndex:1000000,
        padding:10
    }}>
        <div style={{background:"white",width:500,height:500,border:"1px solid black",padding:10,overflowY:"scroll"}}>
         <h1>Student plan:</h1>
         <div>
        
            {events.map((el)=>{
                return <div style={{border:"1px solid black",margin:10,padding:10}}>{el.title}   :  {el.time.indexOf(", -")>-1?"Online":el.time}</div>
            })}
         </div>
         <div><button 
         style={{width:"100%",background:"lightgreen",padding:3,cursor:"pointer"}}
         onClick={()=>{
            setShowReport(false);
         }}>Close</button></div>
        </div>

    </div>
}

const StudentCoursesSchedule = ({events,setEvents}) =>{
    const calendarRef = useRef(null);
    const [showReport,setShowReport] = useState(false);
    return <>
    {showReport && <Report setShowReport={setShowReport} events={events}/>}
    <h1>Total credits : {totalCredits(events)}</h1>
    <div><img onClick={()=>{
        setShowReport(true)
    }} style={{width:60,cursor:"pointer"}} src="https://t4.ftcdn.net/jpg/07/99/68/45/360_F_799684537_mS4LTw8boVkHAquATZNypdvx0ou5y6Jt.jpg"/></div>
    <div style={{width:"100%",display:"flex"}}>
    <div style={{width:"80%",height:"1000px"}}> 
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
    <div style={{width:"20%"}}>
        {events.map(item=>{  
            if(item.NoSpecificTime){

                return <div
                onClick={()=>{
                    setEvents((old)=>{
                        return old.filter(el=>el.code != item.code)
                        
                        })
                }}
                
                style={{
                    margin:10,
                    background:"lightgreen",
                    borderRadius:2,
                    padding:10
                }}>{item.title}  </div>
            }
            return <></>
        })}
    </div>
    </div>
    </>
}


export default StudentCoursesSchedule