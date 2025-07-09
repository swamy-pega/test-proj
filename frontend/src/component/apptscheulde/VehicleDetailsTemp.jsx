
import { useState } from 'react';

 const VehicleDetails = ({vehicleDataMap ,vehicleSelection ,onDataChange}) => {

    console.log("Vehicle vehicleSelection", vehicleSelection);

 const [errors, setErrors] = useState({
     make: '',   
     year: '',
     model: '',
     vehicletype: '',
     mileage: ''
   });

    const handleChange = (e) => {
        if (e.target.name!='mileage') 
            {
                validateField([e.target.name], e.target.value);
            }
    
    onDataChange({ [e.target.name]: e.target.value });
    if (e.target.name === 'make') {
      // If make changes, reset year and model
      onDataChange({ year: '', model: '' });
    }
    if (e.target.name === 'year') {
      // If year changes, reset model
      onDataChange({ model: '' });
    }
    if (e.target.name === 'model') {
      // If model changes, reset vehicle type
      onDataChange({ vehicletype: '' });
    }
    if (e.target.name === 'vehicletype') {
      // If vehicle type changes, reset mileage
      onDataChange({ mileage: '' });
    }
  };
 const validateField = (field, value) => {
    //alert("validateField called with field: " + field + " and value: " + value);
    //console.log("Validating field:", field, "with value:", value);
    setErrors((prev) => ({
      ...prev,
      [field]: value ? '' : `Value is required.`
    }));
     //console.log("set error field:", field, "with value:", value);
  };


       
const getYears = () => {
    return vehicleSelection.make ? Object.keys(vehicleDataMap[vehicleSelection.make]).map(Number)              // convert keys from string to number
        .sort((a, b) => b-a)    // sort descending
        .map(String)              // convert back to string if needed
        : [];
  };

  const getModels = () => {
    return vehicleSelection.make && vehicleSelection.year
      ? vehicleDataMap[vehicleSelection.make][vehicleSelection.year]
      : [];
  };

  

  return (
     <div className='enter-vehicle-info__details'>

        {/* model Dropdown */}  
          <div className='gxp-field'>
                <div className='gxp-field-label'>
                    <label htmlFor='make-input' required>Make</label>
                </div>
                <div className='gxp-field-wrapper'>
                    <select id='make-input' name='make' required className='gxp-input' value={vehicleSelection.make} onChange={handleChange}>
                        <option value=''></option>

                        {Object.keys(vehicleDataMap).map((make) => (        
                            <option key={make} value={make}>{make}</option>
                        ))}
                            
                    </select>
                    {errors.make && <p style={{ color: 'red' }}>{errors.make}</p>}
                </div>
        </div>
        {/* year Dropdown */}
         <div className='gxp-field'>
                    <div className='gxp-field-label'>
                        <label htmlFor='year-input' required>Year</label>
                    </div>
                    <div className='gxp-field-wrapper'>
                        <select id='year-input' name='year' required className='gxp-input' value={vehicleSelection.year} onChange={handleChange}>
                              <option value=''></option>
                         { vehicleSelection.make &&  getYears().map((year) => (
                    <option key={year} value={year}>
                                {year}
                               </option>
                  ))}
                           
                        </select>
                         {errors.year && <p style={{ color: 'red' }}>{errors.year}</p>}
                    </div>
            </div>
        
            <div className='gxp-field'>
                    <div className='gxp-field-label'>
                        <label htmlFor='model-input' required>Model</label>
                    </div>
                    <div className='gxp-field-wrapper'>
                        <select id='model-input' name='model' required className='gxp-input' value={vehicleSelection.model} onChange={handleChange}>
                              <option value=''> </option>
                            {vehicleSelection.make && vehicleSelection.year && getModels().map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
                        </select> 
                         {errors.model && <p style={{ color: 'red' }}>{errors.model}</p>}
                    </div>
            </div>
        {/* vehicle type */}
            <div className='gxp-field'>
                <div className='gxp-field-label'>
                    <label htmlFor='vehicle-type-input' required>Vehicle Type</label>
                </div>
                <div className='gxp-field-wrapper'>
                    <select id='vehicle-type-input' name='vehicletype' required className='gxp-input' 
                    value={vehicleSelection.vehicletype} onChange={handleChange}>
                        <option value=''> </option>
                        <option value='Diesel'>Diesel</option>
                        <option value='Gas'>Gas</option>
                        <option value='Electric'>Electric</option>
                        <option value='Hybrid'>Hybrid</option>
                    </select>
                    {errors.vehicletype && <p style={{ color: 'red' }}>{errors.vehicletype}</p>}
                </div>
            </div>
          {/* mileage */}
            <div className='gxp-field'>
                <div className='gxp-field-label'>
                    <label htmlFor='mileage-input' >Mileage</label>
                </div>
                <div className='gxp-field-wrapper'>
                       <input type='text' id='mileage-input' name='mileage' optional className='gxp-input' 
                       value={vehicleSelection.mileage} onChange={handleChange}></input>
                </div>
            </div>
           


    </div>


  )
}
export default VehicleDetails;