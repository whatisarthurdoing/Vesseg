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
import CreateProject from './components/CreateProject';

function App() {
  return (
    <div className ="App">
      <div className='header'>
        <Header/>
      </div>
      <div className='routes'>
        <Routes>
          <Route path="/" element = {<Main/>}/>
          <Route path="/createProject" element = {<CreateProject/>}/>
          <Route path="/project/:id/:name" element = {<Project/>}/>
          <Route path='/settings' element = {<Settings/>}/>
          <Route path='/impressum' element = {<Impressum/>}/>
          <Route path='/faq' element = {<FAQ/>}/>
          <Route path='/about' element = {<About/>}/>
          <Route path='/projects' element = {<Projects/>}/>
          <Route path='/evaluation' element = {<Evaluation/>}/>
        </Routes>
      </div>
      <div className='footer'>
        <Footer/>
      </div>
    </div>
  );
}

export default App;

