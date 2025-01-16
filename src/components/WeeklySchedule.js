import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios"
import { useState,useEffect,useRef } from "react";
import { server_url } from "../utils";
const server_end_point = server_url+"/data"
const server_end_point_courses = server_url+"/courses"

const colors = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFC300", "#DAF7A6", "#581845", "#900C3F",
  "#C70039", "#FF5733", "#FFC300", "#DAF7A6", "#33FF57", "#33FFF5", "#8D33FF", "#338DFF",
  "#F033FF", "#FF33F0", "#FF5733", "#FF8033", "#33FF80", "#80FF33", "#8033FF", "#3380FF",
  "#F0FF33", "#FF3380", "#FF338D", "#57FF33", "#33FF57", "#FF5733", "#FFC300", "#581845",
  "#900C3F", "#C70039", "#DAF7A6", "#DA33FF", "#DAFF33", "#FFD733", "#57FFD7", "#A6FFDA",
  "#A6DAFF", "#FF5733", "#FF8033", "#33FF80", "#8033FF", "#3380FF", "#F0FF33", "#FF3380",
  "#FF338D", "#A6FFDA", "#FFDA33", "#57FF33", "#57A6FF", "#DA5733", "#A6C7FF", "#D7DAFF",
  "#DA57FF", "#A6DAFF", "#F0A6FF", "#A6DAF7", "#FFD7A6", "#57DAF7", "#A6DAFF", "#A6D7FF",
  "#FFD7DA", "#DAF7DA", "#FFD7DA", "#F0A6DA", "#FFD7A6", "#F0D7DA", "#FFF7DA", "#F0A6FA", "#F5D7A6", "#F027DA", "#C02CDC"
];


const WeeklySchedule = ({events,setEvents,courses, setCourses,all_events,
  setAllEvents,setEventsList,selected,setSelected,selected_years,setSelectedYears,
selectedSet,setSelectedSet

}) => {
  const calendarRef = useRef(null);


  const [loadedEvents,setLoadedEvents] = useState([]);
  const [expanded,setExpanded] = useState(new Set());

  const moveToDate = (date) => {
    // Use the FullCalendar instance to navigate to a specific date
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(date);  // Date format: 'YYYY-MM-DD'
  };
  
 
 
  const updateSelection = ()=>{
    setEventsList(loadedEvents)
  }
  async function loadEvents(){
    const {data} = await axios.get(server_end_point);
    setLoadedEvents(data);
    console.log(data);
    setEventsList(data);
    
  }

  async function loadCourses(){
    let {data} =await axios.get(server_end_point_courses)
    data =[{value:"all",key:"all"},...data]
    setCourses(data)

  }
  useEffect(()=>{
    updateSelection()
  },[selected,selectedSet,selected_years])


  useEffect(()=>{
    moveToDate(1732036563048)
    loadEvents();
    loadCourses();
  },[])

 


  function countElements(events,value){
  
    if(value==="all") return all_events.length
    let counter  = 0 
    for(let ele of all_events){
      if(ele[1]){
      let sub = ele[1].split(" ")[0].toLowerCase()
      if(sub===value.toLowerCase()) {
        counter +=1;
     }
    }

    }
    
   return counter

  }

  function listKeyCourses(events,value){
    if(value==="all") return []
    const result = [];
    for(let ele of all_events){
      if(ele[1]){
        const sub = ele[1].split(" ")[0].toLowerCase()
        if(sub===value.toLowerCase()) {
          result.push(ele);
        }
      }
    }
   return result;
  }
  return (
    <div>
      <div style={
        {
          display:"flex",
          alignItems:"center",
          justifyContent:"start",
          border:"1px solid black",
          margin:20,
          padding:10,
        }
        }>
        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==1)){
              setSelectedYears(selected_years.filter(item=>item!=1))
            }else{
              setSelectedYears([1,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==1) }/><label>01 Courses</label>
        </div>
        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==2)){
              setSelectedYears(selected_years.filter(item=>item!=2))
            }else{
              setSelectedYears([2,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==2)}/><label>02 Courses</label>
        </div>
        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==3)){
              setSelectedYears(selected_years.filter(item=>item!=3))
            }else{
                setSelectedYears([3,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==3)}/><label>03 Courses</label>
        </div>
        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==4)){
              setSelectedYears(selected_years.filter(item=>item!=4))
            }else{
                setSelectedYears([4,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==4)}/><label>04 Courses</label>
        </div>
        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==5)){
              setSelectedYears(selected_years.filter(item=>item!=5))
            }else{
                setSelectedYears([5,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==5)}/><label>05 Courses</label>
        </div>
        
      </div>
    <div style={{width:"100%",height:"100vh",display:"flex",justifyContent:"space-between",alignItems:"start"}}>
      
      <div style={
        {
          width:"20%",
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          justifyContent:"start",
          height:"100vh",
          overflowY:"scroll"
        }
        }>
       {courses.map((item,index)=>{
       const list=  listKeyCourses(events,item.key)

        const count = countElements(events,item.key)
        if(count>0){
        return <div
        style={{
          display:"flex",
          justifyContent:"start",
          alignItems:"start",
          gap:10,
          width:"100%",
          flexDirection:"column"
        }}
        >
        <div style={
          {
            display:"flex",
            justifyContent:"start",
            alignItems:"center",
            gap:10,
            width:"100%"
          }
          }>
        <input 
        onClick={
          ()=>{
            let checked = list.some((el)=>selectedSet.has(el[1]+","+el[6]));
           
            if(checked){
              setSelectedSet((old)=>{
                let newSet = new Set(old);
                 list.forEach(el=>newSet.delete(el[1]+","+el[6]));
                 return newSet;
              })
             
            }else {
              setSelectedSet((old)=>{
                let newSet = new Set(old);
                 list.forEach(el=>newSet.add(el[1]+","+el[6]));
                 return newSet;
              })
            }
          }
        } 
        checked={list.some((el)=>selectedSet.has(el[1]+","+el[6]))}  
        type="checkbox" 
        id={item.key} 
        name="course" 
        value={item.key}
        />
        <lable 
          onClick={()=>{
            setExpanded((prev)=>{
              const newSet = new Set(prev);
              if(newSet.has(item.key)){
                newSet.delete(item.key);
              }else{
                newSet.add(item.key)
              }
              return newSet;
            })
          }}
          style={{
            cursor:"pointer",
          }}
        > {item.value} ( {countElements(events,item.key)} ) </lable>
        <div style={{width:15,height:15,background:colors[index]}}></div>
        </div>

        {expanded.has(item.key) && <div style={{paddingLeft:20}}>
         
            {list.map(element=>{

              return <div 
              onClick={()=>{
              
                setSelectedSet((old)=>{
                  let newSet=new Set(old);
                  let key = element[1]+","+element[6];
                  if(old.has(key)){
                    newSet.delete(key);
                  }else newSet.add(key);

                  return newSet;
                })
              }}
              style={{border:"2px solid black",padding:5}}
              >
               
                {element[2]} , section :{element[6]}   {selectedSet.has(element[1]+","+element[6])?"✅":"❌"}
              </div>
            })}
        </div>}
        
        </div>
      }
      return <></>
      
})}
          
      </div>
    <div style={{width:"80%",height:"100vh"}}>
    <FullCalendar
    ref={calendarRef}
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      events={events}
      headerToolbar={{ left: "prev,next today", center: "title", right: "timeGridWeek,timeGridDay" }}
      dayHeaderContent={(day) =>day.text.substring(0,3)}
      height={"100%"}
    />
    </div>
    </div>
    </div>
  );
};

export default WeeklySchedule;
