import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React from 'react'; 
import { TabMenu } from 'primereact/tabmenu';
import '../../App.css'
import useAuth from "../Authorization/useAuth";
const Header = ()=>{
const obj = useAuth()
const {isUserLoggedIn} = useSelector((state)=>state.auth)

    const items = [
        { label: 'דף הבית', icon: 'pi pi-home',url:"/" },
       !isUserLoggedIn&& { label: 'הרשמה', icon: 'pi pi-user-plus',url:"register" },
        !isUserLoggedIn&& { label: 'התחברות', icon: 'pi pi-sign-in',url:"logIn" },
        { label: 'חיפוש דירה', icon: 'pi pi-list',url:"getAppartment" },
       isUserLoggedIn &&{ label: '', icon: 'pi pi-shopping-cart',url:"basket" },
      isUserLoggedIn&& { label: 'התנתקות', icon: 'pi pi-sign-out',url:"logOut" },
      obj&&obj.role==="admin"&&{ label: 'הוספת דירה', icon: 'pi pi-inbox',url:"addAppartment" }

    ].filter(Boolean);

    return (
        <div className="header-container">
            <TabMenu model={items} />
        </div>
    )
}
       
//     return(
// <nav>
// <NavLink to="/">דף הבית</NavLink>
// {<NavLink to="/getAppartment">חיפוש דירה</NavLink>}
// {!isUserLoggedIn&&<NavLink to="/register">הרשמה</NavLink>}
// {!isUserLoggedIn&&<NavLink to="/login">התחברות</NavLink>}
// {isUserLoggedIn&&<NavLink to="/logOut">התנתק</NavLink>}
// </nav>

//     )

export default Header
