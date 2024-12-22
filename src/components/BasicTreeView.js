import TreeView, { flattenTree } from "react-accessible-treeview";
import { useState ,useRef,useEffect} from "react";
import "./styles.css";
import axios from "axios";
import { Tooltip, Infotip } from '@trendmicro/react-tooltip';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-tooltip/dist/react-tooltip.css';
const initialFolder = {
    name:""
}
function convertTo24HourFormat(timeString) {
    if(timeString.trim()==="") return "00:00"
    timeString = timeString.trim()
    const [time, period] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
  
  
    if (period.toLowerCase() === "pm" && hours !== 12) {
      hours += 12;  // Convert PM times except for 12 PM to 24-hour format
    }
    
    if (period.toLowerCase() === "am" && hours === 12) {
      hours = 0;  // Convert 12 AM to 00:00
    }
  
    // Format the hours and minutes to ensure they are two digits
    
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
  
    return `${formattedHours}:${formattedMinutes}`;
}


const days_dic={
    "Monday":"2024-11-18",
    "Tuesday":"2024-11-19",
    "Wednesday":"2024-11-20",
    "Thursday":"2024-11-21",
    "Friday":"2024-11-22",
    "Saturday":"2024-11-23",
    "Sunday":"2024-11-24"
}

export default function BasicTreeView(){
    const calendarRef = useRef(null);
    const [folder,setFolder] = useState(initialFolder);
    const data = flattenTree(folder);
    const [val,setVal] = useState("")
    const [token,setToken] = useState([])
    const [msg,setMsg] = useState("")
    const [courses,setCourses] = useState([])
    const [events,setEvents] = useState([])
    const [attr,setAttr] = useState("")

    const [attr_list,setAttrList] = useState([])


    const loadAttr = async()=>{
        const  {data} = await axios.get("http://127.0.0.1:5000/get-attr-list")
        ///console.log(data.map(el=>el[0].trim().replaceAll("\n","")));
        setAttrList(data.map(el=>el[0].trim().replaceAll("\n","")))
    }

    useEffect(()=>{
        loadAttr();
    },[])
  

    const putEventInSchedule = (code,subject,time)=>{
        time = time.split(",")
        let days= time[0].split("-")
        for(let day of days){
        day = day.trim()
    
    
        let day_date = days_dic[day]
        let times = time[1].split("-")
        let [start,end] =times
        start= convertTo24HourFormat(start)
        end = convertTo24HourFormat(end)
        let start_date = day_date+"T"+start
        let end_date = day_date+"T"+end
           
      
        setEvents((old)=>{
            return [...old, {
                code,
                title:`${code} - ${subject}`,
                start:start_date,
                end:end_date,
            }]
        })
      
      }
    }

    const getEventTime = (time)=>{
        time = time.split(",")
        let days= time[0].split("-")

        let timesArr=[]
        
        for(let day of days){
        day = day.trim()
    
    
        let day_date = days_dic[day]
        let times = time[1].split("-")
        let [start,end] =times
        start= convertTo24HourFormat(start)
        end = convertTo24HourFormat(end)
        let start_date = day_date+"T"+start
        let end_date = day_date+"T"+end
        timesArr.push({
            start:start_date,
                end:end_date,
        })
 
      }

      return timesArr
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
      
    setToken(response.data.token);
      setFolder((old)=>{
        return {...old,children:areas.map(el=>{
           
            let children = el.courses.map(el_2=>{
                return {name:el_2,level:2}
            })
          
            return {name:el.caption,level:1,children}
        })}
      })
    } catch (error) {
     
      alert(`Error: ${error.response?.data || error.message}`);
    }
  };

  const checkCourse=()=>{
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

  const checkSection=()=>{
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


  const IsTime1BeforeTime2= (time1,time2)=>{
    let hours1= time1.split(":")[0]
    let mins1 = time1.split(":")[1]

    let hours2 = time2.split(":")[0]
    let mins2 = time2.split(":")[1]

    if(hours1<=hours2){
        return true
    }else if(hours2<hours1){
        return false;
    }else{
        return mins1<=mins2
    }
  }

  const IsTimeInBetween = (time,start,end)=>{
    return IsTime1BeforeTime2(start,time) && IsTime1BeforeTime2(time,end)
  }
  const checkConflict = (event1,event2)=>{
    let day1 = (event1.start.substring(0,10));
    let day2 = event2.start.substring(0,10);
    if(day1.indexOf("undefined")>-1) return false;
    if(day2.indexOf("undefined")>-1) return false;
    if(day1 != day2) return false;

    let start1 = event1.start.substring(event1.start.length-5,event1.start.length)
    let end1 = event1.end.substring(event1.end.length-5,event1.end.length) 
    let start2 =  event2.start.substring(event2.start.length-5,event2.start.length) 
    let end2 =  event2.end.substring(event2.end.length-5,event2.end.length) 

    

    return (IsTimeInBetween(start1,start2,end2) || IsTimeInBetween(end1,start2,end2) || IsTimeInBetween(start2,start1,end1) || IsTimeInBetween(end2,start1,end1)) 

  }
  

    return   <div style={{height:1000}}>
        <form onSubmit={handleFileUpload} method="POST" enctype="multipart/form-data"> 
        <input type="file" name="file" multiple /> 
        <input type = "submit" value="Upload"/> 
    </form> 
    
    <input 
    value={val}
    onChange={(e)=>{
     setVal(e.target.value.toUpperCase().trim())
    }} placeholder="checkcourse" style={{fontSize:25,padding:10}}/>
<button onClick={checkCourse}>Check course</button>

<div style={{border:"1px solid red"}}>
    <input value={attr} onChange={(e)=>{
        let val=e.target.value.toUpperCase().trim()
        setAttr(val)
    }} placeholder="attribute"style={{fontSize:25,padding:10}}/>
    {attr_list.filter(element=>{
        
        return attr.trim() !="" &&element.indexOf(attr) !=-1
       }).length>0&&<div style={{left:20,height:500,overflowY:"scroll",padding:10, position:"absolute",zIndex:1000, width:200,borderRadius:10, border:"2px solid green",background:"rgba(250,200,100,0.8)"}}>
       {attr_list.filter(element=>{
        
        return element.indexOf(attr) !=-1
       }).map(element=>{
        return <div style={{margin:10,background:"rgba(255,255,255,0.5)",padding:5,borderRadius:5}}>{element}</div>
       })}
    </div>}
    
</div>

   <button onClick={checkSection}>Check section</button>
 <div>{msg}</div>
 {courses&&courses.length>0&&<table>
    <tr>
        <th>
            Course code
        </th>
        <th>
            Course name
        </th>
        <th>
            Course times
        </th>
        <th>
            In Schedule?
        </th>
        <th>
            Put in schedule
        </th>
        <th>
            Times
        </th>
        <th>Has conflict</th>
    </tr>
    {courses.map(el=>{
               
        const isInSchedule = events.find(item=>item.code==el[1]) !=null
        let isConflict  = false;
        const times = getEventTime(el[7])
        
        for(let event of events){
         for(let time of times){
         
            if(checkConflict(event,time)){
                isConflict=true
                break;
            }
         }
             
        }
        if(isInSchedule || isConflict) return <></>
        return <tr>
            <td>{el[1]}</td>
            <td>{el[2]}</td>
            <td>{el[4]}</td>
            <td>{isInSchedule?"Yes":"No"}</td>
            
            <td><button disabled={isInSchedule || isConflict} onClick={()=>{
                putEventInSchedule(el[1],el[2],el[7])
            }}>Put in scheudle</button></td>
            <td>{el[7]}</td>
            <td>
               {isConflict?"Yes":"No"}
            </td>
        </tr>
    })}
    </table>}

    <TreeView
    data={data}
    className="basic"
    aria-label="basic example tree"
    nodeRenderer={({ element, getNodeProps, level, handleSelect }) => {
      let isChild = element.parent != 0
      return <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1),padding:10 }}>
      
      {!isChild &&<Tooltip content={element.name}>
                  <span   style={{ height:200, border:"2px solid rgb(200,215,255)",borderRadius:5,padding:10,paddingLeft:isChild?50:0 ,background:isChild?"white":"rgb(200,230,230)"}} className="name">
                    {element.name.substring(0,100)}
                  
                  </span>
                  </Tooltip>   }

                {isChild &&<span   style={{ height:200, border:"2px solid rgb(200,215,255)",borderRadius:5,padding:10,paddingLeft:isChild?50:0 ,background:isChild?"white":"rgb(200,230,230)"}} className="name">
                    {element.name}  
                   
                  </span>}
      </div>
    }
}
  />


<FullCalendar
initialDate={"2024-11-17"}
    ref={calendarRef}
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      events={events}
      headerToolbar={{ left: "prev,next today", center: "title", right: "timeGridWeek,timeGridDay" }}
      dayHeaderContent={(day) =>day.text.substring(0,3)}
      height={"100%"}
    />
  </div>
}
///"17-11–2024"