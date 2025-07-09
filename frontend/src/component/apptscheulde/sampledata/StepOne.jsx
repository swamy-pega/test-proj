import React from 'react';

const StepOne = ({ data, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div>
      <label>Name:</label>
      <input name="name" value={data.name} onChange={handleChange} />

      <label>Email:</label>
      <input name="email" value={data.email} onChange={handleChange} />
    </div>
  );
};

export default StepOne;
