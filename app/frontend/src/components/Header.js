import { AppBar, Toolbar, Typography, Button} from "@mui/material";
import React, {useState} from "react";
import { Link as RouterLink } from "react-router-dom";

import './CSS/Header.css'


const headersDataLoggedOut = [
  {
    label: "About", 
    href: "/about", 
  },
];

const headersDataLoggedIn = [
  {
    label: "Projects", 
    href: "/projects",
  },
  {
    label: "About", 
    href: "/about", 
  }, 
  {
    label: "FAQ", 
    href: "/faq",
  },
  {
    label: "settings", 
    href: "/settings",
  },
];

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
  const isAuthenticated = () => {
    const [token, setToken ] = useState(localStorage.getItem("myToken"));

    let headerToShow = headersDataLoggedIn;

    if(token === "null"){
      headerToShow = headersDataLoggedOut;
      return headerToShow;
    }
    return headerToShow;
  };

  const getMenuButton = () => {

    const authenticator = isAuthenticated();

    return authenticator.map(({ label, href }) => {
        return ( 
            <Button
                {...{
                    key: label, 
                    color: "inherit", 
                    to: href, 
                    component: RouterLink
                }}
            >
                {label}
            </Button>
        );
    });
  };

  return (
    <header>
      <AppBar style ={{backgroundColor:'#2F3747'}} position="sticky">{displayDesktop()}</AppBar>
    </header>
  );
}