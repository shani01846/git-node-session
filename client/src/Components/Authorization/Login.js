import { useLoginMutation } from "./AuthApiSlice";
import { useState ,useEffect} from "react"
import { setToken } from "./AuthSlice";
import { useDispatch } from "react-redux";
import {  useNavigate} from "react-router-dom";
import "../../App.css";
const Login =()=>{
const dispatch = useDispatch()
const navigate = useNavigate()
const [userName,setUserName]=useState("");
const [password,setPassword]=useState("");

 const[Login,{data,isSuccess,isError,error,isLoading}]=useLoginMutation()


 useEffect(()=>{
if (isSuccess) 
 {dispatch(setToken({token:data}))

navigate("/")}

 },[isSuccess])
if(isLoading) return <p>loading...</p>
 if(isError) return <p>error</p>
 const handleSubmit = async(e)=>{
    e.preventDefault()
    Login({userName,password})

    }
       return (
    <div className="login-container">
      <h1>התחברות</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="שם משתמש"
          required
          onChange={(e) => setUserName(e.target.value)}
          className="p-inputtext p-component"
        />
        <input
          type="password"
          placeholder="סיסמא"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="p-inputtext p-component"
        />
        <button type="submit" className="p-button p-component p-button-primary">
          התחבר
        </button>
      </form>
    </div>
  );
    }
    export default Login


    