import { Outlet } from "react-router-dom";
import Header from "./header";
import Basket from "../Baskets/Basket";
import '../../App.css'
const LayOut = ()=>{

    return(
<div>
     
       {/* {
            const video = document.getElementById('myVideo');
            video.addEventListener('loadedmetadata', () => {
             video.currentTime = 4; // להתחיל מהשנייה ה-4
                 });} */}

  <Header></Header>

     <video autoPlay loop width="100%" style={{marginTop:"0px"}} muted className="video-full-width">
          <source src="http://localhost:2012/images/m5.mp4" type="video/mp4"></source>
        </video> 
       
<Outlet>
   
    <main>
        hi Shani
    </main>
</Outlet>
</div>
    )
}
export default LayOut