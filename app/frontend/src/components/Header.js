import { AppBar, Toolbar, Typography, Button, Link} from "@mui/material";
import React, {useContext, useState} from "react";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import LinearProgress from "@mui/material/LinearProgress";
import DeleteIcon from '@mui/icons-material/Delete';

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

  /*
    Tasks 
  */
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Buttons: Projects, Tasks, About, FAQ and Settings
  // Plus task dialog
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
          >
            Projects
          </Button>
          <Button
            sx={{
              '&:active': {
                color: '#db7093',
                backgroundColor: '#2F3747'
              }, 
              color: '#ffffff',
              backgroundColor: '#2F3747'
            }}
            onClick={handleClickOpen}
            id="taskButton"
          >
            Tasks
          </Button>
          <Dialog 
            fullScreen
            open={open}
            onClose={handleClose}
          >
            <AppBar sx={{ position: 'relative', backgroundColor:"#db7093" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Tasks
                </Typography>
              </Toolbar>
            </AppBar>
            <List>
              <ListItem button>
                <ListItemText primary="Taskname 1"/>
                <ListItemText edge="center"><LinearProgress value={100} /></ListItemText>
                <IconButton edge="end" aria-label="delete"><DeleteIcon/></IconButton>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary="Taskname 2"/>
                <ListItemText edge="center"><LinearProgress value={100} /></ListItemText>
                <IconButton edge="end" aria-label="delete"><DeleteIcon/></IconButton>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary="Taskname 3"/>
                <ListItemText edge="center"><LinearProgress value={100} /></ListItemText>
                <IconButton edge="end" aria-label="delete"><DeleteIcon/></IconButton>
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText primary="Taskname 4"/>
                <ListItemText edge="center"><LinearProgress value={100} /></ListItemText>
                <IconButton edge="end" aria-label="delete"><DeleteIcon/></IconButton>
              </ListItem>
            </List>
          </Dialog>
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