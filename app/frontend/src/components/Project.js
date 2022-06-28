import React, {useState} from 'react'
import { Button, TextField, Stepper, StepLabel, Step, StepContent} from '@mui/material';
import './CSS/Project.css'

export default function Project() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className='project'>
      <Stepper activeStep={activeStep} orientation='vertical'>
    
      </Stepper>
    </div>
  )
}