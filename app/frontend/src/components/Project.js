import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Paper, TextField, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import './CSS/Project.css'



export default function Project() {

  const [token, ] = useState(localStorage.getItem("myToken"));

  const {id} = useParams();
  const {name} = useParams();
  const [title, setTitle] = useState({name});
  const [pageTitle, setPageTitle] = useState(title.name);
  const [projectId, setProjectId] = useState({id});
  const [inputText, setInputText] = useState("");
  const validity = useRef(false);

  const patchProject = () => {
    validate(inputText);
    if (validity.current){
      const requestOptions = {
        method: "PATCH", 
        headers: {
          'Content-Type': 'application/json', 
          Authorization: "Bearer " + token
        }, 
        body: JSON.stringify({
          title: inputText
        })
      };
      try{
        const element = id;
        const text = "/projects/id"
        const fetcher = text.replace("id", element)
        fetch(fetcher, requestOptions)
        .then(response => response.json())
        .then(data => setPageTitle(data.title));
      }
      catch(e){
        console.log(e);
      }
    }
  };

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

  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  function validate(inputText){
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
  }


  return (
    <div className='singleProject'>
      <h1 id='pageTitle'>{ pageTitle }</h1>
      <div className='allContent'>
        <Paper className='changeProjectName'>
          <h3 id='titleCreateProject'>Change project name</h3>
          <div className='projectChangeName'>
            <TextField
              label="Name"
              type="text"
              variant='standard'
              error = {error}
              helperText = {error ? helperText : ""}
              onChange={(v) => setInputText(v.target.value)}
            />
            <Button className="buttons" style={{color:'#2F3747'}} variant="text" onClick={patchProject}>Change project name</Button>
          </div>
        </Paper>
        <Paper className="changeUploadData">
          <h3 id='titleEditData'>Edit uploaded data</h3>
          <p className='textEditData'>Upload your image data here. The following types are accepted: JPG, PNG, ?</p>
          <Paper id="editUploadPaper">
            <IconButton id='cameraIcon' style={{color:'#2F3747'}} aria-label="upload picture" component="label">
              <input hidden accept="image/*" multiple type="file"/>
              <PhotoCamera />
            </IconButton>
          </Paper>
          <Button id='uploadButtonEditUploadedData' style={{color:'#2F3747', width:"120px"}} variant="text">Upload</Button>
        </Paper>
        <Paper className="changeModel">
          <h3 id='titleChangeModel'>Change model selection</h3>
          <p className='textEditData'>Read more about our models here</p>
          <div id='changeModelSelectionButtons'>
            <Button id='buttonChangeModelFastAi' style={{color:'#2F3747', borderColor: '#2F3747', width:"200px"}} variant="outlined">Fast AI</Button>
            <Button id='buttonChangeModelNunet' style={{color:'#2F3747', borderColor: '#2F3747', width:"200px"}} variant="outlined">Nunet</Button>
          </div>
          <Button id='selectButtonChangeModel' style={{color:'#2F3747', width:"120px"}} variant="text">select</Button>
        </Paper>
        <Paper className="downloadReportAgain">
          <h3 id='titleChangeDownloadReport'>Download Report</h3>
          <p className='textEditData'>Report downloaded with [model] chosen</p>
          <Button style={{color:'#2F3747', borderColor: '#2F3747'}} variant="outlined">Download new report</Button>
        </Paper>
        <Paper className="evaluateAgain">
          <h3 id='titleChangeEvaluateAgain'>Evaluation</h3>
          <Button id="evaluateAgainButton" style={{color:'#2F3747', borderColor: '#2F3747'}} variant="outlined" href='/evaluation'>Evaluate the project</Button>
        </Paper>
      </div>
    </div>
  )
}