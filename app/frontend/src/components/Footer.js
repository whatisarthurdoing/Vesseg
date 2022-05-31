import {Button} from "@mui/material";
import React from "react";
import './CSS/Footer.css';
import Image from 'mui-image';
import image from "../img/ikim.png";

export default function Footer() {
  return (
    <footer className="footer">
      <Button href="/impressum" color="inherit">
        Impressum
      </Button>
      <Button href="https://mml.ikim.nrw/">
        <Image className="image" component='img' src={image} width={200} height={40}/>
      </Button>
    </footer>
  );
}