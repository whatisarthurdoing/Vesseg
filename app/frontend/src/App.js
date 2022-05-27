import './App.css';

import { Routes, Route } from "react-router-dom";
import User from "./components/User";
import Project from "./components/Project";
import Settings from './components/Settings';
import Impressum from './components/Impressum';
import FAQ from './components/FAQ';
import About from './components/About';
import Projects from './components/Projects';
import Header from './components/Header';

function App() {
  return (
    <div className ="App">
      <Header/>
      <Routes>
        <Route path="/"/>
        <Route path="/user" element = {<User/>}/>
        <Route path="/project" element = {<Project/>}/>
        <Route path='/settings' element = {<Settings/>}/>
        <Route path='/impressum' element = {<Impressum/>}/>
        <Route path='/faq' element = {<FAQ/>}/>
        <Route path='/about' element = {<About/>}/>
        <Route path='/projects' element = {<Projects/>}/>
      </Routes>
    </div>
  );
}

export default App;

