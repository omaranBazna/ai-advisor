import { checkAttr } from "./api"

const CheckAttrInput = ({attr,setAttr,setCourse,token,setCourses,setMsg}) =>{

    const checkAttrFunction = async(attr) => {
        setCourse("")
        const res = await checkAttr(attr,token) 
        setCourses(res.rows);
        setMsg(res.msg);
    }

    const handleInputChange = (e) =>{
        const val=e.target.value.toUpperCase().trim()
        setAttr(val)
    }
    
    return <div>
    <input value={attr} onChange={handleInputChange} placeholder="attribute"style={{fontSize:25,padding:10}}/>
    <button onClick={()=>checkAttrFunction(attr)}>Check attribute</button>
</div>
}


export default CheckAttrInput