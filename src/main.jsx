/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import store from "./redux/store.js";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://backend-adipweb.onrender.com";
ReactDOM.createRoot(document.getElementById("root")).render(
   <Provider store={store}>
      <HashRouter>
         <React.StrictMode>
            <App />
         </React.StrictMode>
      </HashRouter>
   </Provider>
);
