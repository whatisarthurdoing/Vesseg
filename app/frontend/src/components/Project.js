import React, { useState } from 'react'
import {Paper, Box, TextField, Button} from '@mui/material';

import './CSS/Project.css'
import { useParams } from 'react-router-dom';



export default function Project() {

  const [token, ] = useState(localStorage.getItem("myToken"));

  const {id} = useParams();
  const {name} = useParams();
  const [title, setTitle] = useState({name});
  const [projectId, setProjectId] = useState({id});

  const patchProject = () => {
    const requestOptions = {
      method: "PATCH", 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: "Bearer " + token
      }, 
      body: JSON.stringify({
        "title": title
      })
    };
    console.log(requestOptions);
    try{
      const element = id;
      const text = "/projects/id"
      const fetcher = text.replace("id", element)
      console.log(fetcher)
      fetch(fetcher, requestOptions)
      .then(console.log(response => response.json()));
      //.then(response => response.json())
      //.then(data => setTitle(data.title));
    }
    catch(e){
      console.log(e);
    }
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
      <h1>{ name }</h1>
      <div className='allContent'>
        <Paper className='changeProjectName'>
          <h3>Change project name</h3>
          <TextField
            label="Name"
            type="text"
            variant='standard'
            onChange={(v) => validate(v.target.value)}
          />
          <Button className="buttons" style={{color:'#2F3747'}} variant="contained" onClick={patchProject}>Change project name</Button>
        </Paper>
        <Box className="changeUploadData">
          <h3>Upload Data</h3>
          <p>Upload your image data here. The following types are accepted: JPG, PNG, ?</p>
          <p>[Hier kommt die Dropzone hin]</p>
          <Button className="buttons" style={{color:'#2F3747', width:"120px"}} variant="contained">Upload</Button>
        </Box>
        <Box className="changeModel">
          <h3>Choose a model</h3>
          <p>Read more about our models here</p>
          <Button className="buttons" style={{color:'#2F3747', width:"200px"}} variant="contained">Fast AI</Button>
          <Button className="buttons" style={{color:'#2F3747', width:"200px"}} variant="contained">Nunet</Button>
          <Button className="buttons" style={{color:'#2F3747', width:"120px"}} variant="contained">Next</Button>
        </Box>
        <Box className="downloadReportAgain">
          <h3>Download Report</h3>
          <p>We will send you a report with all important data to your registered E-Mail adress.</p>
          <Button className="buttons" style={{backgroundColor:'#2F3747', width:"fit-content"}} variant="contained">Yes, send me the report</Button>
          <Button className="buttons" style={{color:'#2F3747', width:"200px"}} variant="text">No thanks, I'm good</Button>
        </Box>
        <Box className="evaluateAgain">
          <h3>Evaluation</h3>
          <Button className="buttons" style={{color:'#2F3747', borderColor: '#2F3747'}} variant="outlined" href='/evaluation'>Evaluate the project</Button>
        </Box>
      </div>
    </div>
  )
}