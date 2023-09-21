// axios-config.js

import axios from "axios";

const instance = axios.create({
   /* baseURL: 'https://backend-adipweb.onrender.com' */ // Reemplaza esto con tu URL base
   baseURL: "http://localhost:3001",
});

export default instance;
