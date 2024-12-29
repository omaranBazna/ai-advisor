import FileUploadComponent from "./FileUploadComponent"
import SelectionInput from "./SelectionInput"
import { useState } from "react"
import StudentCoursesTreeView from "./StudentCoursesTreeView"

const StudentEvaluation = ({ folder ,setFolder,setCourses}) =>{

    const [token,setToken] = useState([]);
    const [course,setCourse] = useState("");
    const [attr,setAttr] = useState("");
    const [msg,setMsg] = useState("");


  return <>
  <FileUploadComponent token={token} setFolder={setFolder} setToken={setToken} />

<SelectionInput 
    course = {course}
    setCourse = {setCourse}
    setCourses = {setCourses}
    setMsg = {setMsg}
    token = {token}
    attr = {attr}
    setAttr = {setAttr}
/>

<div>{msg}</div>




  </>
}

export default StudentEvaluation