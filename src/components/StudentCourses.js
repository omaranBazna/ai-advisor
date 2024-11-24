import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function StudentCourses({studentCourses}){

    if(!studentCourses){
        return <></>
    }
    let {needed,token} = studentCourses
    needed = needed.flat()
    return <div>
        <h1>Student courses</h1>
<div style={{display:"flex",alignItems:"start",justifyContent:"center",gap:10}}>
      <table>
        <tr>
            <th>Needed</th>
        </tr>
        {needed.map(element=>{
            return <tr>
                <td>{element}</td>
            </tr>
        })}
      </table>
    
      <table>
        <tr>
            <th>Token course</th>
            <th>Grade</th>
        </tr>
        {token.map(element=>{
            return <tr>
                <td>{element.course}</td>
                <td>{element.grade}</td>
            </tr>
        })}
      </table>
    </div>
    </div>
}