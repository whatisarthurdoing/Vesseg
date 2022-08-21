import { AppBar, Toolbar, Typography, Button, Link} from "@mui/material";
import React, {useContext, useState} from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import './CSS/Header.css'
import { UserContext } from '../context/UserContext';

//TODO: Add "Task" buton between projects and about connected to full-screen dialog:
//https://mui.com/material-ui/react-dialog/


//TODO: add active color: rgb(219, 112, 147)/#db7093

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

  const [buttonColor, setButtonColor] = useState("secondary");
  const [flag, setFlag] = useState(true);

  /*
  const handleClick = () => {
    setFlag(!flag);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#db7093'
      }, 
      secondary:{
        main: '#ffffff'
      }
    }
  })
  */

  const getMenuButton = () => {

    const [token,] = useContext(UserContext);

    if (token === null){
      return(
        <Button 
          href="/about" 
          sx={{
            '&:active': {
              color: '#db7093',
              backgroundColor: '#2F3747'
            }, 
            color: '#ffffff',
            backgroundColor: '#2F3747'
          }}
        >
          About
        </Button>
      );
    }
    else{
      return(
        <div id="contentButtons">
          <Button 
            href="/projects" 
            sx={{
              '&:active': {
                color: '#db7093',
                backgroundColor: '#2F3747'
              }, 
              color: '#ffffff',
              backgroundColor: '#2F3747'
            }}
            //onClick={handleClick}
          >
            Projects
          </Button>
          <Button 
            href="/about" 
            sx={{
              '&:active': {
                color: '#db7093',
                backgroundColor: '#2F3747'
              }, 
              color: '#ffffff',
              backgroundColor: '#2F3747'
            }}
          >
            About
          </Button>
          <Button 
            href="/faq" 
            sx={{
              '&:active': {
                color: '#db7093',
                backgroundColor: '#2F3747'
              }, 
              color: '#ffffff',
              backgroundColor: '#2F3747'
            }}
          >
            FAQ
          </Button>
          <Link 
            href="/settings" 
            sx={{
              '&:active': {
                color: '#db7093',
                backgroundColor: '#2F3747'
              }, 
              color: '#ffffff',
              backgroundColor: '#2F3747'
            }}
          >
            <SettingsOutlinedIcon/>
          </Link>
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