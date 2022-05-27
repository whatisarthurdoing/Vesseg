import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import React from 'react'

export default function User() {
  return (
    <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
    >
        <h1>User</h1>
        <h2> Create User</h2>
        <div>
            <TextField
                id="outlined-password-input"
                label="Name"
                type="name"
                autoComplete="current-password"
            />
        </div>
        <Button variant="contained">Create User</Button>
        <h2> List all current users</h2>
        <Button variant="contained">List all current users</Button>
    </Box>
  )
}
