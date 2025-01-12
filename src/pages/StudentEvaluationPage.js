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

    const [course,setCourse] = useState("")
    const [attr,setAttr] = useState("")

   

    return   <div >

<StudentEvaluation  
    course={course} 
    setCourse={setCourse} 
    attr={attr}  
    setAttr={setAttr}
    setCourses={setCourses} 
    setFolder={setFolder} 
/>
<StudentCoursesTreeView setAttr={setAttr} setCourse={setCourse} folder={folder} />
<CourseTable courses ={courses} events={events} setEvents={setEvents}/>

<StudentCoursesSchedule  events={events} setEvents={setEvents}  />
  </div>
}
