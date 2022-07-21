import React, { useState } from 'react'
import {Paper, Box, TextField, Button} from '@mui/material';

import './CSS/Project.css'
import { useParams } from 'react-router-dom';



export default function Project() {

  const [token, ] = useState(localStorage.getItem("myToken"));

  const {id} = useParams();
  const {name} = useParams();
  const [title, setTitle] = useState({name});
  const [pageTitle, setPageTitle] = useState(title.name);
  console.log(pageTitle);
  const [projectId, setProjectId] = useState({id});

  const patchProject = () => {
    const requestOptions = {
      method: "PATCH", 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: "Bearer " + token
      }, 
      body: JSON.stringify({
        title: title
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
    console.log(pageTitle);
  };

  //TODO: Dont change name to a project name that already exists
  const validate = (inputText) => {
    const text = inputText.replace(/\s+/g, '');
    if (text === ''){
      //TODO: Error Message: No Whitespaces Allowed
      setTitle("No Spaces allowed")
    }
    else{
      setTitle(text);
    }
  };

  return (
    <div className='singleProject'>
      <h1>{ pageTitle }</h1>
      <div className='allContent'>
        <Paper className='changeProjectName'>
          <h3 id='titleCreateProject'>Change project name</h3>
          <div className='projectChangeName'>
            <TextField
              label="Name"
              type="text"
              variant='standard'
              onChange={(v) => validate(v.target.value)}
            />
            <Button className="buttons" style={{color:'#2F3747'}} variant="text" onClick={patchProject}>Change project name</Button>
          </div>
        </Paper>
        <Paper className="changeUploadData">
          <h3 id='titleEditData'>Edit uploaded data</h3>
          <p className='textEditData'>Upload your image data here. The following types are accepted: JPG, PNG, ?</p>
          <p className='textEditData'>[Hier kommt die Dropzone hin]</p>
          <Button className="buttons" style={{color:'#2F3747', width:"120px"}} variant="text">Upload</Button>
        </Paper>
        <Paper className="changeModel">
          <h3 id='titleChangeModel'>Change model selection</h3>
          <p className='textEditData'>Read more about our models here</p>
          <div id='changeModelSelectionButtons'>
            <Button className="buttonsModel" style={{color:'#2F3747', width:"200px"}} variant="outlined">Fast AI</Button>
            <Button className="buttonsModel" style={{color:'#2F3747', width:"200px"}} variant="outlined">Nunet</Button>
            <Button className="buttons" style={{color:'#2F3747', width:"120px"}} variant="text">select</Button>
          </div>
        </Paper>
        <Box className="downloadReportAgain">
          <h3>Download Report</h3>
          <p>Report downloaded with [model] chosen</p>
        </Box>
        <Box className="evaluateAgain">
          <h3>Evaluation</h3>
          <Button className="buttons" style={{color:'#2F3747', borderColor: '#2F3747'}} variant="outlined" href='/evaluation'>Evaluate the project</Button>
        </Box>
      </div>
    </div>
  )
}