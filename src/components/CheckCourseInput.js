import { checkCourse } from "./api"

const CheckCourseInput = ({course,setCourse,setCourses,setMsg,setAttr,token}) =>{
    const checkCourseFunction = async(course) => {
        setAttr("");
        const res = await checkCourse(course,token);
        setCourses(res.rows);
        setMsg(res.msg);
    }
    const handleInputChange = e =>{
        const val = e.target.value
        setCourse(val.toUpperCase().trim())
    }
    return <div>
    <input 
        value={course}
        onChange={handleInputChange} 
        placeholder="checkcourse" 
        style={{fontSize:25,padding:10}}
        />
    <button onClick={()=>checkCourseFunction(course)}>Check course</button>
</div>
}

export default CheckCourseInput