import './App.css';
import StudentEvaluationPage from './pages/StudentEvaluationPage';
import CoursesSchedulePage from './pages/CourseSchedulePage';
import { Routes,Route } from 'react-router-dom';
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
    </Routes>
  </div>

}

export default App;
