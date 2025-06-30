import react from 'react';
import { useNavigate } from "react-router-dom";
const Home= ()=>
{
    const navigate=useNavigate();

    const handleContinue=()=>
    {
navigate('/Quiz');

    }

    return (
<div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
        <h1> WELCOME </h1>

        <button onClick={handleContinue}>Continue</button>
        <p></p>
        <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )

};
export default Home;
