import CheckAttrInput from "./CheckAttrInput"
import CheckCourseInput from "./CheckCourseInput"


const SelectionInput = ({course,setCourse,setCourses,setMsg , token ,attr,setAttr}) =>{
 
    return <div style={
        {
            display:"flex",
            alignItems:"center",
            justifyContent:"space-around",
            border:"2px solid black",
            padding:10,
            margin:10,
            borderRadius:5
        }
        }>
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
    </div>
}

export default SelectionInput