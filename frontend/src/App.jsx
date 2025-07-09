

import React from "react";
import Home from "./component/Home.jsx"

import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from './component/Navbar.jsx'

import ApptWelcome from "./component/apptscheulde/ApptWelcome.jsx";
import { EnterVehicleDetails } from "./component/apptscheulde/EnterVehicleDetails.jsx";
import SelectServices from "./component/apptscheulde/SelectServices.jsx";
//import HeremapDemo from "./component/HeremapDemo.jsx";
//import Quiz from "./component/QuizSample2.tsx";



function App() {

  
 return(

  <div>
   
   <div>
    
    <BrowserRouter>
    <Navbar/>
    <Routes >
        <Route path="/" element={<Home />}/>


        <Route path="/schedule-appt" element={<ApptWelcome />} />
        
        <Route path="/enter-vehicle-details" element={<EnterVehicleDetails />} />
        <Route path="/select-services" element={<SelectServices />} />

    </Routes>
    
    </BrowserRouter>
    </div> 
 </div> 

);

}


export default App;
