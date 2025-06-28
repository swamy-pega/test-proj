import react from 'react';
import { useNavigate } from "react-router-dom";

const Services= ()=>
{

    const navigate=useNavigate();
    const handleContinue = ()=>
    {
navigate("/MovieResults");
    };

    return (
<div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
        <h1> Services Page </h1>
        <button onClick={handleContinue}>Continue</button>
        </div>
    )

};
export default Services;
