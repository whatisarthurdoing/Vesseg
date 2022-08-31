import React, { useContext, useState, useCallback, useRef} from 'react'
import {TextField, Button} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import Image from 'mui-image';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import "./CSS/Main.css";
import { UserContext } from '../context/UserContext';
import image from "../img/Logo.png";


/*
    Artefact, code that might be useful
*/

    // Eliminating all whitespaces in input
    //const text = inputText.replace(/\s+/g, '');

    /*  FORGOT PASSWORD
        <Link to='/forgotpassword'>{isOn ? formSignIn.forgotPassword : formSignUp.forgotPassword}</Link> 
    */




export default function Main() {
    /*
        Change form on click
    */
    function useToggle( initialValue ){
        const [value, setValue] = useState(initialValue)

        const toggle = useCallback(() => {
        setValue(v => !v);
        }, []);
        return [value, toggle];
    }

    const [isOn, toggleIsOn ] = useToggle(false);

    /*
        Content of forms
    */

    const [formSignIn, ] = useState({
        title: "Login",
        name: true, 
        email: true,
        confirmPassword: true, 
        button: "LOGIN",
        //forgotPassword: "Forgot password?", 
        confirmAccount: "Don't have an account? Sign up"
    });
    const [formSignUp, ] = useState({
        title: "Sign Up", 
        name: true,
        email: false, 
        confirmPassword: false, 
        button: "SIGN UP", 
        //forgotPassword: "Forgot password?", 
        confirmAccount: "Have an Account already? Log in"
    });

    const [, setToken] = useContext(UserContext);

    const [inputTextName, setInputTextName] = useState("");
    const [inputTextEmail, setInputTextEmail] = useState("");
    const [inputTextPassword, setInputTextPassword] = useState("");
    const [inputTextConfirm, setInputTextConfirm] = useState("");

    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirm, setErrorConfirm] = useState(false);

    const [helperTextName, setHelperTextName] = useState("");
    const [helperTextEmail, setHelperTextEmail] = useState("");
    const [helperTextPassword, setHelperTextPassword] = useState("");
    const [helperTextConfirm, setHelperTextConfirm] = useState("");
    const validity = useRef(true);
    
    const navigate = useNavigate();

    /*
        API calls for registration and login
    */

    const submitRegistration = async() => {
        if(validity.current){
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username: inputTextName, password: inputTextPassword, email: inputTextEmail})
            }
            const response = await fetch("/users/", requestOptions);
            const data = await response.json();
            if(!response.ok){
                setErrorName(true);
                setHelperTextName("Person already exists");
            }
            else{
                setToken(data.access_token);
                handleClickOpen();
            }
        }
    }
  
    const submitLogin = async() => {
        if(validity.current){
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded"},
                body: JSON.stringify(
                    `grant_type=&username=${inputTextName}&password=${inputTextPassword}&scope=&client_id=&client_secret=`
                ),
            };
            const response = await fetch("/login", requestOptions);
            const data = await response.json();
            if (!response.ok) {
                setErrorName(true);
                setHelperTextName("Person doesn't exist");
            }
            else {
                setToken(data.access_token);
                navigate("/projects");
            }
        }
    };
  
    const[flag, setFlag] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        //Registration
        if(!isOn){
            // If one validation fails, do not register user
            validateName(inputTextName);
            if (validity.current){
                validateEmail(inputTextEmail);
                if (validity.current){
                    validatePassword(inputTextPassword);
                    if (validity.current){
                        validateConfirm(inputTextConfirm);
                    }
                }
            }
            submitRegistration();
        }
        //Login
        else{
            // If one validation fails, do not log in user
            if(!flag){
                if (validity.current){
                    validateName(inputTextName);
                    if (validity.current){
                        validatePassword(inputTextPassword);
                    }
                }
            }
            setFlag(false);
            submitLogin();
        }
    };

    const [activeToken,] = useContext(UserContext);

    /*
        Components of registration
    */

    const emailComponent = <TextField 
                                className="form" 
                                required={true}
                                margin='dense' 
                                label="E-Mail" 
                                input = "email" 
                                placeholder='E-Mail' 
                                multilinevariant="filled"
                                disabled = {isOn ? formSignIn.email : formSignUp.email}
                                error={errorEmail}
                                helperText = {errorEmail ? helperTextEmail : ""}
                                onChange={(e) => setInputTextEmail(e.target.value)} 
                            />
    const confirmComponent = <TextField 
                                className="form" 
                                required={true}
                                margin='dense' 
                                label="Confirm" 
                                placeholder='Confirm password' 
                                type="password"
                                multilinevariant="filled" 
                                disabled={isOn ? formSignIn.confirmPassword : formSignUp.confirmPassword}
                                error={errorConfirm}
                                helperText = {errorConfirm ? helperTextConfirm : ""}
                                onChange={(e) => setInputTextConfirm(e.target.value)} 
                            />

    const EmailComponent = () => {
        if(!isOn){
            return emailComponent;
        }
    };
    const ConfirmComponent = () => {
        if(!isOn){
            return confirmComponent;
        }
    };

    /*
        Validation of all inputs
    */

    const validateName = (inputTextName) => {
        // Input is too short or too long
        if(inputTextName.length < 4 || inputTextName.length > 30){
            setHelperTextName("Name must be between 4 and 30 characters long");
            setErrorName(true);
            validity.current = false;
        }
        // Input is empty
        else if(inputTextName === ''){
            setHelperTextName("No whitespaces allowed");
            setErrorName(true);
            validity.current = false;
        }
        else{
            setErrorName(false);
            validity.current = true;
        }
    };

    const validateEmail = (inputTextEmail) => {
        // Input is not an e-mail
        if(validator.isEmail(inputTextEmail)){
            setErrorEmail(false);
            validity.current = true;
        }
        // Input is empty
        else if(inputTextEmail === ''){
            setHelperTextEmail("No whitespaces allowed");
            setErrorEmail(true);
            validity.current = false;
        }
        else{
            setHelperTextEmail("Email is not in the right format");
            setErrorEmail(true);
            validity.current = false;
        }
    };

    const validatePassword = (inputTextPassword) => {
        // Input is too short
        if(inputTextPassword.length > 7){
            setErrorPassword(false);
            validity.current = true;
        }
        // Input is empty
        else if(inputTextPassword === ''){
            setHelperTextPassword("No whitespaces allowed");
            setErrorPassword(true);
            validity.current = false;
        }
        else{
            setHelperTextPassword("Password must be at least 8 characters long");
            setErrorPassword(true);
            validity.current = false;
        }
    };

    const validateConfirm = (inputTextConfirm) => {
        // Input does not match password
        if(inputTextConfirm === inputTextPassword){
            setErrorConfirm(false);
            validity.current = true;
        }
        // Input is empty
        else if(inputTextConfirm === ''){
            setHelperTextConfirm("No whitespaces allowed");
            setErrorConfirm(true);
            validity.current = false;
        }
        else{
            setHelperTextConfirm("Confirm password doesn't match password");
            setErrorConfirm(true);
            validity.current = false;
        }
    };

    /*
        Dialog
    */

    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    // If user is not logged in already
    if (activeToken === null){
        return (
            <div className='main'>
                <div className='split left'>
                    <div className='centered'>
                        <h2 id='vessegTitle'>This is vesseg, a tool to speed up atherosclerosis research.</h2>
                        <p>
                        Its is being developed by the Computational Radiology Group at the German Cancer Research Center (DKFZ) in Heidelberg, Germany,
                        in collaboration with the Research Group for Perioperative Vascular Biology at the Clinic for Anaesthesiology
                        at the University Hospital Heidelberg and the Institute for Artificial Intelligence in Medicine (IKIM) at the University Hospital Essen.
                        </p>
                        <Image id="image" component='img' src={image} width={320} height={320}/>
                    </div>
                </div>
    
                <div className='split right'>
                    <div className='centered'>
                        <h2 className='titleRight'>{isOn ? formSignIn.title : formSignUp.title}</h2>
                        <form onSubmit={handleSubmit} id="mainForm">
                            <TextField 
                                className="form" 
                                required={true}
                                margin='dense' 
                                label='Name' 
                                placeholder='Name' 
                                multilinevariant='filled' 
                                error={errorName}
                                helperText = {errorName ? helperTextName : ""}
                                onChange={(e) => setInputTextName(e.target.value)} 
                            />
                            {EmailComponent()}
                            <TextField 
                                className="form" 
                                required={true}
                                margin='dense'
                                label="Password" 
                                type="password"
                                placeholder='Password' 
                                multilinevariant="filled"
                                error={errorPassword}
                                helperText = {errorPassword ? helperTextPassword : ""}
                                onChange={(e) => setInputTextPassword(e.target.value)} 
                            />
                            {ConfirmComponent()}
                            <Button className="form" style={{backgroundColor:'#2F3747'}} variant="contained" type="submit">{isOn ? formSignIn.button : formSignUp.button}</Button>
                            <div className='alternative'>
                                <Link 
                                to="/"
                                onClick={toggleIsOn}
                                >
                                {isOn ? formSignIn.confirmAccount : formSignUp.confirmAccount}
                                </Link>
                            </div>
                        </form>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogContent>
                                <DialogContentText>
                                    You are registered now. 
                                    Click on "Log in" to log in to your profile.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button style={{color: '#2F3747'}} onClick={handleClose}>Okay, cool</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }
    //if logged in, don't show login/registration form
    else{
        return(
            <div id = "mainLoggedIn">
                <h2 id='vessegTitleLoggedIn'>This is vesseg, a tool to speed up atherosclerosis research.</h2>
                <p id='textLoggedIn'>
                    Its is being developed by the Computational Radiology Group at the German Cancer Research Center (DKFZ) in Heidelberg, Germany,
                    in collaboration with the Research Group for Perioperative Vascular Biology at the Clinic for Anaesthesiology
                    at the University Hospital Heidelberg and the Institute for Artificial Intelligence in Medicine (IKIM) at the University Hospital Essen.
                </p>
            </div>
        )
    }
}
