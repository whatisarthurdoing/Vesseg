import React from 'react'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

export default function Project() {


  return (
    <div>
        <h1>Projects</h1>
        <h2>Create Project</h2>
        <div>
            <TextField
                id="outlined-password-input"
                label="Name"
                type="name"
                autoComplete="current-password"
            />
        </div>
        <Button variant="contained">Create Project</Button>
        <h2>Upload Data</h2>
        <p>Upload your image data here. The following types are accepted: JPG, PNG, ?</p>
        <p>[Hier kommt eine Dropzone hin]</p>
        <h2>Choose a model</h2>
        <p>Read more about our models here</p>
        <Button variant="contained">Fast AI</Button>
        <Button variant="text">Nunet</Button>
        <h2>Predict</h2>
        <h2>Download Report</h2>
        <p>We will send you a report with all important data to your registered E-Mail adress.</p>
        <Button variant="contained">Yes, send me the report</Button>
        <Button variant="text">No thanks, I'm good</Button>
    </div>
  )
}

// Dropzone ist fuer material ui nur geplant