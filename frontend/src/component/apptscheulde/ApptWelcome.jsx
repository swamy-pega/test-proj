import React from 'react'
import { useNavigate } from "react-router-dom";


const ApptWelcome = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/enter-vehicle-details');
  };

  return (
    
    <div className='panel-controller'>
        <div className='panel-controller__panel welcome-panel'>
    <div className='welcome'>
      <h1>Welcome </h1>
      <p>Let's start by finding you in our system.</p>
      <form className='welcome__find-customer' action="/find-customer" method="POST">

        <div className='welcome__find-customer'>
        <div className='gxp-field-label'><label htmlFor="phonenumber">Enter your mobile phone number:</label> </div>
        <div className='gxp-field-wrapper'>
        <input className='gxp-input' type="tel" id="phonenumber" name="phonenumber" required /> 
        </div>
        <p className='otp-verify__text'>Verify your identity with a one-time passcode via text.</p>
        <p className='otp-verify__subtext'> By providing your phone number, you agree to receive communications from Ford about your reservation and service visit via text or email.</p>
        
        </div>
        <div className='gxp-filed-wrapper gxp-field-wrapper--submit'>
          <button  className='gxp-button' type="submit">Continue</button>
        </div>
      </form>
      <section className='new-customer'>
        <div>
        <div className='welcome_or_text'>New here?  </div>
        <p className='new-customer__subtitle'>Share a few details about your vehicle to get started.</p>

        
           </div>
        <div className='new-customer-button'> <button className='new-customer__button gxp-button gxp-button--outline' onClick={handleContinue}>New Customer</button></div>
     
      </section>
      

  </div>
  </div>
  </div>

  )
}

export default ApptWelcome