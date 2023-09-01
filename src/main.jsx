import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#fb731c',
      light: '#ff9b00',
      dark: '#b27400',
      contrastText: 'rgba(255,251,251,0.87)',
    },
    secondary: {
      main: '#f50057',
    },
    warning: {
      main: '#fffc00',
    },
  },})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
