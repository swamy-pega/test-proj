import React from 'react';

const StepNavigation = ({ step, onNext, onBack }) => {
  return (
    <div>
      {step > 1 && <button onClick={onBack}>Back</button>}
      {step < 2 && <button onClick={onNext}>Next</button>}
      {step === 2 && <button onClick={() => alert("Submit form")}>Submit</button>}
    </div>
  );
};

export default StepNavigation;
