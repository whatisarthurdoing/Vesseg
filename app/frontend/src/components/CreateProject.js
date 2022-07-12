import React, { useState, useCallback } from 'react'
import {Button, TextField ,Stepper, StepLabel, Step, StepContent} from '@mui/material';

import './CSS/CreateProject.css'
import { Box } from '@mui/system';



export default function CreateProject() {

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [token, ] = useState(localStorage.getItem("myToken"));
  const [id, setId] = useState(0);
  const [name, setName] = useState(" ");
  const [title, setTitle] = useState("Project");

  const createProject = () => {
    const requestOptions = {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: "Bearer " + token
      }, 
      body: JSON.stringify({
        title: name,
        description: "Project Created"
      })
    };
    try{
      fetch('/projects/', requestOptions)
      .then(response => response.json())
      .then(data => setName(data.title));
    }
    catch(e){
      console.log(e);
    }
    setId(id);
    setTitle(name);
    handleNext();
  };
  
  const [isActiveFirst, setIsActiveFirst] = useState('contained');
  const [colorButtonFirst, setColorButtonFirst] = useState("backgroundColor:'#2F3747'");
  const [isActiveSecond, setIsActiveSecond] = useState('text');
  const [colorButtonNotSecond, setColorButtonSecond] = useState("color:'#2F3747'");

  const handleButtonVariantChange = () => {
    if ( isActiveFirst === 'contained'){
      setIsActiveFirst('text');
      setColorButtonFirst("color:'#2F3747'");
      setIsActiveSecond('contained');
      setColorButtonSecond("backgroundColor:'#2F3747'");
    }
    else{
      setIsActiveFirst('contained');
      setColorButtonFirst("backgroundColor:'#2F3747'");
      setIsActiveSecond('text');
      setColorButtonSecond("color:'#2F3747'");
    }
  };

  const [createTitle, setCreatTitle] = useState("Create Project");

  //TODO: Dont create a project with the same name
  const validate = (inputText) => {
    const text = inputText.replace(/\s+/g, '');
    if (text === ''){
      //TODO: Error Message: No Whitespaces Allowed
      setName("No Spaces allowed")
    }
    else{
      setName(text);
    }
  };

  //Start: Edit title with back button of upload data
  const editTitle = () => {
    const requestOptions = {
      method: "PATCH", 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: "Bearer " + token
      }, 
      body: JSON.stringify({
        "title": name
      })
    };
    try{
      fetch('/projects/', requestOptions)
      .then(response => response.json())
      .then(data => setName(data.title));
    }
    catch(e){
      console.log(e);
    }
    setId(id);
    setTitle(name);
    handleNext();
  };

  const [createButton, setCreateButton] = useState("Create");

  const handleEditProjectTitle = () => {
    handleBack();
    setCreatTitle("Edit project name");
    setCreateButton("Change name");
  };

  function useToggle( initialValue = false){
    const [value, setValue] = useState(initialValue)

    const toggle = useCallback(() => {
    setValue(v => !v);
    }, []);
    return [value, toggle];
  }

  const [isOn, toggleIsOn ] = useToggle();

  const handleProject = () => {
    if(!isOn){
      createProject();
      toggleIsOn(true);
    }
    else{
      editTitle();
    }

  };
  //End: Edit title with back button of upload data


  //disabled={name.includes(" ")}
  //TODO: Buttons Colors change und Auswahl
  return (
    <div className='createProject'>
      <h1>{title}</h1>
      <Box className='stepper'>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              <h2>{createTitle}</h2>
            </StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }} className='content-createProject'>
              <TextField
                label="Name"
                type="text"
                onChange={(v) => validate(v.target.value)}
              />
              <Button style={{color:'#2F3747'}} variant="outlined" onClick={handleProject} disabled={title.includes(" ")}>{createButton}</Button>
            </StepContent>
          </Step>
          <Step>                  
            <StepLabel>
              <h2>Upload Data</h2>
            </StepLabel>
            <StepContent>
              <p>Upload your image data here. The following types are accepted: JPG, PNG, ?</p>
              <p>[Hier kommt die Dropzone hin]</p>
              <Button onClick={handleEditProjectTitle} style={{color:'#2F3747', width:"120px"}} variant="text">Back</Button>
              <Button onClick={handleNext} style={{color:'#2F3747', width:"120px"}} variant="contained">Upload</Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <h2>Choose a model</h2>
            </StepLabel>
            <StepContent>
              <p>Read more about our models here</p>
              <Button onClick = {handleButtonVariantChange} style={{colorButtonFirst, width:"200px"}} variant={isActiveFirst}>Fast AI</Button>
              <Button onClick = {handleButtonVariantChange} style={{colorButtonNotSecond, width:"200px"}} variant={isActiveSecond}>Nunet</Button>
              <Button onClick={handleBack} style={{color:'#2F3747', width:"120px"}} variant="text">Back</Button>
              <Button onClick={handleNext} style={{color:'#2F3747', width:"120px"}} variant="contained">Next</Button>
            </StepContent>
          </Step> 
          <Step>
            <StepLabel>
              <h2>Download Report</h2>
            </StepLabel>
            <StepContent>
              <p>We will send you a report with all important data to your registered E-Mail adress.</p>
              <Button style={{backgroundColor:'#2F3747', width:"fit-content"}} variant="contained">Yes, send me the report</Button>
              <Button style={{color:'#2F3747', width:"200px"}} variant="text">No thanks, I'm good</Button>
              <Button onClick={handleBack} style={{color:'#2F3747', width:"120px"}} variant="text">Back</Button>
              <Button onClick={handleNext} style={{color:'#2F3747', width:"120px"}} variant="contained">Next</Button>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <h2>Evaluation</h2>
            </StepLabel>
            <StepContent>
              <Button className='evaluationButton' style={{color:'#2F3747', borderColor: '#2F3747'}} variant="outlined" href='/evaluation'>Evaluate the project</Button>
              <Button onClick={handleBack} style={{color:'#2F3747', width:"120px"}} variant="text">Back</Button>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </div>
  )
}