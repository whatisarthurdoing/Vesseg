import { AppBar, Toolbar, Typography} from "@mui/material";
//import {SxProps} from "@mui/material/styles";
import React from "react";

/*
const style = {
  header: {
    backgroundColor: "#2F3747",
  },
  logo: {
    color: "#FFFEFE",
    textAlign: "left",
  },
};
*/

export default function Header() {
  //const { header, logo } = style();

  const displayDesktop = () => {
    return <Toolbar>{vessegLogo}</Toolbar>;
  };
// className={logo}
  const vessegLogo = (
    <Typography variant="h6" component="h1">
      VESSEG
    </Typography>
  );
// className={header}
  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}