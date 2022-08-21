import React, { useState, useEffect, useRef } from 'react';
import {Button, TextField ,Stepper, StepLabel, Step, StepContent, Paper} from '@mui/material';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
//TODO: Progressbar for user feedback in upload image step
//import CircularProgress, {CircularProgressProps} from '@mui/material/CircularProgress';

import './CSS/CreateProject.css';



export default function CreateProject() {

  /*
    Stepper
  */

  const [activeStep, setActiveStep] = useState(0);

  //Controls the next and back buttons in stepper
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
  const [inputText, setInputText] = useState("");
  const validity = useRef(false);

  const createProject = () => {
    validate(inputText);
    if (validity.current){
      const requestOptions = {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json', 
          Authorization: "Bearer " + token
        }, 
        body: JSON.stringify({
          title: inputText,
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
      setTitle(inputText);
      setStateContent(true);
      handleNext();
    }
  };

  /*
    Handle variant changes for buttons where user can choose between two options
  */
  
  const [isActiveFirst, setIsActiveFirst] = useState('contained');
  const [isActiveSecond, setIsActiveSecond] = useState('text');
  const [colorFirstButton, setColorFirstButton] = useState("white");
  const [colorSecondButton, setColorSecondButton] = useState("#2F3747");
  const [backgroundColorFirstButton, setBackGroundColorFirstButton] = useState("#2F3747");
  const [backgroundColorSecondButton, setBackGroundColorSecondButton] = useState("white");

  const handleButtonVariantChange = () => {
    if ( isActiveFirst === 'contained'){
      setIsActiveFirst('text');
      setIsActiveSecond('contained');
      setColorFirstButton('#2F3747');
      setColorSecondButton("white");
      setBackGroundColorFirstButton("white");
      setBackGroundColorSecondButton("#2F3747");
    }
    else{
      setIsActiveFirst('contained');
      setIsActiveSecond('text');
      setColorFirstButton("white");
      setColorSecondButton("#2F3747");
      setBackGroundColorFirstButton("#2F3747");
      setBackGroundColorSecondButton("white");
    }
  };

  /*
    Get list of project names that already exist, so that new project doesn't match an
    already existing name
  */
  const [currentProjects, setCurrentProjects] = useState();

  useEffect(() => { 
    const fetchProjects = async () => {
      const requestOptions = {
        method: "GET", 
        headers: {
          "content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      };
      try{
        fetch("/projects/", requestOptions)
        .then((data) => data.json())
        .then((data) => setCurrentProjects(data));
      }
      catch(e){
        console.log(e)
      }
    }
    fetchProjects();
  }, []);

  /*
    Validate the name input
  */
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  const validate = (inputText) => {
    // Eliminating all whitespaces in input
    const text = inputText.replace(/\s+/g, '');
    let alreadyExists = false;

    //compare if new project name already exists
    for( let i = 0; i < currentProjects.length; i++){
      let projectToCompare = currentProjects[i].title
      if(projectToCompare === text){
        alreadyExists = true;
      }
    }

    // Input is empty
    if (text === ''){
      setHelperText("No whitespaces allowed");
      setError(true);
      validity.current = false;
    }
    // Input is too short or too long
    else if(text.length < 4 || text.length > 30){
      setHelperText("Name must be between 4 and 30 characters long");
      setError(true);
      validity.current = false;
    }
    // new project name already exists
    else if(alreadyExists){
      setHelperText("There is already a project with this name");
      setError(true);
      validity.current = false;
    }
    else{
      setInputText(text);
      setError(false);
      validity.current = true;
    }
  };

  // Title of the page -> Changes if project is created to new projects name
  const [createTitle, setCreateTitle] = useState("Create Project");

  const handleEditProjectTitle = () => {
    handleBack();
    setCreateTitle("Edit project name");
    setStateContent(false);
  };

  // Initial content of first step
  const createProjectComponent = <div id="contentCreateComponent">
                                    <TextField
                                      label="Name"
                                      type="text"
                                      error={error}
                                      helperText = {error ? helperText : ""}
                                      onChange={(v) => setInputText(v.target.value)}
                                    />
                                    <Button id="createProjectButton" style={{color:'#2F3747'}} variant="text" onClick={createProject} disabled={title.includes(" ")}>create</Button>
                                  </div>

  // Content of first step when user clicks "back" button in second step
  const editTitleComponent =  <div id='contentEditTitle'>
                                <p id = "textEditName">
                                  You have created the project "{title}".
                                  To edit it's name, click on the title in the projects table.
                                </p>
                                <Button onClick={handleNext} style={{color:'#2F3747', width:"120px"}} variant="text">Next</Button>
                              </div>

  // Handle content change of the first step
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
              <Paper id="editUploadPaperCreateProject">
                <IconButton id='cameraIconCreateProject' style={{color:'#2F3747'}} aria-label="upload picture" component="label">
                  <input hidden accept="image/*" multiple type="file"/>
                  <PhotoCamera />
                </IconButton>
              </Paper>
              <div className='buttonsParallel'>
                <Button id='uploadDataButtonCreateProject' onClick={handleNext} style={{backgroundColor:'white', color:'#2F3747', width:"120px"}} variant="contained">Upload</Button>
                <Button id='backButtonUploadDataCreateProject' onClick={handleEditProjectTitle} style={{color:'#2F3747', width:"120px"}} variant="text">Back</Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <h2>Choose a model</h2>
            </StepLabel>
            <StepContent>
              <p>Read more about our models <a href='/about' style={{textDecoration: 'none'}}>here</a></p>
              <div id='buttonsChooseModelCreateProject'>
                <Button onClick = {handleButtonVariantChange} style={{ color: colorFirstButton, backgroundColor: backgroundColorFirstButton, width:"200px"}} variant={isActiveFirst}>Fast AI</Button>
                <Button onClick = {handleButtonVariantChange} style={{ color: colorSecondButton, backgroundColor: backgroundColorSecondButton, width:"200px"}} variant={isActiveSecond}>Nunet</Button>
              </div>
              <div id='stepButtonsChooseModelCreateProject'>
                <Button onClick={handleBack} style={{color:'#2F3747', width:"120px"}} variant="text">Back</Button>
                <Button onClick={handleNext} style={{backgroundColor:'white', color:'#2F3747', width:"120px"}} variant="contained">Choose</Button>
              </div>
            </StepContent>
          </Step> 
          <Step>
            <StepLabel>
              <h2>Download Report</h2>
            </StepLabel>
            <StepContent>
              <p>We will send you a report with all important data to your registered E-Mail adress.</p>
              <div id="buttonsDownloadReportCreateProject">
                <Button onClick={handleButtonVariantChange}  style={{color: colorFirstButton, backgroundColor: backgroundColorFirstButton, width:"fit-content"}} variant={isActiveFirst}>Yes, send me the report</Button>
                <Button onClick={handleButtonVariantChange}  style={{color: colorSecondButton, backgroundColor: backgroundColorSecondButton, width:"200px"}} variant={isActiveSecond}>No thanks, I'm good</Button>
              </div>
              <div id="stepButtonsDownloadReportCreateProject">
                <Button onClick={handleBack} style={{color:'#2F3747', width:"120px"}} variant="text">Back</Button>
                <Button onClick={handleNext} style={{ backgroundColor:"white", color:'#2F3747', width:"120px"}} variant="contained">Send</Button>
              </div>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              <h2>Evaluation</h2>
            </StepLabel>
            <StepContent>
              <Button id='evaluationButton' style={{color:'#2F3747', borderColor: '#2F3747'}} variant="outlined" href='/evaluation'>Evaluate the project</Button>
              <Button onClick={handleBack} style={{color:'#2F3747', width:"120px"}} variant="text">Back</Button>
            </StepContent>
          </Step>
        </Stepper>
      </Box>
    </div>
  )
}