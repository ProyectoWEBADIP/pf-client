import { useDispatch, useSelector } from "react-redux";
import Validation from "./validaciones";
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

export default function SignUp() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const dispatch = useDispatch();

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

  function handleSubmit(e) {
    e.preventDefault();
    const tieneErrors = Object.keys(error);
    console.log(tieneErrors);
    if (tieneErrors.length === 0) {
      dispatch(registerUser(input));
    } else {
      alert("Verifique los campos");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      style={{ padding: "40px" }}
      sx={{ boxShadow: 3 }}
      
    >
      <Typography variant="h4" fontWeight="bold">
        Crea tu cuenta aquí
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

        <Typography variant="body1" sx={{ mt: 1 }}>
          ✅ puedes usar letras y numeros
        </Typography>

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

      <Box sx={{ mt: 2 }}>
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

        {respuesta?.includes("éxito") ? (
          navigate("/login")
        ) : (
          <Typography variant="h6" color="green">
            {respuesta}
          </Typography>
        )}
      </Box>

      <Button type="submit" variant="outlined" sx={{ mt: 2 }}>
        Crear cuenta
      </Button>
    </Box>
  );
}
