const days_dic={
    "Monday":"2024-11-18",
    "Tuesday":"2024-11-19",
    "Wednesday":"2024-11-20",
    "Thursday":"2024-11-21",
    "Friday":"2024-11-22",
    "Saturday":"2024-11-23",
    "Sunday":"2024-11-24"
}

const IsTime1BeforeTime2 = (time1,time2) => {
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

const IsTimeInBetween = (time,start,end) => {
    return IsTime1BeforeTime2(start,time) && IsTime1BeforeTime2(time,end)
}

const convertTo24HourFormat = (timeString) => {
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

export const checkConflict = (event1,event2) => {
    let day1 = (event1.start.substring(0,10));
    let day2 = event2.start.substring(0,10);
    if(day1.indexOf("undefined")>-1) return false;
    if(day2.indexOf("undefined")>-1) return false;
    if(day1 !== day2) return false;
    let start1 = event1.start.substring(event1.start.length-5,event1.start.length)
    let end1 = event1.end.substring(event1.end.length-5,event1.end.length) 
    let start2 =  event2.start.substring(event2.start.length-5,event2.start.length) 
    let end2 =  event2.end.substring(event2.end.length-5,event2.end.length) 
    return (IsTimeInBetween(start1,start2,end2) || IsTimeInBetween(end1,start2,end2) || IsTimeInBetween(start2,start1,end1) || IsTimeInBetween(end2,start1,end1)) 
}

export const getEventTime = (time)=>{
    console.log(time);
    console.log(typeof time);
    console.log("------------")
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

export const totalCredits = (events) => {
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

export const addLinks = (text ,setAttr,setCourse)=>{
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
                //checkAttr(element)
            }} style={{color:"red"}}>{element}</span>
        }else if(element[0] === "+"){
            element=element.substring(1)
            return <span className="hoverable" onClick={()=>{
                setCourse(element)
                //checkCourse(element)
            }} style={{color:"green"}}>{element}</span>
        }
        return <span>{element}</span>
    })
}