import axios from 'axios';

const FileUploadComponent= ({token,setFolder,setToken }) => {

  const checkSingleCourse=async(val)=>{
        
    return await fetch("http://127.0.0.1:5000/check_course",{
           method:"POST",
           headers:{
           'content-type':"application/json",
           },
           body:JSON.stringify({data:val,token})
       }).then(res=>{
           return res.json();
       }).then(res=>{
          return res?.rows?.length>0
       })
   }
   


  const filterAreas = async(areas)=>{
    let newAreas = []
    for(let area of areas){
        let newArea={
            caption:area.caption,
        }
        let courses = area.courses;
        let newCourses= []
        for(let course of courses){
            course = course.trim()
            let regex = /^\b[A-Z]{2,4}\s+\d{4}\b$/;
            if (regex.test(course)) {
                let result = await checkSingleCourse(course)
                if(result){
                    newCourses.push(course);
                }
            }else newCourses.push(course);
        }
        newArea.courses = newCourses
        newAreas.push(newArea)
    }
    return newAreas
  }

  const handleFileUpload = async(e) => {
    let file = (e.target.file.files[0])
    e.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("file", file); // The key 'file' must match Flask's expected key
    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Explicitly set for Axios
        },
      });
      let areas = response.data.areas.filter(item=>item.courses&&item.courses.length>0);
      areas.shift()
      areas.shift()
      areas = await filterAreas(areas)
      areas = areas.filter(item=>item.courses&&item.courses.length>0)
     
    setToken(response.data.token);
      setFolder((old)=>{
        return {...old,children:areas.map(el=>{
           
            let children = el.courses.map(el_2=>{
                return {name:el_2,level:2}
            })
          
            return {name:el.caption.replace("Area Name: ",""),level:1,children}
        })}
      })
    } catch (error) {
     
      alert(`Error: ${error.response?.data || error.message}`);
    }
  };

   return <div style={{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column",
    gap:10,
    width:"100%",
    border:"2px solid black",
    borderRadius:10,
    margin:0,
    padding:10
   }}>
    <h3>Upload the student evaluation page in {"(.mhtml)"} format</h3>
    <form onSubmit={handleFileUpload} method="POST" enctype="multipart/form-data"> 
        <input type="file" name="file" multiple /> 
        <input type = "submit" value="Upload"/> 
    </form>
   </div>  
};

export default FileUploadComponent;
