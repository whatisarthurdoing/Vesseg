import { AppBar, Toolbar, Typography, Button} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

//TODO: Dynamic change depending on login status
const headersData = [
    {
        label: "Projects", 
        href: "/projects",
    },
    {
        label: "About", 
        href: "/about", 
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

  const getMenuButton = () => {
    return headersData.map(({ label, href }) => {
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