import {  useSelector} from "react-redux";
import {jwtDecode} from "jwt-decode";
const useAuth = ()=>{
    const token = useSelector((state)=>state.auth.token)
    if(token!=="")
       { const obj = jwtDecode(token)
const {role,userName,email,fullName,phone}=obj
return obj
       }
       return null

}

export default useAuth