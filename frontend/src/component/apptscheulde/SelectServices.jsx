import React from 'react'
import { useNavigate } from "react-router-dom";
import Progressbar from './Progressbar.jsx';
const SelectServices = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/some-other-route');

  }

  

  return (
  

    <div className='panel-controller'>
    <div className='panel-controller__panel'>

      
    <div><Progressbar currentStep={2} totalSteps={5} header="Schedule Service"/>
     </div>

    <header className='panel-header'>
        <h1 className='panel-header__title'>Selected Services Will Be Added To Your Reservation</h1>
    </header>
    {/*dynamic service section start */}
  <div className='dynamic-summary'>
      {/* Map through selected services and display them */}

  <div className='dynamic-summary__content'>

  <main>
    <div class="service">
    <div class="service__tiles">
        <label class="gxp-tile tile-checkbox tile-checkbox__tile--small">
            <input type="checkbox" name="The Works"/>
            <div class="service-tile__label">The Works®</div>
        </label>

         <label class="gxp-tile tile-checkbox tile-checkbox__tile--small">
            <input type="checkbox" name="Oil Change"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" fill-rule="evenodd"
                viewBox="0 0 48 48" width="1em" height="1em" class="service-tile__icon"
                aria-hidden="true">
                <title>Oil Change</title>
                <path
                    d="M14.25 22.966v-1.5l-7.8-3.1-2.2 5.6 8 3.2v5.8h18l8-8 1.7-.3 1.3 1.3 1.4-1.5-2-2-14.5 2.3-1.9-1.8h-4v-2h2v-2h-6v2h2v2h-4Zm-6.7-2 4.7 1.9v2.1l-5.4-2.1.7-1.9Zm6.7 10h15.2l5.4-5.4-9.4 1.4-2-2h-9.2v6Zm28 2c1.1 0 2-.9 2-2s-2-4-2-4-2 2.9-2 4 .9 2 2 2Z"
                    clip-rule="evenodd"></path>
            </svg>
            <div class="service-tile__label">Oil Change</div>
        </label>
         <label class="gxp-tile tile-checkbox tile-checkbox__tile--small">
            <input type="checkbox" name="Battery"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" fill-rule="evenodd"
                viewBox="0 0 48 48" width="1em" height="1em" class="service-tile__icon"
                aria-hidden="true">
                <title>Battery</title>
                <path
                    d="M36.75 14.966h4v22h-32v-22h4v-2h6v2h12v-2h6v2Zm-26 2v18h28v-18h-28Zm22 8h2v-2h2v-2h-2v-2h-2v2h-2v2h2v2Zm-20-4h6v2h-6v-2Z"
                    clip-rule="evenodd"></path>
            </svg>
            <div class="service-tile__label">Battery</div>
        </label>
         <label class="gxp-tile tile-checkbox tile-checkbox__tile--small">
            <input type="checkbox" name="Brakes"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" fill-rule="evenodd"
                viewBox="0 0 48 48" width="1em" height="1em" class="service-tile__icon"
                aria-hidden="true">
                <title>Brakes</title>
                <path
                    d="M40.333 24.966c0 8.8-7.2 16-16 16s-16-7.2-16-16 7.2-16 16-16 16 7.2 16 16Zm-2 0c0-7.7-6.3-14-14-14s-14 6.3-14 14 6.3 14 14 14 14-6.3 14-14Zm-15.5-7v-1h3v1c0 1.9-.4 8.6-.7 11h-1.7c-.2-2.4-.6-9.1-.6-11Zm1.5 13.1c-1.2 0-2 .8-2 1.9 0 1.2.8 2 2 2s2-.8 2-2c0-1.1-.8-1.9-2-1.9Zm-13.1 9 1.4-1.4c-3.8-3.3-6.3-8.2-6.3-13.7s2.5-10.4 6.3-13.7l-1.4-1.4c-4.2 3.7-6.9 9.1-6.9 15.1s2.7 11.4 6.9 15.1Zm24.8-1.4c3.8-3.3 6.3-8.2 6.3-13.7s-2.5-10.4-6.3-13.7l1.4-1.4c4.2 3.7 6.9 9.1 6.9 15.1s-2.7 11.4-6.9 15.1l-1.4-1.4Z"
                    clip-rule="evenodd"></path>
            </svg>
            <div class="service-tile__label">Brakes</div>
        </label>

         <label class="gxp-tile tile-checkbox tile-checkbox__tile--small">
            <input type="checkbox" name="Tire Rotation"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" fill-rule="evenodd"
                viewBox="0 0 48 48" width="1em" height="1em" class="service-tile__icon"
                aria-hidden="true">
                <title>Tire Rotation</title>
                <path
                    d="M30.3 35.765c.6-.4 1.2-.9 1.7-1.4v2.6c-2.5 1.9-5.6 3-9 3-8.3 0-15-6.7-15-15s6.7-15 15-15c7.3 0 13.3 5.1 14.8 12.1h-2.1c-.2-.9-.5-1.8-.9-2.6-1 .5-2.2.1-2.7-.8l1.7-1c-.9-1.3-2.1-2.5-3.4-3.4-.6.9-1.8 1.2-2.7.7l1-1.7c-1.4-.6-3-1.1-4.6-1.2 0 1-.9 1.9-2 1.9v-2c-1.6.1-3.2.5-4.6 1.2.5 1 .1 2.2-.8 2.7l-1-1.7c-1.3.9-2.5 2.1-3.4 3.4.9.6 1.2 1.8.7 2.7l-1.7-1c-.6 1.4-1.1 3-1.2 4.6 1 0 1.9.9 1.9 2h-2c.1 1.6.5 3.2 1.2 4.6 1-.5 2.2-.1 2.7.8l-1.7 1c.9 1.3 2.1 2.5 3.4 3.4.6-.9 1.8-1.2 2.7-.7l-1 1.7c1.4.6 3 1.1 4.6 1.2 0-1 .9-1.9 2-1.9v2c1.6-.1 3.2-.5 4.6-1.2-.5-1-.1-2.2.8-2.7l1 1.7Zm9.7 2.2h-2v-8h-4v2h2v6h-2v2h6v-2Zm-1.5-11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-15.5 6.5c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8Zm-6-8c0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6-6 2.7-6 6Z"
                    clip-rule="evenodd"></path>
            </svg>
            <div class="service-tile__label">Tire Rotation</div>
        </label>

        <label class="gxp-tile tile-checkbox tile-checkbox__tile--small">
            <input type="checkbox" name="Cooling"/>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                viewBox="0 0 48 49" class="service-tile__icon" aria-hidden="true">
                <title>Cooling</title>
                <path
                    d="M32.4 13.097v2h-6.7v2.9h6.8v2h-6.8v2.9h6.8v2h-6.8v2.6c.8.5 1.3 1.4 1.3 2.4 0 1.7-1.4 3-3 3-1.7 0-3-1.4-3-3 0-1 .5-1.9 1.3-2.4v-17c0-.9.8-1.6 1.7-1.6.9 0 1.6.7 1.6 1.6v2.6h6.8ZM8 32.596v-2.1c3.1-2.6 5.6-1.1 6.9-.3 1 .5 2.5.3 3.7.1v2c-1.2.6-3 .4-4.2-.3-2.5-1.4-4.5-.8-6.4.6Zm32-2.1v2.1c-1.9-1.4-3.9-2-6.4-.6-1.2.7-3 .9-4.2.3v-2c1.2.2 2.7.4 3.7-.1 1.3-.8 3.8-2.3 6.9.3Zm-13.86 7.675c-.46.367-.809.644-1.94.725-1.4-.1-2-.5-2.5-1-1-.7-2.7-.6-3.6.1-2.383 1.715-3.948.524-4.782-.111l-.118-.09c-.8-.6-2.1-.5-3.1.1v-2.1c1-.6 2.5-.6 3.7.3l.05.032c.8.5 1.987 1.244 3.75.069.9-.7 2.8-1.5 4.8 0 .4.3 1.3.6 1.7.6.4 0 1.3-.2 1.7-.5 2-1.6 3.8-.8 4.8-.1 1.8 1.3 3 .5 3.8-.1 1.2-.9 2.6-.9 3.7-.3v2.1c-1-.6-2.3-.7-3.1-.1-.07.046-.143.097-.221.151-.931.646-2.464 1.71-4.679.048-.9-.7-2.6-.8-3.6-.1-.134.096-.25.189-.36.276Z"
                    clip-rule="evenodd"></path>
            </svg>
            <div class="service-tile__label">Cooling</div>
        </label>

        <label class="gxp-tile tile-checkbox tile-checkbox__tile--small">
            <input type="checkbox" name="Filters"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" fill-rule="evenodd"
                viewBox="0 0 48 48" width="1em" height="1em" class="service-tile__icon"
                aria-hidden="true">
                <title>Filters</title>
                <path
                    d="M32.333 11.896c-2.2 0-4 1.8-4 4 0 .6.4 1 1 1s1-.4 1-1c0-1.1.9-2 2-2s2 .9 2 2c0 1-.7 1.8-1.7 2l-8.3 1.4v2l8.7-1.5c1.9-.3 3.3-2 3.3-3.9 0-2.2-1.8-4-4-4Zm-16 1h6v2h-6v-2Zm6 2v2c-1.696 0-2.681.622-3.459 1.112l-.14.088c-.09.051-.175.102-.26.152-.58.344-1.093.648-2.14.648v-2c1.047 0 1.56-.304 2.14-.648l.26-.152c.8-.6 1.8-1.2 3.6-1.2Zm-8 5h-8v2h8v-2Zm26 5c0-1.7-1.3-3-3-3-.6 0-1-.4-1-1s.4-1 1-1c2.8 0 5 2.2 5 5s-2.2 5-5 5c-.6 0-1-.4-1-1s.4-1 1-1c1.7 0 3-1.3 3-3Zm-34-1h8v2h-8v-2Zm18 0h11c.6 0 1 .4 1 1s-.4 1-1 1h-11v-2Zm-18 4h8v2h-8v-2Zm10-7v2c1.048 0 1.562-.304 2.141-.648l.26-.152.14-.088c.778-.49 1.763-1.111 3.46-1.111v-2c-1.8 0-2.8.6-3.6 1.2-.09.05-.175.101-.26.151-.58.344-1.093.648-2.14.648Zm2.141 5.352c-.58.344-1.093.648-2.14.648v-2c1.047 0 1.56-.304 2.14-.648l.26-.152c.8-.6 1.8-1.2 3.6-1.2v2c-1.697 0-2.682.622-3.46 1.112l-.064.04-.077.049c-.089.05-.174.101-.259.151Zm-2.14 6.649v4h6v-2h-6c1.047 0 1.56-.305 2.14-.649.085-.05.17-.1.26-.151l.14-.09c.778-.49 1.763-1.11 3.46-1.11v-2c-1.8 0-2.8.6-3.6 1.2-.09.05-.175.101-.26.151-.58.344-1.093.649-2.14.649Zm2.14-2.649c-.58.344-1.093.648-2.14.648v-2c1.047 0 1.56-.304 2.14-.648l.26-.152c.8-.6 1.8-1.2 3.6-1.2v2c-1.697 0-2.682.622-3.46 1.112l-.14.088c-.09.051-.175.102-.26.152Zm5.86-1.852 8.7 1.6c1.9.3 3.3 2 3.3 3.9 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-.6.4-1 1-1s1 .4 1 1c0 1.1.9 2 2 2s2-.9 2-2c0-1-.7-1.8-1.7-2l-8.3-1.5v-2Z"
                    clip-rule="evenodd"></path>
            </svg>
            <div class="service-tile__label">Filters</div>
        </label>

          <label class="gxp-tile tile-checkbox tile-checkbox__tile--small">
            <input type="checkbox" name="Lights"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" fill-rule="evenodd"
                viewBox="0 0 48 48" width="1em" height="1em" class="service-tile__icon"
                aria-hidden="true">
                <title>Lights</title>
                <path
                    d="M23.866 36.897c-.8 0-1.5-.4-1.9-1.1-.9-1.6-2.3-5-2.3-10.9 0-5.8 1.4-9.3 2.3-10.9.4-.7 1.1-1.1 1.9-1.1 7.8 0 11.8 1.3 14.9 3.4 3.2 2.2 4.9 6.4 4.9 8.6 0 2.2-1.7 6.4-4.9 8.6-3.1 2.1-7.1 3.4-14.9 3.4Zm-2.2-12c0 5.5 1.3 8.6 2.1 10 8.2 0 11.7-1.6 13.9-3.1 2.7-1.9 4-5.4 4-6.9s-1.4-5.1-4-6.9c-2.2-1.5-5.7-3.1-13.9-3.1-.8 1.4-2.1 4.5-2.1 10Zm-16-10h13.5l-.8 2h-12.7v-2Zm11.95 5.5c-.05.325-.1.65-.15 1h-11.8v-2h12.1c-.05.35-.1.675-.15 1Zm-.35 5.5v-2h-11.6v2h11.6Zm.35 3.5c-.05-.326-.1-.65-.15-1h-11.8v2h12.1c-.05-.35-.1-.675-.15-1Zm1.55 5.5c-.3-.7-.5-1.3-.7-2h-12.8v2h13.5Z"
                    clip-rule="evenodd"></path>
            </svg>
            <div class="service-tile__label">Lights</div>
        </label>

         <label class="gxp-tile tile-checkbox tile-checkbox__tile--small">
            <input type="checkbox" name="Wipers"/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" fill-rule="evenodd"
                viewBox="0 0 48 48" width="1em" height="1em" class="service-tile__icon"
                aria-hidden="true">
                <title>Wipers</title>
                <path
                    d="m33.666 35.765 11-16.8c-5.7-3.8-12.6-6-20-6s-14.3 2.2-20 6l11 16.8c1.6-1 3.4-1.9 5.3-2.3l2 4.4c-.2.3-.3.7-.3 1.1 0 1.1.9 2 2 2s2-.9 2-2c0-1-.8-1.9-1.8-2l-1.8-3.9c.5-.1 1-.1 1.6-.1 3.3 0 6.4 1.1 9 2.8Zm-17.3-2.7-8.9-13.5c1.9-1.1 3.8-2 5.8-2.7l6.9 14.7c-1.3.4-2.6.9-3.8 1.5Zm-1.1-16.8 6.9 14.9c.8-.1 1.7-.2 2.5-.2 2.9 0 5.8.8 8.4 2.1l8.9-13.5c-5.2-3-11.1-4.6-17.2-4.6-3.3 0-6.4.4-9.5 1.3Z"
                    clip-rule="evenodd"></path>
            </svg>
            <div class="service-tile__label">Wipers</div>
        </label>
    </div>
    <div>
         <label class="gxp-tile tile-checkbox tile-checkbox__tile--wide">
        <input type="checkbox" name="General Diagnostics"/>
        <div class="service__diagnosis--header">Need a Diagnosis?</div>
        <div class="service__diagnosis--text">Tell us more about what's happening and we'll check it
            out.</div>
    </label>
    </div>

</div>
        </main>

      </div>



      
      
      
      
      {/*--aside section for dynamic summary--*/}
      <aside className='dynamic-summary__sidebar'>
        
      </aside>

     </div>
   {/*dynamic service section end */}   
   </div>
   {/* footer section */}
  <footer className='footer'>
    <div className='gxp-action-bar column-spanner'>
        <div className='gxp-footer__back_button'>
            <button type='button' className='gxp-button gxp-button--outline'></button>
            <span className='gxp-button__text'>Back</span>
        </div>
        
       <button className='gxp-button gxp-button--white' onClick={handleContinue}>Continue</button>

    </div>
  </footer>
    {/* end footer section */}

    </div>
   
  )
}

export default SelectServices