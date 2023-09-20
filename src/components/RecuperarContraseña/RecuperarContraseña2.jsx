/* eslint-disable no-unused-vars */
import { v4 as uuidv4 } from "uuid";
import emailjs from "@emailjs/browser";
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserByEmail,
  updateUser,
} from "../../redux/usersActions/usersActions";

export default function RecuperarContraseñas() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [emailRecuperacion, setEmailRecuperacion] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [codigoVerificacionGenerado, setCodigoVerificacionGenerado] = useState("");
  const [password, setPassword] = useState({ value1: "", value2: "" });
  const [newPassword, setNewPassword] = useState(false);
  console.log("password", password);

  const user = useSelector((state) => state.verificacionDeUsuario);
  console.log("user ===>",user);
  const message = useSelector(
    (state) => state.mensajeDeVerificacionDeContraseña
  );

  //! Manejo de boton de cambio de contraseña
  const handleChange = (e) => {
    setEmailRecuperacion(e.target.value) 
    
  };

  const handleChangePassword = (e) => {
    setPassword({...password, [e.target.name]: e.target.value})
  }
    
  const handleChangeVerificationCode = (e) => {
    setCodigoVerificacion(e.target.value);
  };


  const handlerSendEmail = () => {
    if (/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(emailRecuperacion)) {
      console.log("correo dentro de la funcion", emailRecuperacion);
      dispatch(getUserByEmail(emailRecuperacion));

      const codigoRecuperacion = Math.floor(Math.random() * (9999 - 1000) + 1000 ) + "";


        setCodigoVerificacionGenerado(codigoRecuperacion);

      emailjs.send(
        "service_8c6uo6a",
        "template_p35w6dm",
        { 
          asunto: " Recuperación de Contraseña - Código de Verificación",
          to_email: emailRecuperacion, 
          contexto: "Código de Verificación de A.D.I.P",
          mensaje: "Hemos recibido tu solicitud para restablecer la contraseña de tu cuenta en A.D.I.P. Para que puedas recuperar el acceso, te proporcionamos el código de verificación:" ,
          verification_code:  codigoRecuperacion,
          footer: `Utiliza este código en nuestra página de recuperación de contraseña para crear una nueva contraseña segura y acceder nuevamente a tu cuenta ${<br/>} Recuerda que este código de verificación es válido por un tiempo limitado, así que te recomendamos utilizarlo cuanto antes. Si no solicitaste esta acción o tienes alguna pregunta, por favor, contáctanos a través de Correo de Soporte.`
        },
        "LVu_qcdfDk8ci54aS"
      );
      setForgotPassword(true);
    } else {
      alert("Email invalido");
    }
  };

  const verificationCode = () => {
    console.log("user email:", user.email, "emailRecuperacion: ", emailRecuperacion);
    if(user.email == emailRecuperacion){
      console.log("codigoVerificacion: ", codigoVerificacion, "codigoGeneradoLocalmente :", codigoVerificacionGenerado );
    if (codigoVerificacion == codigoVerificacionGenerado) {
        
        setNewPassword(true)
      } else {
        alert("Datos incorrectos")
      }
    }else {
      alert("Usuario no registrado")
      navigate("/login")
    }
  }

  const handleSubmitUser = () => {
    if(password.value1 === password.value2){
      dispatch(updateUser(user.id, {password: password.value1}))
      alert("Contraseña actualizada")
      navigate("/login")
    } else {
      alert("Las constraseñas no coinciden")
    }
  }

  return (
    <Box
      component="form"
      sx={{
        boxShadow: 3,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        p: 1,
        m: 1,
        borderRadius: 2,
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: "700",
        padding: "40px",
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Recuperación de contraseña
      </Typography>

      <Box>
        <TextField
          label="ingrese su email"
          name="emailRecuperacion"
          value={emailRecuperacion}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
      </Box>
      <Button onClick={handlerSendEmail} variant="outlined" sx={{ mt: 2 }}>
        Enviar código de verificación
      </Button>
      {forgotPassword && (
        <Box>
          <Typography variant="body1" wrap="wrap" sx={{ mt: 2 }}>
            ✅ Correo enviado con éxito
          </Typography>
          <TextField
            type="text"
            label="Ingresé el codigo"
            value={codigoVerificacion}
            onChange={handleChangeVerificationCode}
            sx={{ mt: 2 }}
          />
          <Box>
            <Button
              variant="outlined"
              onClick={verificationCode}
              sx={{ mt: 2 }}
            >
              Verificar
            </Button>
          </Box>
        </Box>
      )}
      {newPassword && (
        <Box>
          <Box  sx={{mt: 2}} >
            <TextField
              type="password"
              label="Ingrese nueva contraseña"
              name="value1"
              value={password.value1}
              onChange={ handleChangePassword}
            />
          </Box>
          <Box sx={{mt: 2}}>
            <TextField
              type="password"
              label="Repita su contraseña"
              name="value2"
              value={password.value2}
              onChange={ handleChangePassword}
              
            />
          </Box>
          <Button onClick={handleSubmitUser} variant="outlined" sx={{ mt: 2 }}>
            Cambiar contraseña
          </Button>
        </Box>
      )}
    </Box>
  );
}
