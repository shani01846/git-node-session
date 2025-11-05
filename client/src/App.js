import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import LayOut from "./Components/shared/LayOut";
import Register from "./Components/Authorization/Register";
import Login from "./Components/Authorization/Login";
import LogOut from "./Components/Authorization/LogOut";
import Basket from "./Components/Baskets/Basket"
import HomePgae from "./Components/HomePage"

import AddAppartment from "./Components/Appartments/addAppartment"
import AppartmentList from "./Components/Appartments/AppartmentList";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Theme
import 'primereact/resources/primereact.min.css';                 // Core styles
import 'primeicons/primeicons.css';       
function App() {
  return (
    <div className="App">
{/* <img src="http://localhost:2012/2sock.jpg"></img> */}
      <Router>
        <Routes>
          <Route path="/" element={<LayOut/>}>
            {/* <Route path="homePgae" index element={<Register/>}></Route> */}
            <Route path="register" element={<Register/>}></Route>
            <Route path="/" element={<HomePgae/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="logOut" element={<LogOut/>}></Route>
            <Route path="basket" element={<Basket/>}></Route>
            <Route path="getAppartment" element={<AppartmentList/>}></Route>

            <Route path="addAppartment" element={<AddAppartment/>}></Route></Route>
        </Routes> 
        </Router>
       
        </div>
  )}
  export default App