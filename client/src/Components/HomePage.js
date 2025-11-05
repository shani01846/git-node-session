
import '../App.css'
import { NavLink } from "react-router-dom";

const HomePage=()=>{





    return(
        <>
<h1 className="headline"> Book Now Your Summer Hollyday Apartment!</h1>   
<br></br><br></br>
          <nav className="nav-bar">
      <NavLink to="/getAppartment" className="nav-link">
   
        <i></i> Find Apartment 
      </NavLink>
    </nav>
        </>
    )
}
export default HomePage