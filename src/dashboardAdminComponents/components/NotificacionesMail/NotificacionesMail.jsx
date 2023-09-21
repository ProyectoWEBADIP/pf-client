/* eslint-disable no-unused-vars */
import {
  Grid,
  Box,
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Typography,
  FormControl,
  TextareaAutosize,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import "./NotificacionesMail.css"

export default function NotificacionesMail() {

  const [userSearch, setUserSearch] = useState("");
  const [userName, setUserName] = useState([]);
  const [emails, setEmails] = useState([]);
  const [message, setMessage] = useState("");
  const [emailsCategories, setEmailsCategories] = useState([]);
  const [select, setSelect] = useState(false)

  const allUsers = useSelector((state) => state.allUsers);

  const handleChangeSearchUser = (event) => {
    setUserSearch(event.target.value);
  };

  const role = allUsers.map((el) => el.role);
  const uniqueRolesSet = new Set(role);
  //todas las categorias de usuarios estan acá
  const roles = [...uniqueRolesSet];

  const handleSelectEmail = (event) => {
    setEmails([...emails, event.target.value]);
  };

  const filterUsers = () => {
    const user = allUsers.filter((user) =>
      user.profile?.firstName.includes(userSearch)
      );
      setUserName(user);
      setSelect(true)
  };

  const handleChageMessage = (event) => {
    setMessage(event.target.value);
  };

  async function sendEmails(array, message) {
    for (let i = 0; i < array.length; i++) {
      try {
        await emailjs.send(
          "service_ckm9srh",
          "template_c8wlhci",
          {
            asunto: "Notificación de A.D.I.P",
            to_email: array[i],
            contexto: "Notificación de A.D.I.P",
            mensaje: `Este es un mensaje de notificación importante de A.D.I.P. ${message}`,
            footer:
              "En caso de cualquier inconveniente, por favor, comuníquese con el equipo de administración de A.D.I.P.",
          },
          "Vfm3hxnSN68eRyMYf"
        );
      } catch (error) {
        alert(error.message);
      }
    }
  }

  const handleSelectCategorie = (event) => {
    const users = allUsers.filter((user) => user.role == event.target.value);
    const emailsCategories = users.map((el) => el.email);
    setEmailsCategories(emailsCategories);
  };

  const handleSubmit = async () => {
    if (emailsCategories.length !== 0) {
      await sendEmails(emailsCategories, message);
    } else if (emails.length !== 0) {
      await sendEmails(emails, message);
    } else {
      alert("No se encontraron destinatarios");
    }
    alert("notificacion enviada correctamente");
    setUserSearch("");
    setUserName([]);
    setEmails([]);
    setMessage("");
    setEmailsCategories([]);
    setSelect(false)
  };

  return (
    <Box>
      <Grid container spacing={7} className="containerQR">
        <Grid item xs={1} md={5} className="cardContainer" >
          <Box
            sx={{
              boxShadow: 3,
              width: "25vw",
              height: "auto",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#fff",
              color: (theme) =>
                theme.palette.mode === "dark" ? "grey.300" : "grey.800",
              p: 2,
              m: 1,
              borderRadius: 2,
              fontSize: "0.875rem",
              fontWeight: "700",
              backgroundColor: "antiquewhite"
            }}
            
          >
            <Typography variant="h4" fontWeight="bold">
              Buscar Usuario
            </Typography>
            <TextField
              type="search"
              value={userSearch}
              onChange={handleChangeSearchUser}
              label="Ingresar el usuario"
              fullWidth
              sx={{ mt: 2 }}
            />
            <Button
              onClick={filterUsers}
              variant="contained"
              sx={{ mt: 2, display: "inline-block" }}
            >
              Buscar
            </Button>
            <Box sx={{ minWidth: 120 }}>
              {select && <FormControl fullWidth>
                <InputLabel id="buscar_por_nombre" sx={{ mt: 2 }}>
                  Elegir Usuario
                </InputLabel>
                <Select
                  labelId="buscar_por_nombre"
                  onChange={handleSelectEmail}
                  label="buscar_por_nombre"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  {userName &&
                    userName.map((user) => {
                      return (
                        <MenuItem value={user.email} key={user.id}>
                          {user.profile.firstName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>}
              <ul>
                {emails.length !== 0 &&
                  emails.map((e) => {
                    return <li key={e}>{e}</li>;
                  })}
              </ul>
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>
                Enviar email a una categoría
              </Typography>
            </Box>
            <Box>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="buscar_por_categoria" sx={{ mt: 2 }}>
                  Elegir categoría
                </InputLabel>
                <Select
                  labelId="buscar_por_categoria"
                  onChange={handleSelectCategorie}
                  label="buscar_por_categoria"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  {roles &&
                    roles.map((e) => {
                      return (
                        <MenuItem value={e} key={e}>
                          {e}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              boxShadow: 3,
              width: "50vh",
              height: "21vw",
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#101010" : "#fff",
              color: (theme) =>
                theme.palette.mode === "dark" ? "grey.300" : "grey.800",
              p: 2,
              m: 2,
              borderRadius: 2,
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "700",
              backgroundColor: "antiquewhite"
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              Escribir el mensaje
            </Typography>
            <Box >
              <TextareaAutosize
                placeholder="Escriba su correo aquí..."
                minRows="14"
                cols="30"
                value={message}
                onChange={handleChageMessage}
                fullWidth
              />
            </Box>
            <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
              Enviar email
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}