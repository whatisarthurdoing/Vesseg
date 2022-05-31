import React, { useState } from 'react'
import "./CSS/Main.css";
import { FormControl, TextField, Button} from '@mui/material';
import { Link } from 'react-router-dom';
//import CopyrightIcon from '@mui/icons-material/Copyright';
//import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/*
const Title = () => {
    const [title, setTitle] = useState("Click here");
    return <h1 onClick={() => setTitle("Hat geklappt")}>{title}</h1>;
}

function formular(){
    const [title, setTitle] = useState("Sign in");
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [button, setButton] = useState();
    const [alternative, setAlternative] = useState();
}
*/
export default function Main() {
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
                <h2>Sign in</h2>
                <FormControl>
                    <TextField margin='dense' id="filled-textarea" label="E-Mail *" placeholder='E-Mail *' multilinevariant="filled"/>
                    <TextField margin='dense' id="filled-textarea" label="Password *" placeholder='Password *' multilinevariant="filled"/>
                    <Button style={{backgroundColor:'#2F3747'}} variant="contained">SIGN IN</Button>
                    <div className='alternative'>
                        <Link to='/forgotpassword'>Forgot password?</Link>
                        <Link to="/">Don't have an account? Sign Up</Link>
                    </div>
                    <p>Copyright IKIM 2022</p>
                </FormControl>
            </div>
        </div>
    </div>
  )
}
