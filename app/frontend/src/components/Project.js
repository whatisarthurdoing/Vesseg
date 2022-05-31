import React from 'react'
import './CSS/Project.css'

import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

export default function Project() {
  return (
    <div className='project'>
        <h1>Projects</h1>
        <h2>Create Project</h2>
        <div className='createProject'>
          <TextField
            id="outlined-password-input"
            label="Name"
            type="name"
            autoComplete="current-password"
          />
          <Button style={{backgroundColor:'#2F3747'}} variant="contained">Create Project</Button>
        </div>
        <div className='uploadData'>
          <h2>Upload Data</h2>
          <p>Upload your image data here. The following types are accepted: JPG, PNG, ?</p>
          <p>[Hier kommt eine Dropzone hin]</p>
        </div>
        <div className='chooseModel'>
          <h2>Choose a model</h2>
          <p>Read more about our models here</p>
          <Button style={{backgroundColor:'#2F3747'}} variant="contained">Fast AI</Button>
          <Button style={{color:'#2F3747'}} variant="text">Nunet</Button>
        </div>
        <div className='predict'>
          <h2>Predict</h2>
        </div>
        <div className='downloadReport'>
          <h2>Download Report</h2>
          <p>We will send you a report with all important data to your registered E-Mail adress.</p>
          <Button style={{backgroundColor:'#2F3747'}} variant="contained">Yes, send me the report</Button>
          <Button style={{color:'#2F3747'}} variant="text">No thanks, I'm good</Button>
        </div>
        <div className='evaluation'>
          <Button className='evaluationButton' style={{color:'#2F3747', borderColor: '#2F3747'}} variant="outlined" href='/evaluation'>Evaluate the project</Button>
        </div>
    </div>
  )
}

// Dropzone ist fuer material ui nur geplant