import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import axios from "axios"
import { useState,useEffect,useRef } from "react";
import { server_url } from "../utils";
const server_end_point = server_url+"/data"
const server_end_point_courses = server_url+"/courses"

const colors =[
  "#FF5733", "#FF6433", "#FF7133", "#FF7E33", "#FF8B33", "#FF9833", "#FFA533", "#FFB233",
  "#FFBF33", "#FFCC33", "#FFD933", "#FFE633", "#FFF333", "#E6FF33", "#D9FF33", "#CCFF33",
  "#BFFF33", "#B2FF33", "#A6FF33", "#99FF33", "#8CFF33", "#7FFF33", "#72FF33", "#66FF33",
  "#59FF33", "#4CFF33", "#3FFF33", "#33FF3D", "#33FF4A", "#33FF57", "#33FF64", "#33FF71",
  "#33FF7E", "#33FF8B", "#33FF98", "#33FFA5", "#33FFB2", "#33FFBF", "#33FFCC", "#33FFD9",
  "#33FFE6", "#33FFF3", "#33FFFF", "#33E6FF", "#33D9FF", "#33CCFF", "#33BFFF", "#33B2FF",
  "#3399FF", "#338CFF", "#337FFF", "#3372FF", "#3366FF", "#3359FF", "#334CFF", "#333FFF",
  "#3D33FF", "#4A33FF", "#5733FF", "#6433FF", "#7133FF", "#7E33FF", "#8B33FF", "#9833FF",
  "#A533FF", "#B233FF", "#BF33FF", "#CC33FF", "#D933FF", "#E633FF", "#F333FF", "#FF33FF",
  "#FF33E6", "#FF33D9", "#FF33CC", "#FF33BF", "#FF33B2", "#FF3399", "#FF338C", "#FF337F",
  "#FF3372", "#FF3366", "#FF3359", "#FF334C", "#FF333F", "#FF3D33", "#FF4A33", "#FF5733",
  "#FF6433", "#FF7133", "#FF7E33", "#FF8B33", "#FF9833", "#FFA533", "#FFB233", "#FFBF33",
  "#FFCC33", "#FFD933", "#FFE633", "#FFF333"
]



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
       
        let year = ele[1].split(" ")[1][0];
        if(!selected_years.find(el=>el==year)) continue;
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
            if(selected_years.find(item=>item==0)){
              setSelectedYears(selected_years.filter(item=>item!=0))
            }else{
              setSelectedYears([0,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==1) }/><label>00 Courses</label>
        </div>
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

        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==6)){
              setSelectedYears(selected_years.filter(item=>item!=6))
            }else{
              setSelectedYears([6,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==6) }/><label>06 Courses</label>
        </div>

        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==7)){
              setSelectedYears(selected_years.filter(item=>item!=7))
            }else{
              setSelectedYears([7,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==7) }/><label>07 Courses</label>
        </div>

        <div>
          <input onClick={()=>{
            if(selected_years.find(item=>item==8)){
              setSelectedYears(selected_years.filter(item=>item!=8))
            }else{
              setSelectedYears([8,...selected_years])
            }
          }} type="checkbox" checked={selected_years.find(item=>item==8) }/><label>08 Courses</label>
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


        const count = list.length
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
               
                {element[2]} , section :{element[6]} , code : {element[1]}   {selectedSet.has(element[1]+","+element[6])?"✅":"❌"}
              </div>
            })}
        </div>}
        
        </div>
      }
      return <></>
      
})}
          
      </div>
    <div style={{width:"80%",height:"100vh",display:"flex",justifyContent:"start",alignItems:"start"}}>
      <div style={{width:"90%",height:"100vh"}}>
    <FullCalendar
    ref={calendarRef}
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      events={events}
      headerToolbar={{ left: "prev,next today", center: "title", right: "timeGridWeek,timeGridDay" }}
      dayHeaderContent={(day) =>day.text.substring(0,3)}
      height={"100%"}
    /></div>
    <div style={{width:"10%"}}>
      <h4> Online courses: </h4>
      {false && <div>
      {Array.from(selectedSet).filter(item=>{
        return !events.find(el=>item.indexOf(el.code)>-1)
      }).filter(item=>{
        let course= item.split(",")[0].split(" ")[1];
        let year = parseInt(course[2])
        console.log(year);
        return selected_years.find(el=>el==year)
      }).map(item=>{
        return <div style={{background:"orange",margin:10}}>{item} </div>
      })}
      </div>}
    </div>
    </div>
    </div>
    </div>
  );
};

export default WeeklySchedule;
