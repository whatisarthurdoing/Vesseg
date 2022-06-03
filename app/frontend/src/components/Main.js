import React, { useState, useCallback } from 'react'
import "./CSS/Main.css";
import { FormControl, TextField, Button} from '@mui/material';
import { Link } from 'react-router-dom';
//import CopyrightIcon from '@mui/icons-material/Copyright';
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function checkEmail(){

}



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

    const [formSignIn, setFormSignIn] = useState({
        title: "Sign In",
        name: true, 
        confirmPassword: true, 
        button: "SIGN IN",
        forgotPassword: "Forgot password?", 
        confirmAccount: "Don't have an account? Sign Up"
    });
    const [formSignUp, setFormSignUp] = useState({
        title: "Sign Up", 
        name: false, 
        confirmPassword: false, 
        button: "SIGN UP", 
        forgotPassword: "Forgot password?", 
        confirmAccount: "Have an Account already? Sign in"
    });
    //End: Change form on click


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
                <h2>{isOn ? formSignIn.title : formSignUp.title}</h2>
                <FormControl>
                    <TextField required="true" margin='dense' label='Name' placeholder='Name' multilinevariant='filled' disabled = {isOn ? formSignIn.name : formSignUp.name}/>
                    <TextField required="true" margin='dense' label="E-Mail" inputProps = "email" placeholder='E-Mail' multilinevariant="filled"/>
                    <TextField required="true" margin='dense' label="Password" placeholder='Password' multilinevariant="filled"/>
                    <TextField required="true" margin='dense' label="Confirm" placeholder='Confirm password' multilinevariant="filled" disabled={isOn ? formSignIn.confirmPassword : formSignUp.confirmPassword}/>
                    <Button style={{backgroundColor:'#2F3747'}} variant="contained">{isOn ? formSignIn.button : formSignUp.button}</Button>
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
