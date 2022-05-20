import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";

import { RequireToken } from "./Auth";


function App() {

   // new line start
  const [profileData, setProfileData] = useState(null)

  function getData() {
    axios({
      method: "GET",
      url:"/profile",
    })
    .then((response) => {
      const res =response.data
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}
    //end of new line 

  return (
    <div className ="App">
    <Routes>
      <Route path="/" element = {<Login/>}/>
      <Route path="/profile" element = {
        <RequireToken>
          <Profile/>
        </RequireToken>
      }/>
    </Routes>
    </div>
  );
}

export default App;

