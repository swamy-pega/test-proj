import React from 'react';

const StepTwo = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div>
      <label>Age:</label>
      <input name="age" value={data.age} onChange={handleChange} />

      <label>Address:</label>
      <input name="address" value={data.address} onChange={handleChange} />
    </div>
  );
};

export default StepTwo;
