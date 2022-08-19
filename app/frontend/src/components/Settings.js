import React, { useContext, useState, useRef } from 'react';
import { Button, TextField, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import './CSS/Settings.css';
import { UserContext } from '../context/UserContext';

export default function Settings() {

  const [token, setToken] = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setStatus] = useState(null);

  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [helperTextName, setHelperTextName] = useState("");
  const [helperTextEmail, setHelperTextEmail] = useState("");
  const [helperTextPassword, setHelperTextPassword] = useState("");

  const [inputTextName, setInputTextName] = useState("");
  const [inputTextEmail, setInputTextEmail] = useState("");
  const [inputTextPassword, setInputTextPassword] = useState("");

  const validity = useRef(false);
  const navigate = useNavigate();

  const validateName = (inputText) => {
    // Input is too short or too long
    if(inputText.length < 4 || inputText.length > 30){
      setHelperTextName("Name must be between 4 and 30 characters long");
      setErrorName(true);
      validity.current = false;
    }
    //Input is empty
    else if(inputText === ''){
      setHelperTextName("No whitespaces allowed");
      setErrorName(true);
      validity.current = false;
    }
    else{
      setErrorName(false);
      validity.current = true;
      editName();
    }
  }
  
  const validateEmail = (inputText) => {
    const text = inputText.replace(/\s+/g, '');
    //Validate if input of email has email format
    if(validator.isEmail(text)){
      setEmail(text);
      setErrorEmail(false);
      validity.current = true;
      editEmail();
    }
    //Input is empty
    else if(text === ''){
      setHelperTextEmail("No whitespaces allowed");
      setErrorEmail(true);
      validity.current = false;
    }
    else{
      setHelperTextEmail("Email is not in the right format");
      setErrorEmail(true);
      validity.current = false;
    }
  }
  const validatePassword = (inputText) => {
    const text = inputText.replace(/\s+/g, '');
    //Password doesn't have the right length of min. 8 characters
    if(inputTextPassword.length > 7){
      setPassword(text);
      setErrorPassword(false);
      validity.current = true;
      editPassword();
    }
    //Input is empty
    else if(text === ''){
      setHelperTextPassword("No whitespaces allowed");
      setErrorPassword(true);
      validity.current = false;
    }
    else{
      setHelperTextPassword("Password must be at least 8 characters long");
      setErrorPassword(true);
      validity.current = false;
    }
  }
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
        "username": inputTextName
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
    handleLogout();
    navigate("/");
  };

  const editEmail = () => {
    const requestOptions = {
      method: "PATCH", 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: "Bearer " + token
      }, 
      body: JSON.stringify({
        "email": inputTextEmail
      })
    };
          console.log(requestOptions);
    try{
      fetch('/users/', requestOptions)
      .then(response => response.json())
      .then(data => setEmail(data.email));
    }
    catch(e){
      console.log(e);
    }
    handleLogout();
    navigate("/");
  };

  const editPassword = () => {
    const requestOptions = {
      method: "PATCH", 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: "Bearer " + token
      }, 
      body: JSON.stringify({
        "password": inputTextPassword
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
    handleLogout();
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("myToken")
  }
  
  return (
    <div className='settings'>
      <h1>Settings</h1>
      <Paper className='paper'>
        <h3 id='editUser'>Edit User</h3>
        <div id="textEditUser">
          <p>Please notice, that if you change any of your data, <br/> you will be logged out automatically and need to log in again.</p>
          <p>To ensure, that your projects processes will not be aborted, <br/> please wait until they are finished.</p>
        </div>
        <div className='editUsername'>
            <TextField
              label="Name"
              type="text"
              variant='standard'
              error = {errorName}
              helperText = {errorName ? helperTextName : " "}
              onChange={(v) => setInputTextName(v.target.value)}
            />
            <Button className='changeNameButton' style={{color:'#2F3747'}} variant="text" onClick={() => validateName(inputTextName)}>change username</Button>
        </div>
        <div className='editUseremail'>
            <TextField
              label="E-Mail"  
              type="text"
              variant='standard'
              error = {errorEmail}
              helperText = {errorEmail ? helperTextEmail : " "}
              onChange={(v) => setInputTextEmail(v.target.value)}
            />
            <Button className='changeEmailButton' style={{color:'#2F3747'}} variant="text" onClick={() => validateEmail(inputTextEmail)}>change email</Button>
        </div>
        <div className='editPassword'>
            <TextField
              label="Password"
              type="password"
              variant='standard'
              error = {errorPassword}
              helperText = {errorPassword ? helperTextPassword : " "}
              onChange={(v) => setInputTextPassword(v.target.value)}
            />
            <Button className='changePasswordButton' style={{color:'#2F3747'}} variant="text" onClick={() => validatePassword(inputTextPassword)}>change password</Button>
        </div>
        <Button className='deleteUser'  href='/' style={{color:'red', width:"200px"}} variant="text" onClick={deleteUser}>Delete Profile</Button>
      </Paper>
      <Button className='logout'  href='/' style={{color:'#2F3747', width:"200px"}} variant="text" onClick={handleLogout}>Log out</Button>
    </div>
  )
}
