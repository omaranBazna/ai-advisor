import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios"
import { useState,useEffect,useRef } from "react";
const server_end_point = "http://127.0.0.1:5000/data"
const server_end_point_courses = "http://127.0.0.1:5000/courses"
const colors = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300", "#DAF7A6", "#581845", "#900C3F",
  "#C70039", "#FF5733", "#FFC300", "#DAF7A6", "#33FF57", "#33FFF5", "#8D33FF", "#338DFF",
  "#F033FF", "#FF33F0", "#FF5733", "#FF8033", "#33FF80", "#80FF33", "#8033FF", "#3380FF",
  "#F0FF33", "#FF3380", "#FF338D", "#57FF33", "#33FF57", "#FF5733", "#FFC300", "#581845",
  "#900C3F", "#C70039", "#DAF7A6", "#DA33FF", "#DAFF33", "#FFD733", "#57FFD7", "#A6FFDA",
  "#A6DAFF", "#FF5733", "#FF8033", "#33FF80", "#8033FF", "#3380FF", "#F0FF33", "#FF3380",
  "#FF338D", "#A6FFDA", "#FFDA33", "#57FF33", "#57A6FF", "#DA5733", "#A6C7FF", "#D7DAFF",
  "#DA57FF", "#A6DAFF", "#F0A6FF", "#A6DAF7", "#FFD7A6", "#57DAF7", "#A6DAFF", "#A6D7FF",
  "#FFD7DA", "#DAF7DA", "#FFD7DA", "#F0A6DA", "#FFD7A6", "#F0D7DA", "#FFF7DA", "#F0A6FA", "#F5D7A6", "#F027DA", "#C02CDC"
];
function convertTo24HourFormat(timeString) {
  if(timeString.trim()==="") return "00:00"
  timeString = timeString.trim()
  const [time, period] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);


  if (period.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;  // Convert PM times except for 12 PM to 24-hour format
  }
  
  if (period.toLowerCase() === "am" && hours === 12) {
    hours = 0;  // Convert 12 AM to 00:00
  }

  // Format the hours and minutes to ensure they are two digits
  
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
const WeeklySchedule = () => {
  const calendarRef = useRef(null);
  const [selected,setSelected]=useState([0])
  const [selected_years,setSelectedYears]=useState([1,2,3,4,5])

  const moveToDate = (date) => {
    // Use the FullCalendar instance to navigate to a specific date
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(date);  // Date format: 'YYYY-MM-DD'
  };
  
  let days_dic={
    "Monday":"2024-11-18",
    "Tuesday":"2024-11-19",
    "Wednesday":"2024-11-20",
    "Thursday":"2024-11-21",
    "Friday":"2024-11-22",
    "Saturday":"2024-11-23",
    "Sunday":"2024-11-24"
  }
  const [events,setEvents] = useState([])
  const [all_events,setAllEvents] = useState([])
  const [courses, setCourses]= useState([])

  async function loadEvents(){
    let {data} =await axios.get(server_end_point)
 
   
    //data = data.filter((element,index)=>index<50)
    setAllEvents(data)
    let selected_courses = courses.filter((item,index)=>{
      return selected.find(item=>item==index)
    })

    
    data = data.filter(element=>{
      let sub = element[1].split(" ")[0]

      
      let selected_obj = selected_courses.find(item=>item.key.toLowerCase()==sub.toLowerCase())
    let year = Number(element[1].split(" ")[1][0])
    if(selected_obj && selected_years.find(item=>item==year)){
      return true
    }


    })
    let arr_elements = []
    data.forEach((element,index)=>{
      let title = element[2]
      let time = element.at(-1).split(",")
      let days= time[0].split("-")
      for(let day of days){
      day = day.trim()
  
  
      let day_date = days_dic[day]
      let times = time[1].split("-")
      let [start,end] =times
      start= convertTo24HourFormat(start)
      end = convertTo24HourFormat(end)
      let start_date = day_date+"T"+start
      let end_date = day_date+"T"+end
         
      let sub = element[1].split(" ")[0]
      let index2 =  courses.findIndex(el=>el.key==sub)
    
      arr_elements.push({
        title:title,
        start:start_date,
        end:end_date,
        color:colors[index2]
      })
    }
    })
    setEvents(arr_elements);
  }

  async function loadCourses(){
    let {data} =await axios.get(server_end_point_courses)
    data =[{value:"all",key:"all"},...data]
    setCourses(data)
  }
  useEffect(()=>{
    loadEvents()
  },[selected,selected_years])
  useEffect(()=>{
   
    moveToDate(1732036563048)
    loadEvents()
    loadCourses()
  },[])


  function countElements(events,value){
  
    if(value==="all") return all_events.length
    let counter  = 0 
    for(let ele of all_events){
      let sub = ele[1].split(" ")[0].toLowerCase()
      if(sub==value.toLowerCase()) {
        counter +=1;
     }

    }
    
   return counter

  }
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"start",border:"1px solid black",margin:20,padding:10}}>
        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==1)){
              setSelectedYears(selected_years.filter(item=>item!=1))
            }else{
                setSelectedYears([1,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==1) }/><label>Year one</label>
        </div>
        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==2)){
              setSelectedYears(selected_years.filter(item=>item!=2))
            }else{
                setSelectedYears([2,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==2)}/><label>Year two</label>
        </div>
        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==3)){
              setSelectedYears(selected_years.filter(item=>item!=3))
            }else{
                setSelectedYears([3,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==3)}/><label>Year three</label>
        </div>
        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==4)){
              setSelectedYears(selected_years.filter(item=>item!=4))
            }else{
                setSelectedYears([4,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==4)}/><label>Year four</label>
        </div>
        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==5)){
              setSelectedYears(selected_years.filter(item=>item!=5))
            }else{
                setSelectedYears([5,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==5)}/><label>Year five</label>
        </div>
        
      </div>
    <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"space-between",alignItems:"start"}}>
      
      <div style={{width:"20%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
       {courses.map((item,index)=>{
        return <div style={{display:"flex",justifyContent:"start",alignItems:"center",gap:10,width:"100%"}}>
          
        
          <input onClick={()=>{
          let checked= selected.find(item=>item==index)
          if(checked){
            setSelected(selected.filter(item=>item!=index))
          }else {
            setSelected([...selected,index])
          }
        }} checked={selected.find(item=>item==index)}  type="checkbox" id={item.key} name="course" value={item.key}/><lable>{item.value} ( {countElements(events,item.key)} ) </lable>
        
          <div style={{width:15,height:15,background:colors[index]}}></div>
        
        </div>
      
})}
          
      </div>
    <div style={{width:"80%",height:"100vh",border:"2px solid red"}}>
    <FullCalendar
    ref={calendarRef}
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      events={events}
      headerToolbar={{ left: "prev,next today", center: "title", right: "timeGridWeek,timeGridDay" }}
      dayHeaderContent={(day) =>day.text.substring(0,3)}
      height={"100%"}
    />
    </div>
    </div>
    </div>
  );
};

export default WeeklySchedule;
