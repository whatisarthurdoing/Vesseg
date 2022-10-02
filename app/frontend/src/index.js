import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';

import {UserProvider} from './context/UserContext';


const container = document.getElementById('root');
const root = createRoot(container);

const theme = createTheme({
  typography: {
    fontFamily: [
      'Helvetica',
      'Arial',
      'Nunito',
      'Roboto',
      'Helvetica Neue',
      'sans-serif'
    ].join(','),
  }
});

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </ThemeProvider>
)

