import './App.css';
import StudentEvaluationPage from './pages/StudentEvaluationPage';
import CoursesSchedulePage from './pages/CourseSchedulePage';
import { Routes,Route } from 'react-router-dom';
import CreateDBPage from './pages/CreateDBPage';
import Navbar from './components/Navbar';


function App() {
  
  return <div style={
    {
      height:"100vh",
      width:"100vw",
      display:"flex",
      flexDirection:"column",
      justifyContent:"start"
    }
  }>
    <Navbar />
    
    <Routes>
      <Route path="/" element={<CoursesSchedulePage />} />
      <Route path="/student-evaluation" element={<StudentEvaluationPage />} />
      <Route path="/create-db" element={<CreateDBPage />} />
     </Routes>
  </div>

}

export default App;
