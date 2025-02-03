import { Link } from "react-router-dom"


const Navbar = () => {

    return <div style={
        {
            background:"black",
            color:"white",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:50,
            padding:10
        }
        }>
    <Link to="/">Courses Schedule</Link>
    <Link to="/student-evaluation">Student</Link>
    <Link to="/create-db">Create Semester DB</Link>
    </div>

}

export default Navbar