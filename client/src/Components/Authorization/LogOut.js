import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeToken } from "./AuthSlice"
import apiSlice from "../../app/apiSlice"
import "../../App.css"
const LogOut = ()=>{
const {isUserLoggedIn} = useSelector((state)=>state.auth)
const dispatch = useDispatch()
const navigate = useNavigate()

const handleLogOutClick=()=>{
    dispatch(removeToken())
    dispatch(apiSlice.util.resetApiState())
    navigate("/")
}

return(
<nav id="custom-nav">
<ul>

{isUserLoggedIn&&<li><a onClick={handleLogOutClick}>Log-Out</a></li>}

</ul>
</nav>

)


}
export default LogOut 

