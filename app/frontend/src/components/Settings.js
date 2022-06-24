import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import './CSS/Settings.css'

export default function Settings() {

  const [token, setToken ] = useState(localStorage.getItem("myToken"));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);

  const deleteUser = () => {
    const requestOptions = {
      method: "DELETE", 
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + token,
      }
    };
    try{
      fetch('/users/', requestOptions)
      .then(() => setStatus('Delete successful'));
    }
    catch(e){
      console.log(e);
    }
  };


  const editName = () => {
    const requestOptions = {
      method: "PATCH", 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: "Bearer " + token
      }, 
      body: JSON.stringify({
        "username": name
      })
    };
    try{
      fetch('/users/', requestOptions)
      .then(response => response.json())
      .then(data => setName(data.name));
    }
    catch(e){
      console.log(e);
    }
  };
  const editEmail = () => {
    const requestOptions = {
      method: "PATCH", 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: "Bearer " + token
      }, 
      body: JSON.stringify({
        "email": email
      })
    };
    try{
      fetch('/users/', requestOptions)
      .then(response => response.json())
      .then(data => setEmail(data.email));
    }
    catch(e){
      console.log(e);
    }
  };
  const editPassword = () => {
    const requestOptions = {
      method: "PATCH", 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: "Bearer " + token
      }, 
      body: JSON.stringify({
        "password": password
      })
    };
    try{
      fetch('/users/', requestOptions)
      .then(response => response.json())
      .then(data => setPassword(data.password));
    }
    catch(e){
      console.log(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("myToken")
  }

/*
  TODO: 
  1. Email-Feld validieren
  2. Password-Feld Augen-Icon hide/show password
  3. Error Messages
*/
  return (
    <div className='settings'>
      <h1>Settings</h1>
      <Button className='deleteUser'  href='/' style={{color:'red', width:"200px"}} variant="text" onClick={deleteUser}>Delete Profile</Button>
      <div className='editUsername'>
          <TextField
            label="Name"
            type="text"
            variant='standard'
            onChange={(v) => setName(v.target.value)}
          />
          <Button className='changeNameButton' style={{backgroundColor:'#2F3747'}} variant="contained" onClick={editName}>change username</Button>
      </div>
      <div className='editUseremail'>
          <TextField
            label="E-Mail"
            type="text"
            variant='standard'
            onChange={(v) => setEmail(v.target.value)}
          />
          <Button className='changeEmailButton' style={{backgroundColor:'#2F3747'}} variant="contained" onClick={editEmail}>change email</Button>
      </div>
      <div className='editPassword'>
          <TextField
            label="Password"
            type="password"
            variant='standard'
            onChange={(v) => setPassword(v.target.value)}
          />
          <Button className='changePasswordButton' style={{backgroundColor:'#2F3747'}} variant="contained" onClick={editPassword}>change password</Button>
      </div>
      <Button className='logout'  href='/' style={{color:'red', width:"200px"}} variant="text" onClick={handleLogout}>Log out</Button>
    </div>
  )
}
