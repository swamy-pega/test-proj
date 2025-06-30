
//import ListGroup from "./component/ListGroup"
//import MovieResults from "./component/MoviesSearch.jsx"
import React from "react";
import Home from "./component/Home.jsx"
//import Services from "./component/Services.jsx"
//import Contact from "./component/Contact.jsx"
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from './component/Navbar.jsx'
//import Products from "./Products.jsx"
//import HeaderMsg from "./component/jsfunctions.js"
//import Gallery from './Gallery.js';

//import PropsTest from "./component/PropsTest.jsx";
//import CalcCartTotal from "./component/CartTotal.tsx";
//FAQList
//import FAQList from "./component/QuestionsList.tsx";
import Quiz from "./component/QuizSample2.tsx";
//import SingleSelectButtons from "./component/multipleButtons.tsx";
//import ExcelReader from "./component/UploadFile.jsx"
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
