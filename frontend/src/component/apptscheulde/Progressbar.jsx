import React from 'react';
//import './ProgressBar.css'; // We'll define styles next

const Progressbar = ({ currentStep, totalSteps, header }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <section
      data-step={currentStep}
      data-testid="progress-bar"
      className="progress-bar"
      aria-label="progress bar"
    >
      <p className="progress-bar__mobile-header">{header}</p>
      <div className="progress-bar__indicator column-spanner">
        {steps.map((step) => (
          <div
            key={step}
            className={`progress-bar__step ${step <= currentStep ? 'highlighted' : ''}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Progressbar;
