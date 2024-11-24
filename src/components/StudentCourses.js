


export default function StudentCourses({studentCourses}){

    if(!studentCourses){
        return <></>
    }
    return <div>
        {JSONG.stringify(studentCourses)}
    </div>
}