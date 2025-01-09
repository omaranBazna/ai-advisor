import { Link } from "react-router-dom"


const Navbar = () => {

    return <div style={
        {
            background:"black",
            color:"white",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            gap:15,
            padding:10
        }
        }>
    <Link to="/">Home</Link>
    <Link to="/student-evaluation">Student</Link>
    </div>

}

export default Navbar