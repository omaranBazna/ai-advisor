import WeeklySchedule  from "../components/WeeklySchedule"
import { useState } from 'react';

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
  
const colors = [
  "#FF5733", "#FF6433", "#FF7133", "#FF7E33", "#FF8B33", "#FF9833", "#FFA533", "#FFB233",
  "#FFBF33", "#FFCC33", "#FFD933", "#FFE633", "#FFF333", "#E6FF33", "#D9FF33", "#CCFF33",
  "#BFFF33", "#B2FF33", "#A6FF33", "#99FF33", "#8CFF33", "#7FFF33", "#72FF33", "#66FF33",
  "#59FF33", "#4CFF33", "#3FFF33", "#33FF3D", "#33FF4A", "#33FF57", "#33FF64", "#33FF71",
  "#33FF7E", "#33FF8B", "#33FF98", "#33FFA5", "#33FFB2", "#33FFBF", "#33FFCC", "#33FFD9",
  "#33FFE6", "#33FFF3", "#33FFFF", "#33E6FF", "#33D9FF", "#33CCFF", "#33BFFF", "#33B2FF",
  "#3399FF", "#338CFF", "#337FFF", "#3372FF", "#3366FF", "#3359FF", "#334CFF", "#333FFF",
  "#3D33FF", "#4A33FF", "#5733FF", "#6433FF", "#7133FF", "#7E33FF", "#8B33FF", "#9833FF",
  "#A533FF", "#B233FF", "#BF33FF", "#CC33FF", "#D933FF", "#E633FF", "#F333FF", "#FF33FF",
  "#FF33E6", "#FF33D9", "#FF33CC", "#FF33BF", "#FF33B2", "#FF3399", "#FF338C", "#FF337F",
  "#FF3372", "#FF3366", "#FF3359", "#FF334C", "#FF333F", "#FF3D33", "#FF4A33", "#FF5733",
  "#FF6433", "#FF7133", "#FF7E33", "#FF8B33", "#FF9833", "#FFA533", "#FFB233", "#FFBF33",
  "#FFCC33", "#FFD933", "#FFE633", "#FFF333"
]

  
const days_dic = {
  "Monday":"2024-11-18",
  "Tuesday":"2024-11-19",
  "Wednesday":"2024-11-20",
  "Thursday":"2024-11-21",
  "Friday":"2024-11-22",
  "Saturday":"2024-11-23",
  "Sunday":"2024-11-24"
}

const CoursesSchedulePage = () =>{
    const [selected,setSelected]=useState([0]);
    const [selected_years,setSelectedYears]=useState([1,2,3,4,5]);
    const [events,setEvents] = useState([]);
    const [courses, setCourses]= useState([]);
    const [all_events,setAllEvents] = useState([]);
    const [selectedSet,setSelectedSet] = useState(new Set())
    
    const setEventsList = (data)=>{
    setAllEvents(data)
   
    const selected_courses = courses.filter((item,index)=>{
        return selected.find(item=>item===index)
    })
  
      
    data = data.filter(element=>{
        const sub = element[1].split(" ")[0];    
        const selected_obj = selected_courses.find(item=>item.key.toLowerCase()==sub.toLowerCase());
        const year = Number(element[1].split(" ")[1][0]);

        if(selectedSet.has(element[1]+","+element[6])  && selected_years.find(item=>item==year)){
            return true
        }
        return false;
    });
    
    const arr_elements = []
    data.forEach((element,index)=>{
        let title = element[2] +",section: "+element[6]
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
          color:colors[index2],
          code:element[1]
        })
      }
    })

    setEvents(arr_elements);
    };
    
    return (
        <div className="App" style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
           <div style={{width:"100%",height:"100vh"}}>
           <WeeklySchedule 
           selected={selected} 
           setSelected={setSelected}
           selected_years={selected_years}   
           setSelectedYears={setSelectedYears}
           setEventsList={setEventsList} 
           all_events={all_events} 
           setAllEvents={setAllEvents}
           courses={courses}
           setCourses={setCourses}   
           events = {events}  
           setEvents={setEvents}
           selectedSet={selectedSet}
           setSelectedSet = {setSelectedSet}
           />
           </div>
        
        </div>
    );
}


export default CoursesSchedulePage;