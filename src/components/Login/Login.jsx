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
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import emailjs from "@emailjs/browser";
import style from "./login.module.css";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export default function Login() {
  const [error, setError] = useState({});
  const [users, setUsers] = useState({ email: "", password: ""});


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginRegisterErrors = useSelector((state) => state.loginRegisterErrors);
  console.log("loginRegisterErrors", loginRegisterErrors);

  const successLogin = useSelector((state) => state.successLogin);
  console.log("successLogin", successLogin);

  const logginIn = useSelector((state) => state.logginIn);
  console.log("logginIn", logginIn);
  const actualPath = useSelector((state) => state.actualPath);
  console.log("actualPath", actualPath);
  const handleChange = (event) => {
    setUsers({
      ...users,
      [event.target.name]: event.target.value,
    });
  };

  function handleError() {}

  function handleSuccess(credentials) {
    if (credentials.credential) {
      console.log("credentials.credential",credentials.credential)
      console.log("credentials",credentials)

      dispatch(googleRegisterUser(credentials));
      navigate("/");
    
    }

  }
  
  //LOGIN LOCAL CON PASS Y EMAIL
  async function login (event) {
    event.preventDefault();
    dispatch(loading());
    
    await dispatch(localLogin(users));
    console.log("users",users);
    if(localStorage.userId){
      navigate("/");
      
    } alert("Necesita loguarse")
    console.log("users",users);
  }
  

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Box>
      <Box
        style={{ padding: "40px" }}
        sx={({ boxShadow: 3 }, { bgcolor: "white" })}
      >
        {!localStorage.userLogin === true ? (
          <Box>
            <Typography variant="h4">Bienvenido</Typography>
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
                  <Link to={"/login/recuperacion"} sx={{mt:2}}>
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
                      ¿No estás registrado? Regístrate aquí!⬅
                    </Typography>
                  </Link>
                </Box>
              </Box>
            ) : (
              <Box className={style.box}>
                <Box className={style.shadow}></Box>
                <Box className={style.gravity}>
                  <Box className={style.ball}></Box>
                </Box>
              </Box>
            )}
            {loginRegisterErrors ? (
              <Typography color="red" sx={{ mt: 2 }}>
                {loginRegisterErrors.message}
              </Typography>
            ) : null}
          </Box>
        ) : actualPath ? (
          null
        ) : (
        null
        )}
        <Box>
          <GoogleLogin
            useOneTap
            onError={handleError}
            onSuccess={handleSuccess}
          />
        </Box>
        <Typography>{successLogin}</Typography>
      </Box>
      </Box>
    </GoogleOAuthProvider>
  );
}
