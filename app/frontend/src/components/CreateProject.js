import React, { useState, useCallback } from 'react'
import {Button, TextField ,Stepper, StepLabel, Step, StepContent} from '@mui/material';
import { Box } from '@mui/system';

import './CSS/CreateProject.css';



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
  const [stateContent, setStateContent] = useState(true);

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
    setStateContent(true);
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

  const [error, setError] = useState(false);

  //TODO: Dont create a project with the same name
  const validate = (inputText) => {
    const text = inputText.replace(/\s+/g, '');
    if (text === ''){
      setError(true);
    }
    else{
      setTitle(text);
      setName(text);
    }
  };

  const [createTitle, setCreateTitle] = useState("Create Project");

  const handleEditProjectTitle = () => {
    handleBack();
    setCreateTitle("Edit project name");
    setStateContent(false);
  };

  const createProjectComponent = <div id="contentCreateComponent">
                                    <TextField
                                      label="Name"
                                      type="text"
                                      onChange={(v) => validate(v.target.value)}
                                      error={error}
                                    />
                                    <Button id="createProjectButton" style={{color:'#2F3747'}} variant="text" onClick={createProject} disabled={title.includes(" ")}>create</Button>
                                  </div>

  const editTitleComponent =  <div id='contentEditTitle'>
                        <p id = "textEditName">
                          You have created the project "{title}".
                          To edit it's name, click on the title in the projects table.
                        </p>
                        <Button onClick={handleNext} style={{color:'#2F3747', width:"120px"}} variant="text">Next</Button>
                      </div>

  const contentOfFirstStep = () => {
    if(stateContent){
      return createProjectComponent;
    }
    else{
      return editTitleComponent;
    }
  };


  return (
    <div className='createProject'>
      <h1>{title}</h1>
      <Box className='stepper'>
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step id='createStep'>
            <StepLabel>
              <h2>{createTitle}</h2>
            </StepLabel>
            <StepContent TransitionProps={{ unmountOnExit: false }} className='content-createProject'>
              {contentOfFirstStep()}
            </StepContent>
          </Step>
          <Step>                  
            <StepLabel>
              <h2>Upload Data</h2>
            </StepLabel>
            <StepContent>
              <p>Upload your image data here. The following types are accepted: JPG, PNG, ?</p>
              <p>[Hier kommt die Dropzone hin]</p>
              <div className='buttonsParallel'>
                <Button onClick={handleEditProjectTitle} style={{color:'#2F3747', width:"120px"}} variant="text">Back</Button>
                <Button onClick={handleNext} style={{backgroundColor:'white', color:'#2F3747', width:"120px"}} variant="contained">Upload</Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <h2>Choose a model</h2>
            </StepLabel>
            <StepContent>
              <p>Read more about our models here</p>
              <div className='buttonsParallel'>
                <Button onClick = {handleButtonVariantChange} style={{colorButtonFirst, width:"200px"}} variant={isActiveFirst}>Fast AI</Button>
                <Button onClick = {handleButtonVariantChange} style={{colorButtonNotSecond, width:"200px"}} variant={isActiveSecond}>Nunet</Button>
              </div>
              <div className='buttonsParallel'>
                <Button onClick={handleBack} style={{color:'#2F3747', width:"120px"}} variant="text">Back</Button>
                <Button onClick={handleNext} style={{color:'#2F3747', width:"120px"}} variant="contained">Next</Button>
              </div>
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