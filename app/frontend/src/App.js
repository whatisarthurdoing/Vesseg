import React from 'react';
import { Routes, Route } from "react-router-dom";
import Project from "./components/Project";
import Settings from './components/Settings';
import Impressum from './components/Impressum';
import FAQ from './components/FAQ';
import About from './components/About';
import Projects from './components/Projects';
import Header from './components/Header';
import Evaluation from './components/Evaluation';
import Main from './components/Main';
import Footer from './components/Footer';
import Register from './components/Register';

function App() {
  return (
    <div className ="App">
      <div className='header'>
        <Header/>
      </div>
      <div className='routes'>
        <Routes>
          <Route path="/" element = {<Main/>}/>
          <Route path="/project" element = {<Project/>}/>
          <Route path='/settings' element = {<Settings/>}/>
          <Route path='/impressum' element = {<Impressum/>}/>
          <Route path='/faq' element = {<FAQ/>}/>
          <Route path='/about' element = {<About/>}/>
          <Route path='/projects' element = {<Projects/>}/>
          <Route path='/evaluation' element = {<Evaluation/>}/>
          <Route path='/register' element = {<Register/>}/>
        </Routes>
      </div>
      <div className='footer'>
        <Footer/>
      </div>
    </div>
  );
}

export default App;

