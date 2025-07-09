
import { React,useState } from 'react';
import { useNavigate } from "react-router-dom";
import VehicleDetails  from './VehilcleDetails';
import {newVehicleData} from './sampledata/simulatedata.js';
import vehicleData from './sampledata/vehicledata.json';
import VehicleDetailsTemp from './VehicleDetailsTemp';
import Progressbar from './Progressbar.jsx';

export const EnterVehicleDetails = () => {

console.log("Vehicle Data Map", vehicleData);
 
     const navigate=useNavigate();

     const [vehicleSelection, setVehicleSelection] = useState({
    make: '',
    year: '',
    model: '',
    mileage: '',
    vehicletype: ''
  });

    const handleContinue=()=>
    {
navigate('/select-services');

    }




    const handleChildData = (newData) => {
    //console.log("Received from child:", newData);
        //setVehicleSelection(newData);
    setVehicleSelection((prev) => ({ ...prev, ...newData }));


  };

    
   const isVehicleSelectionValid = () => {
  const valid =
    vehicleSelection.make !== '' &&
    vehicleSelection.year !== '' &&
    vehicleSelection.model !== '' &&
    vehicleSelection.vehicletype !== '';

  //console.log("isVehicleSelectionValid", valid);
  return valid;

};

  return (
    <div className='panel-controller'>
    <div className='panel-controller__panel'>
        
    <header className='panel-header'>
        <h1 className='panel-header__title'>Enter Your Vehicle Information</h1>
    </header>
    <main className='enter-vehicle-info'>
        
        <div className='enter-vehicle-info__vin'>
            <div className='gxp-field'>
                <div className='gxp-field-label'>
                    <label htmlFor='vin'>VIN</label>
                </div>
                <div className='gxp-field-wrapper'>
                    <input type='text' id='vin' name='vin' optional className='gxp-input' />
                </div>
             </div> 
        </div>
        <div >
            <VehicleDetails vehicleDataMap={vehicleData.vehicleDataMap} vehicleSelection={vehicleSelection} onDataChange={handleChildData}  />

        </div>

       
    </main>
   </div>
    <footer className='footer'>
    <div className='gxp-action-bar column-spanner'>
        <div className='gxp-footer__back_button'>
            <button type='button' className='gxp-button gxp-button--outline'></button>
            <span className='gxp-button__text'>Back</span>
        </div>

       <button className={`gxp-button ${isVehicleSelectionValid()? 'gxp-button--white' : 'gxp-button--disabled'}`} onClick={handleContinue}>Continue</button>

    </div>
    </footer>


 </div>


  )
}
