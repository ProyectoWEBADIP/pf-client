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

export default function RecuperarContraseña() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [emailRecuperacion, setEmailRecuperacion] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [codigoVerificacionGenerado, setCodigoVerificacionGenerado] = useState("");
  const [password, setPassword] = useState({ value1: "", value2: "" });
  const [newPassword, setNewPassword] = useState(false);

  const user = useSelector((state) => state.verificacionDeUsuario);
  const message = useSelector(
    (state) => state.mensajeDeVerificacionDeContraseña
  );

  //! Manejo de boton de cambio de contraseña
  const handleChange = (e) => {
    setEmailRecuperacion(e.target.value);
  };

  const handleChangeVerificationCode = (e) => {
    setCodigoVerificacion(e.target.value);
  };

  const handlerSendEmail = () => {
    if (/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(emailRecuperacion)) {
      dispatch(getUserByEmail(emailRecuperacion));

      const codigoRecuperacion = uuidv4().slice(0, 5);
        
        setCodigoVerificacionGenerado(codigoRecuperacion);

      emailjs.send(
        "service_8c6uo6a",
        "template_j84l1bh",
        {
          to_email: emailRecuperacion,
          verification_code: codigoRecuperacion,
        },
        "LVu_qcdfDk8ci54aS"
      );
      setForgotPassword(true);
    } else {
      alert("Email invalido");
    }
  };

  const verificationCode = () => {
    if (user?.email === emailRecuperacion && codigoVerificacion === codigoVerificacionGenerado) {
        
        setNewPassword(true)
      } else {
        alert("Datos incorrectos")
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
      style={{ padding: "40px" }}
      sx={({ boxShadow: 3 }, { bgcolor: "white" })}
    >
      <Box>
        <TextField
          label="ingrese su email"
          name="emailRecuperacion"
          value={emailRecuperacion}
          onChange={handleChange}
        />
      </Box>
      <Button onClick={handlerSendEmail} variant="outlined" sx={{ mt: 2 }}>
        recuperar contraseña
      </Button>
      {forgotPassword && (
        <div>
          <p>Se envio un correo con un codigo de verificacion a su email</p>
          <br />
          <TextField
            type="text"
            label="Ingresé el codigo"
            value={codigoVerificacion}
            onChange={handleChangeVerificationCode}
          />
          <Button onClick={verificationCode}>Verificar</Button>
        </div>
      )}
      {newPassword && (
        <div>
          <TextField
            type="text"
            label="Ingrese nueva contraseña"
            name="value1"
            value={password.value1}
            onChange={e => setPassword({...password, value1:e.target.value})}
          />
          <TextField
            type="text"
            label="Ingrese nueva contraseña"
            name="value2"
            value={password.value2}
            onChange={e => setPassword({...password, value2:e.target.value})}
          />
          <Button onClick={handleSubmitUser}>Cambiar contraseña</Button>
        </div>
      )}
    </Box>
  );
}
