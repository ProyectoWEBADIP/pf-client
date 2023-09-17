import { useDispatch, useSelector,  } from "react-redux";
import Validation from "../Login/validaciones";
import { useState } from "react";
import { registerUser } from "../../redux/login-registerActions/loginActions";
import { useNavigate } from "react-router-dom";
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
import { v4 as uuidv4 } from "uuid";
import emailjs from "@emailjs/browser";
import './singup.css'
import logo from '../../assets/Escudo ADIP sin fondo.png'
export default function SignUp() {

  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [error, setError] = useState({});
  const [verificacionEmail, setVerificacionEmail] = useState(false);
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [codigoGeneradoLocalmente, setCodigoGeneradoLocalmente] = useState("");

  const dispatch = useDispatch();
// esta funcion está manejando el cambio de los inputs
  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setError(
      Validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const respuesta = useSelector((state) => state.loginRegisterLocal);
  console.log("respuesta singup",respuesta);
  
  function handleSubmit(e) {
    e.preventDefault();
    const tieneErrors = Object.keys(error);

    if (tieneErrors.length === 0) {
      setVerificacionEmail(true);
      const codigoDeVerificacion = uuidv4().slice(0, 5);
      setCodigoGeneradoLocalmente(codigoDeVerificacion);
      console.log("codigo verificacion", codigoVerificacion);
      emailjs.send(
        "service_8c6uo6a",
        "template_p35w6dm",
        { 
          asunto: "Verificación de Correo Electrónico - Código de Confirmación",
          to_email: input.email, 
          contexto: " Código de Confirmación de A.D.I.P ",
          mensaje: "Para verificar la existencia de tu correo electrónico en A.D.I.P, te proporcionamos un código de confirmación:" ,
          verification_code: codigoDeVerificacion,
          footer: "Por favor, utiliza este código en nuestra página de inicio de sesión para confirmar que tu correo electrónico está registrado en nuestra plataforma. Si no solicitaste esta acción o tienes alguna pregunta, por favor, contáctanos a través de Correo de Soporte proyectoadipweb@gmail.com"
        },
        "LVu_qcdfDk8ci54aS"
      );
      console.log("salí");
    } else {
      alert("Verifique los campos");
    }
  }
  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const tieneErrors = Object.keys(error);

  //   if (tieneErrors.length === 0) {
  //     setVerificacionEmail(true);
  //     const codigoDeVerificacion = uuidv4().slice(0, 5);
  //     setCodigoGeneradoLocalmente(codigoDeVerificacion);
  //     emailjs.send(
  //       "service_8c6uo6a",
  //       "template_p35w6dm",
  //       { to_email: input.email, verification_code: codigoDeVerificacion },
  //       "LVu_qcdfDk8ci54aS"
  //     );
  //   } else {
  //     alert("Verifique los campos");
  //   }
  // }
  const handlerCodeVerification = (event) => {
    event.preventDefault();
    setCodigoVerificacion(event.target.value);
  };

  const sendUser = async() => {
    if (codigoGeneradoLocalmente.trim() == codigoVerificacion.trim()) {
    const response = await dispatch(registerUser(input));
if(response.registered){
  navigate('/login')
  alert('Registrado con éxito.')
} else{
  alert(response)
}
    }
  };

  return (
    <div className="signUpContainer">
      <Box
      className="formSignUpCont"
      component="form"
      onSubmit={handleSubmit}
      style={{ padding: "40px" }}
      sx={({ boxShadow: 3 }, { bgcolor: "white" })}
    >
      <img src={logo}/>
      <Typography variant="h4" fontWeight="bold">
        ¡Sé parte de la familia Naranja!
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Nombre de usuario:
        </Typography>

        <TextField
          label="Nombre de usuario"
          type="text"
          name="username"
          value={input.username}
          placeholder="Elija su nombre de usuario"
          onChange={handleChange}
          required
          sx={{ mt: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* <Typography variant="body1" sx={{ mt: 1 }}>
          ✅ Puedes usar letras y numeros
        </Typography> */}

        {error.username ? (
          <Typography color="red" sx={{ mt: 1 }}>
            {error.username}
          </Typography>
        ) : null}
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Correo electrónico:
        </Typography>

        <TextField
          label="Correo electrónico"
          type="email"
          name="email"
          placeholder="Ingrese su correo electrónico"
          value={input.email}
          onChange={handleChange}
          required
          sx={{ mt: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailIcon />
              </InputAdornment>
            ),
          }}
        />

        {error.email && (
          <Typography color="red" sx={{ mt: 1 }}>
            {error.email}
          </Typography>
        )}
      </Box>

      <Box>
        <Typography variant="h6" fontWeight="bold">
          Contraseña:
        </Typography>

        <TextField
          label="Contraseña"
          name="password"
          type="password"
          placeholder="Ingrese su contraseña"
          onChange={handleChange}
          value={input.password}
          required
          sx={{ mt: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
          ⚠️ Debe ser mayor a 8 caracteres
        </Typography>

        <Typography variant="body1" fontWeight="bold">
          ⚠️ Debe contener al menos un carácter especial
        </Typography>

        {error.password && (
          <Typography color="red" sx={{ mt: 1 }}>
            {error.password}
          </Typography>
        )}
      </Box>
      <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
        Enviar codigo de verificacion
      </Button>

      {verificacionEmail && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Código de verificación:
          </Typography>

          <TextField
            placeholder="Verifique su email"
            onChange={handlerCodeVerification}
            sx={{ mt: 2 }}
            required
            name="codigoVerificacion"
            value={codigoVerificacion}
          />
          <Box>
            <Button onClick={sendUser} variant="outlined" sx={{ mt: 2 }}>
              Verificar
            </Button>
          </Box>
        </Box>
      )}
    </Box>
    </div>
  );
}
