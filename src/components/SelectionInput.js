import CheckAttrInput from "./CheckAttrInput"
import CheckCourseInput from "./CheckCourseInput"


const SelectionInput = ({course,setCourse,setCourses,setMsg , token ,attr,setAttr}) =>{
 
    return <>
     < CheckCourseInput 
        course={course} 
        setCourse={setCourse} 
        setCourses={setCourses} 
        setMsg={setMsg} 
        setAttr={setAttr} 
        token={token} />

    <CheckAttrInput 
        attr = {attr}
        setAttr = {setAttr}
        setCourse = {setCourse}
        token = {token}
        setCourses = {setCourses} 
        setMsg = {setMsg}
    />
    </>
}

export default SelectionInput