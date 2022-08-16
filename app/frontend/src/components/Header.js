import { AppBar, Toolbar, Typography, Button, Link} from "@mui/material";
import React, {useContext, useState} from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import './CSS/Header.css'
import { UserContext } from '../context/UserContext';

export default function Header() {
  const displayDesktop = () => {
    return (
      <Toolbar className="toolbar">
        {vessegLogo}
        {getMenuButton()}
      </Toolbar>
    );
  };


  const vessegLogo = (
    <Button href="/" color="inherit">
      <Typography variant="h6" component="h1">VESSEG</Typography>
    </Button>
  );

  const [flag, setFlag] = useState(true);

  const getMenuButton = () => {

    const [token,] = useContext(UserContext);

    if (token === null){
      return(
        <Button href="/about" sx={{color: flag ? "inherit" : "primary"}} onClick={ () => setFlag(!flag)}>About</Button>
      );
    }
    else{
      return(
        <div id="contentButtons">
          <Button href="/projects" color={flag ? "inherit" : "primary"} onClick={ () => setFlag(!flag)}>Projects</Button>
          <Button href="/about" color={flag ? "inherit" : "primary"} onClick={ () => setFlag(!flag)}>About</Button>
          <Button href="/faq" color={flag ? "inherit" : "primary"} onClick={ () => setFlag(!flag)}>FAQ</Button>
          <Link href="/settings" onClick={ () => setFlag(!flag)} color={flag ? "inherit" : "primary"} ><SettingsOutlinedIcon/></Link>
        </div>
      );
    }
  };

  return (
    <header id="header">
      <AppBar style ={{backgroundColor:'#2F3747'}} position="sticky">{displayDesktop()}</AppBar>
    </header>
  );
}