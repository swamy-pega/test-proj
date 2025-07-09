import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepNavigation from './StepNavigation';

//import StepNavigation from './components/StepNavigation';

const ParentPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    address: ''
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChildChange = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="container">
      <h2>Multi-Step Form</h2>

      {step === 1 && (
        <StepOne data={formData} onChange={handleChildChange} />
      )}

      <div className="step-content"> child component data {formData.name}</div>
      {step === 2 && (
        <StepTwo data={formData} onChange={handleChildChange} />
      )}

      <StepNavigation step={step} onNext={handleNext} onBack={handleBack} />
    </div>
  );
};

export default ParentPage;
