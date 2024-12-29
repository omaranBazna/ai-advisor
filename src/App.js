import { useState } from 'react';
import './App.css';
import FileDropComponent from './components/FileUploadComponent';
import StudentCourses from './components/StudentCourses';
import WeeklySchedule from './components/WeeklySchedule';

import BasicTreeView from './components/BasicTreeView';
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


let days_dic = {
  "Monday":"2024-11-18",
  "Tuesday":"2024-11-19",
  "Wednesday":"2024-11-20",
  "Thursday":"2024-11-21",
  "Friday":"2024-11-22",
  "Saturday":"2024-11-23",
  "Sunday":"2024-11-24"
}
function App() {
  const [studentCourses,setStudentCourses] = useState({
    needed:[],token:[]
  })

  const [events,setEvents] = useState([])
  const [courses, setCourses]= useState([])
  const [all_events,setAllEvents] = useState([])

  const [selected,setSelected]=useState([0])
  const [selected_years,setSelectedYears]=useState([1,2,3,4,5])
  const setEventsList = (data)=>{
    
    //data = data.filter((element,index)=>index<50)
    console.log(data);
    setAllEvents(data)
    
    let selected_courses = courses.filter((item,index)=>{
      return selected.find(item=>item===index)
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
  const handleFilesDropped = (files) => {
    files.forEach((file) => {
      console.log('File:', file.name);
    });
  };
  const fillSchedule = (elements)=>{
   
  elements = elements.map(el=>{


return [1,el["course_code"],el["course_name"],"None",el["course_times"]]
  })
  console.log(elements);
  setAllEvents(elements);

  }
  return <BasicTreeView/>
  return (
    <div className="App" style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <h1> Upload student evaluation </h1>

      <FileDropComponent setStudentCourses={setStudentCourses} onFilesDropped={handleFilesDropped} />

      <StudentCourses fillSchedule={fillSchedule} setStudentCourses={setStudentCourses} studentCourses={studentCourses} />

      <div style={{width:"100%",height:"2px",background:"black",margin:"10px"}}></div>

      <h1>Student courses schedule</h1>
      
       <div style={{width:"100%",height:"100vh"}}>
       <WeeklySchedule 
       selected={selected} setSelected={setSelected}
       selected_years={selected_years}   setSelectedYears={setSelectedYears}
       
       setEventsList={setEventsList} all_events={all_events} setAllEvents={setAllEvents} courses={courses} setCourses={setCourses}   events = {events}  setEvents={setEvents}/>
       </div>
    
    </div>
  );
}

export default App;
