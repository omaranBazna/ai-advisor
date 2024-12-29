import { useState } from "react";
import CourseTable from "../components/CoursesTable";
import StudentEvaluation from "../components/StudentEvaluation";
import StudentCoursesSchedule from "../components/StudentCoursesSchedule";
import StudentCoursesTreeView from "../components/StudentCoursesTreeView";



const initialFolder = {
    name:""
}



export default function StudentEvaluationPage(){

    const [folder,setFolder] = useState(initialFolder);
    const [courses,setCourses] = useState([]);
    const [events,setEvents] = useState([]);

  



    return   <div style={{height:1000}}>
    
<StudentEvaluation setCourses={setCourses} setFolder={setFolder} />
<StudentCoursesTreeView folder={folder} />
<CourseTable courses ={courses} events={events} setEvents={setEvents}/>
<StudentCoursesSchedule events={events} setEvents={setEvents}  />
  </div>
}
