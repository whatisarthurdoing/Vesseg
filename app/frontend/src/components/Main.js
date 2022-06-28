import React, { useContext, useState, useCallback} from 'react'
import { FormControl, TextField, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import validator from 'validator';

import "./CSS/Main.css";
import { UserContext } from '../context/UserContext';

//import CopyrightIcon from '@mui/icons-material/Copyright';
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';




export default function Main() {

    //Start: Change form on click
    function useToggle( initialValue = false){
        const [value, setValue] = useState(initialValue)

        const toggle = useCallback(() => {
        setValue(v => !v);
        }, []);
        return [value, toggle];
    }

    const [isOn, toggleIsOn ] = useToggle();

    const [formSignIn, ] = useState({
        title: "Sign In",
        name: true, 
        email: true,
        confirmPassword: true, 
        button: "SIGN IN",
        forgotPassword: "Forgot password?", 
        confirmAccount: "Don't have an account? Sign Up"
    });
    const [formSignUp, ] = useState({
        title: "Sign Up", 
        name: true,
        email: false, 
        confirmPassword: false, 
        button: "SIGN UP", 
        forgotPassword: "Forgot password?", 
        confirmAccount: "Have an Account already? Sign in"
    });
    //End: Change form on click


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);
        

    const submitRegistration = () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: name, password: password, email: email})
        }

        const response = fetch("/users/", requestOptions);
        const data = response
        if (!response.ok){
            setErrorMessage(data.detail);
        }
        else{
            setToken(data.access_token);
        }
    }
  
    const submitLogin = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
        body: JSON.stringify(
          `grant_type=&username=${name}&password=${password}&scope=&client_id=&client_secret=`
        ),
      };
  
      const response = await fetch("/login", requestOptions);
      console.log(response);
      const data = await response.json();
  
      if (!response.ok) {
        setErrorMessage(data.detail);
      } else {
        setToken(data.access_token);
      }
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        if (isOn){
            if (password === confirmPassword && password.length > 7 && validator.isEmail(email)){
                submitRegistration();
            }
            else{
                setErrorMessage("Ensure that the passwords match and greater than seven characters");
            }
        }
        else{
            submitLogin();
        }
    };





    return (
        <div className='main'>
            <div className='split left'>
                <div className='centered'>
                    <h2>This is vesseg, a tool to speed up atherosclerosis research.</h2>
                    <p>
                    Its is being developed by the Computational Radiology Group at the German Cancer Research Center (DKFZ) in Heidelberg, Germany,
                    in collaboration with the Research Group for Perioperative Vascular Biology at the Clinic for Anaesthesiology
                    at the University Hospital Heidelberg and the Institute for Artificial Intelligence in Medicine (IKIM) at the University Hospital Essen.
                    </p>
                </div>
            </div>

            <div className='split right'>
                <div className='centered'>
                    <h2 className='titleRight'>{isOn ? formSignIn.title : formSignUp.title}</h2>
                    <FormControl onSubmit={handleSubmit}>
                        <TextField 
                            className="form" 
                            required={true}
                            margin='dense' 
                            label='Name' 
                            placeholder='Name' 
                            multilinevariant='filled' 
                        />
                        <TextField 
                            className="form" 
                            required={true}
                            margin='dense' 
                            label="E-Mail" 
                            input = "email" 
                            placeholder='E-Mail' 
                            multilinevariant="filled"
                            disabled = {isOn ? formSignIn.email : formSignUp.email}
                        />
                        <TextField 
                            className="form" 
                            required={true}
                            margin='dense'
                            label="Password" 
                            placeholder='Password' 
                            multilinevariant="filled"
                        />
                        <TextField 
                            className="form" 
                            required={true}
                            margin='dense' 
                            label="Confirm" 
                            placeholder='Confirm password' 
                            multilinevariant="filled" 
                            disabled={isOn ? formSignIn.confirmPassword : formSignUp.confirmPassword}
                        />
                        <Button className="form" style={{backgroundColor:'#2F3747'}} variant="contained" type="submit">{isOn ? formSignIn.button : formSignUp.button}</Button>
                        <div className='alternative'>
                            <Link to='/forgotpassword'>{isOn ? formSignIn.forgotPassword : formSignUp.forgotPassword}</Link>
                            <Link 
                            to="/"
                            onClick={toggleIsOn}
                            >
                            {isOn ? formSignIn.confirmAccount : formSignUp.confirmAccount}
                            </Link>
                        </div>
                        <p>Copyright IKIM 2022</p>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}
