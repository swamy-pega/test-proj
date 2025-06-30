

import React from "react";
import Home from "./component/Home.jsx"

import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from './component/Navbar.jsx'

import Quiz from "./component/QuizSample2.tsx";

function App() {

    /* <div><Quiz/></div> 
   <div><MovieResults/></div> */
 return(

  <div>
   
   <div>
    <BrowserRouter>
    <Navbar/>
    <Routes >
        <Route path="/" element={<Home />}/>
         {/*<Route path="/services" element={<Services />}/>
        <Route path="/MovieResults" element={<MovieResults />
        <Route path="/UserList" element={<UserList />}/> */}
        <Route path="/quiz-app" element={<Quiz />}/>
       
    </Routes>
    
    </BrowserRouter>
    </div> 
 </div> 

);

}


export default App;
