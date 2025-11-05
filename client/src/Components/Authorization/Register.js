import { useState,useEffect } from "react"
import { useRegisterMutation } from "./AuthApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from 'react'; 
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const Register = ()=>{

const [name,setName]=useState("");
const [userName,setUserName]=useState("");
const [email,setEmail]=useState("");
const [phone,setPhone]=useState("");
const [password,setPassword]=useState("");

const navigate = useNavigate()
const dispatch = useDispatch()
const[register,{data:user,isSuccess,isError,error,isLoading}]=useRegisterMutation()
 useEffect(()=>{
if (isSuccess) 
 {  
    alert("נרשמת בהצלחה!!")
navigate("/login")}

 },[isSuccess])
if(isLoading) return <p>loading...</p>
 if(isError) 
{ alert(JSON.stringify(error))

  return  <p>אירעה שגיאה בהרשמה</p>}
const handleSubmit = async(e)=>{
e.preventDefault()
register({password,phone,email,userName,name})
}



    return(

       <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f5f5f5",
  }}
>
 <form onSubmit={handleSubmit}    style={{
      maxWidth: '500px',
  margin: 'auto',
  background: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    }}>
        <div className="card flex flex-column gap-3" >
            <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                </span>
                <InputText placeholder="שם משתמש"  required onChange={(n)=>setUserName(n.target.value)}/>
            </div>
             <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-envelope"></i>
            </span>
            <InputText
              placeholder="שם מלא"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
 <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-envelope"></i>
            </span>
            <InputText
              placeholder="אימייל"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-phone"></i>
            </span>
            <InputText
              placeholder="טלפון"
              required
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              useGrouping={false}
            />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-lock"></i>
            </span>
            <Password
            
        style={{ flex: 1 ,width:"100%"}}
        className="w-full"
              placeholder="סיסמה"
              toggleMask
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              feedback={false}
            />
          </div>

          <Button label="הרשמה" type="submit" className="p-button-success" />
        </div>
      </form>
    </div>
  );
};

export default Register;

    