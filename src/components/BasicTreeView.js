import TreeView, { flattenTree } from "react-accessible-treeview";
import { useState ,useRef,useEffect} from "react";
import "./styles.css";
import axios from "axios";
import { Tooltip, Infotip } from '@trendmicro/react-tooltip';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-tooltip/dist/react-tooltip.css';
import FileUploadComponent from "./FileUploadComponent";
import CourseTable from "./CoursesTable";
const initialFolder = {
    name:""
}



export default function BasicTreeView(){
    const calendarRef = useRef(null);
    const [folder,setFolder] = useState(initialFolder);
    const data = flattenTree(folder);
    const [course,setCourse] = useState("");
    const [token,setToken] = useState([]);
    const [msg,setMsg] = useState("");
    const [courses,setCourses] = useState([]);
    const [events,setEvents] = useState([]);
    const [attr,setAttr] = useState("");
    const [attr_list,setAttrList] = useState([]);

    const loadAttr = async()=>{
        const  {data} = await axios.get("http://127.0.0.1:5000/get-attr-list")
        ///console.log(data.map(el=>el[0].trim().replaceAll("\n","")));
        setAttrList(data.map(el=>el[0].trim().replaceAll("\n","")))
    }

    useEffect(()=>{
        loadAttr();
    },[])
   
    const checkCourse = (val) => {
    setAttr("")
    fetch("http://127.0.0.1:5000/check_course",{
        method:"POST",
        headers:{
        'content-type':"application/json",
        },
        body:JSON.stringify({data:val,token})
    }).then(res=>{
        return res.json();
    }).then(res=>{

        setCourses(res.rows);

        setMsg(res.msg);
    })
    }

    const checkAttr = (attr) => {
    setCourse("")
    fetch("http://127.0.0.1:5000/check_attr",{
        method:"POST",
        headers:{
        'content-type':"application/json",
        },
        body:JSON.stringify({data:attr,token})
    }).then(res=>{
        return res.json();
    }).then(res=>{

      
        setCourses(res.rows);

        setMsg(res.msg);
    })
    }

    const totalCredits = () => {
    let dict={}
    let total=0
    for(let event of events){

        if(!dict[event.code]){
            dict[event.code]=true;
            total +=event.credits
        }
    }
    return total
    }
  
   const addLinks= (text)=>{
    const att_regex = /\[(.*?)\]/g;
    const replacedText = text.replace(att_regex,(match,p1)=>{
        return `|_${p1}|`
    })

    const course_regex = /\b[A-Z]{2,4}\s+\d{4}\b/g;
    const replacedText2 = replacedText.replace(course_regex,(match,p1)=>{
        return `|+${match}|`
    })

    const arr = replacedText2.split("|")

    return arr.map(element=>{
        if(element[0] === "_"){
            element=element.substring(1)
            return <span className="hoverable" onClick={()=>{
                setAttr(element)
                checkAttr(element)
            }} style={{color:"red"}}>{element}</span>
        }else if(element[0] === "+"){
            element=element.substring(1)
            return <span className="hoverable" onClick={()=>{
                setCourse(element)
                checkCourse(element)
            }} style={{color:"green"}}>{element}</span>
        }
        return <span>{element}</span>
    })
   }
   

    return   <div style={{height:1000}}>


    <FileUploadComponent token={token} setFolder={setFolder} setToken={setToken} />
    
    <input 
    value={course}
    onChange={(e)=>{
     setCourse(e.target.value.toUpperCase().trim())
    }} placeholder="checkcourse" style={{fontSize:25,padding:10}}/>
    <button onClick={()=>checkCourse(course)}>Check course</button>

<div>
    <input value={attr} onChange={(e)=>{
        let val=e.target.value.toUpperCase().trim()
        setAttr(val)
    }} placeholder="attribute"style={{fontSize:25,padding:10}}/>
    {false && attr_list.filter(element=>{
        
        return attr.trim() !== "" && element.indexOf(attr) !== -1
       }).length>0&&<div style={{left:20,height:500,overflowY:"scroll",padding:10, position:"absolute",zIndex:1000, width:200,borderRadius:10, border:"2px solid green",background:"rgba(250,200,100,0.8)"}}>
       {attr_list.filter(element=>{
        
        return element.indexOf(attr) !== -1
       }).map(element=>{
        return <div style={{margin:10,background:"rgba(255,255,255,0.5)",padding:5,borderRadius:5}}>{element}</div>
       })}
    </div>}
     <button onClick={()=>checkAttr(attr)}>Check attribute</button>
</div>

  
 <div>{msg}</div>
<CourseTable/>
<TreeView
    data={data}
    className="basic"
    aria-label="basic example tree"
    nodeRenderer={({ element, getNodeProps, level, handleSelect }) => {
      let isChild = element.parent !== 0
      return <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1),padding:10 }}>
      
            {!isChild &&<Tooltip content={element.name}>
                  <span   style={{ height:200, border:"2px solid rgb(200,215,255)",borderRadius:5,padding:10,paddingLeft:isChild?50:0 ,background:isChild?"white":"rgb(200,230,230)"}} className="name">
                    {element.name.substring(0,100)}
                  
                  </span>
                </Tooltip>}
                    {isChild &&<span style={{ height:200, border:"2px solid rgb(200,215,255)",borderRadius:5,padding:10,paddingLeft:isChild?50:0 ,background:isChild?"white":"rgb(200,230,230)"}} className="name">
                    {addLinks(element.name)}    
                  </span>}
            </div>
        }
    }
/>

    <h1>Total credits : {totalCredits()}</h1>
    <div style={{width:"50%",height:"1000px"}}> 
    <FullCalendar
        initialDate={"2024-11-17"}
        ref={calendarRef}
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        headerToolbar={{ left: "", center: "", right: "" }}
        dayHeaderContent={(day) =>day.text.substring(0,3)}
        height={"100%"}
        eventClick={(info)=>{
            let code = info.event._def.title.split("-")[0].trim()
            setEvents((old)=>{
            return old.filter(item=>item.code !=code)
            
            })
        }}
    
    />
    </div>
  </div>
}
///"17-11–2024"