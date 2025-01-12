import FileUploadComponent from "./FileUploadComponent"
import SelectionInput from "./SelectionInput"
import { useState } from "react"

const StudentEvaluation = ({ setFolder,setCourses  ,course,setCourse,attr,setAttr}) =>{

    const [token,setToken] = useState([]);

    const [msg,setMsg] = useState("");


  return <div style={{width:"100%"}}>
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




  </div>
}

export default StudentEvaluation