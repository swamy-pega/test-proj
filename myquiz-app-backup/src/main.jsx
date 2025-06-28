import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//gitimport { HashRouter } from 'react-router-dom';
import React from "react";
//bootstrap/dist/css/bootstrap.cs
import './App.css';


import App from './App.jsx'

const apiUrl = import.meta.env.VITE_API_URL;
//console.log("API URL:", apiUrl);
const root = createRoot(document.getElementById("root"));
root.render(
 
  <StrictMode>
    <App />
  </StrictMode>
  
);
