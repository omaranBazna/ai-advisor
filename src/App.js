import { useState } from 'react';
import './App.css';
import FileDropComponent from './components/FileDropComponent';
import StudentCourses from './components/StudentCourses';
import WeeklySchedule from './components/WeeklySchedule';

function App() {
  const [studentCourses,setStudentCourses] = useState({
    needed:[],token:[]
  })
  const handleFilesDropped = (files) => {
    files.forEach((file) => {
      console.log('File:', file.name);
    });
  };

  return (
    <div className="App" style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      <h1> Upload student evaluation </h1>

      <FileDropComponent setStudentCourses={setStudentCourses} onFilesDropped={handleFilesDropped} />

      <StudentCourses setStudentCourses={setStudentCourses} studentCourses={studentCourses} />

      <div style={{width:"100%",height:"2px",background:"black",margin:"10px"}}></div>

      <h1>Student courses schedule</h1>
      
       <div style={{width:"100%",height:"100vh"}}>
       <WeeklySchedule/>
       </div>
    
    </div>
  );
}

export default App;
