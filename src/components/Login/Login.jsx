/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getHistory,
  googleRegisterUser,
  loading,
  localLogin,
} from "../../redux/login-registerActions/loginActions";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Container,
  Stack,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import emailjs from "@emailjs/browser";
import { ignore } from "@cloudinary/url-gen/qualifiers/rotationMode";
import './login.css'
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export default function Login() {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState();
   const [users, setUsers] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginRegisterErrors = useSelector((state) => state.loginRegisterErrors);


  const successLogin = useSelector((state) => state.successLogin);


  const logginIn = useSelector((state) => state.logginIn);

  const actualPath = useSelector((state) => state.actualPath);

  const handleChange = (event) => {
    setUsers({
      ...users,
      [event.target.name]: event.target.value,
    });
  };

  function handleError() {}

  function handleSuccess(credentials) {
    if (credentials.credential) {

      dispatch(googleRegisterUser(credentials));
      dispatch(localLogin())
      navigate("/");
    }
  }
  //LOGIN LOCAL CON PASS Y EMAIL
  async function login(event) {
    event.preventDefault();

   const data = await dispatch(localLogin(users));

   if(data.access_token){
    navigate('/')
   } 
  }
  return (
    <div className="loginContainer">
      <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Box style={{ padding: "40px" }} sx={{ boxShadow: 3, bgcolor: "white" }}>
       
          <Box >
            <Typography variant="h4" textAlign={'center'}>Bienvenido</Typography>
            {!logginIn ? (
              <Box>
                <Box component="form" onSubmit={login}>
                  <Box>
                    <TextField
                      label="Usuario:"
                      name="email"
                      value={users.email}
                      type="email"
                      placeholder="Email..."
                      onChange={handleChange}
                      sx={{ mt: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {error.email ? (
                      <Typography color="red" sx={{ mt: 1 }}>
                        {error.email}
                      </Typography>
                    ) : null}
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <TextField
                      label="Contraseña:"
                      name="password"
                      onChange={handleChange}
                      value={users.password}
                      type="password"
                      placeholder="Contraseña..."
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
                    Iniciar sesión
                  </Button>
                </Box>

                <Box>
                  <Link to={"/login/recuperacion"} sx={{ mt: 2 }}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Box>
                <Box>
                  <Link to="/login/SignUp">
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ mt: 1 }}
                    >
                      ¿No estás registrado? Haz click aquí⬅️
                    </Typography>
                  </Link>
                </Box>
                <Box>
          <GoogleLogin
            useOneTap
            onError={handleError}
            onSuccess={handleSuccess}
          />
        </Box>
              </Box>
              
            ) : (<div className="loaderLoginContainer">
              <Box className="box">
                <Box className="shadow"></Box>
                <Box className="gravity">
                  <Box className="ball"></Box>
                </Box>
              </Box>
            </div>
              
            )}
            {loginRegisterErrors ? (
              <Typography color="red" sx={{ mt: 2 }}>
                {loginRegisterErrors.message}
              </Typography>
            ) : null}
          </Box>
      
        <Typography>{successLogin}</Typography>
      </Box>
      
    </GoogleOAuthProvider>
    </div>
  );
}
