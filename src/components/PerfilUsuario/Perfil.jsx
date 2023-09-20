/* eslint-disable no-unused-vars */
"use client";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./Perfil.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  createLocalProfile,
  getUserById,
} from "../../redux/login-registerActions/loginActions";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';

import { setIsLoading } from "../../utils/setIsLoading";
import {
  Alert,
  Badge,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BadgeIcon from "@mui/icons-material/Badge";
import { Box, Container, padding } from "@mui/system";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import "./perfil.css";
import AlertError from "../../assets/AlertError/AlertError";
import logo from "../../assets/Escudo ADIP sin fondo.png";
import { Edit, Email } from "@mui/icons-material";
import CakeIcon from "@mui/icons-material/Cake";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import UpdateProfile from "../../views/updateProfile/UpdateProfile";
import { showProfileEdit } from "../../redux/profileActions/profileActions";
import jwtDecode from "jwt-decode";
import { getAllNoticias } from '../../redux/noticiasActions/noticiasActions';
export default function Perfil() {
  //!HOOKS
  const [preferenceId, setPreferenceId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.userId; //AGARRO ID DEL USER DEL LOCALSTORAGE
  const token = localStorage?.access_token;
  let role;
  if (token) {
    role = jwtDecode(token).role;
  }
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    birthDate: "",
    gender: "",
    phone: "",
    image: "",
  });
  const [file, setFile] = useState(null);

  initMercadoPago(`TEST-c2bc2a6c-e7ac-4a00-bd64-68b499cde86d`);
  const createPreference = async () => {
    console.log('entre');
    try {
      const { data } = await axios.post(`/payment/createPreference`, {
        description: 'Cuota mensual Club deportivo A.D.I.P',
        price: 100,
        quantity: 1,
      });
      return data.body.id;
    } catch (error) {
      setErrorAlert(error.message);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };
  const noticias = useSelector((state) => state.noticias);
  useEffect(() => {
    dispatch(getAllNoticias());
    dispatch(setIsLoading());
    dispatch(getUserById(id));
  }, [dispatch, id]);

  const [imageURL, setImageURL] = useState(""); //url

  const handleChange = (event) => {
    if (event.target.name === "image") {
      const file = event.target.files[0];
      setFile(event.target.files[0]);
      const path = URL.createObjectURL(file);
      setImageURL(path);
    }
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };
  const imgDefault =
    "https://pbs.twimg.com/profile_images/1454099552106074116/eEn8pMnN_400x400.jpg";

  //?FUNCION QUE DESHABILITA EL BOTON PARA ACTUALIZAR PERFIL SI HAY ERRORES

  const [cloudinaryResponse, setCloudinaryResponse] = useState(null);
  const [success, setSuccess] = useState(false);
  async function submitImgToCloudinary() {
    setCloudinaryResponse(true);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Usuarios");
      formData.append("cloud_name", "drpdobxfu");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/drpdobxfu/image/upload",
        formData
      );

      setProfileData({ ...profileData, image: data.secure_url });
      setCloudinaryResponse(false);
      setSuccess(<Alert severity="success">Imagen subida exitosamente.</Alert>);
      return;
    } catch (error) {
      setCloudinaryResponse(false);
      setSuccess(<Alert severity="error">Error al subir la imágen.</Alert>);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(createLocalProfile(id, profileData));
  }
  const perfilUsuario = useSelector((state) => state.perfilUsuario);
  console.log("usuario ",perfilUsuario);
  const showEditProfile = useSelector((state) => state.showEditProfile);
  const isLoading = useSelector((state) => state.isLoading);

  const [errorAlert, setErrorAlert] = useState("");
  const [showError, setShowError] = useState(false);
  const defaultPortada =
    'https://res.cloudinary.com/drpdobxfu/image/upload/v1695063800/kfoqlqqc1yevcyeoggvg.jpg';
  return (
    <div className={style.perfContainerContainer}>
      {showError ? (
        <div className="alerts">
          <AlertError error={errorAlert} />
        </div>
      ) : null}
      {!isLoading ? (
        !perfilUsuario?.active ? (
          <div className={style.contProf}>
            <Grid container spacing={{ md: 2 }}>
              <Grid item xs={12} sm={12} md={6} marginBottom={5}>
                <form onSubmit={handleSubmit}>
                  <Box
                    display="flex"
                    flexDirection={"column"}
                    maxWidth={400}
                    minWidth={300}
                    alignItems="center"
                    justifyContent={"center"}
                    margin="auto"
                    padding={3}
                    borderRadius={5}
                    boxShadow={"5px 5px 10px #ccc"}
                    sx={{
                      ":hover": { boxShadow: "5px 5px 10px #ccc" },
                      backgroundColor: "whitesmoke",
                      marginX: 3,
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Actualiza tu perfil para terminar de registrarte!
                    </Typography>
                    <TextField
                      margin="normal"
                      htmlFor="firstName"
                      name="firstName"
                      type="text"
                      label="Nombre"
                      onChange={handleChange}
                    />
                    <TextField
                      margin="normal"
                      htmlFor="lastName"
                      name="lastName"
                      type="text"
                      label="Apellido"
                      onChange={handleChange}
                    />
                    <TextField
                      margin="normal"
                      htmlFor="birthDate"
                      name="birthDate"
                      type="date"
                      focused
                      label="Fecha de Nacimiento"
                      onChange={handleChange}
                      color="grey"
                    />
                    <TextField
                      margin="normal"
                      htmlFor="dni"
                      name="dni"
                      type="text"
                      label="DNI"
                      onChange={handleChange}
                    />
                    <TextField
                      margin="normal"
                      name="phone"
                      type="text"
                      label="Teléfono"
                      onChange={handleChange}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Género
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Género"
                        name="gender"
                        onChange={handleChange}
                      >
                        <MenuItem value="Femenino">Femenino</MenuItem>
                        <MenuItem value="Masculino">Masculino</MenuItem>
                      </Select>
                    </FormControl>

                    <Toolbar>
                      <TextField
                        margin="normal"
                        htmlFor="image"
                        name="image"
                        type="file"
                        label="Imagen"
                        focused
                        onChange={handleChange}
                        color="grey"
                      ></TextField>
                      <Button
                        variant="contained"
                        size="xs"
                        sx={{
                          marginLeft: "5px",
                          fontSize: "10px",
                          alignContent: "center",
                        }}
                        type="button"
                        onClick={submitImgToCloudinary}
                        startIcon={<FileUploadOutlinedIcon />}
                      >
                        Cargar
                      </Button>
                    </Toolbar>
                    <p>
                      {cloudinaryResponse ? (
                        <div className={style.loader}></div>
                      ) : (
                        success
                      )}
                    </p>

                    <Button
                      type="submit"
                      sx={{ marginTop: 2 }}
                      variant="outlined"
                    >
                      Actualizar perfil
                    </Button>
                  </Box>
                </form>
              </Grid>

              {
                //!ACÁ SE DIVIDE LA VISTA PREVIA
              }

              <Grid item xs={12} sm={12} md={6}>
                <Box
                  display="flex"
                  flexDirection={"column"}
                  maxWidth={400}
                  minWidth={300}
                  alignItems="center"
                  justifyContent={"center"}
                  margin="auto"
                  padding={3}
                  borderRadius={5}
                  boxShadow={"5px 5px 10px #ccc"}
                  sx={{
                    ":hover": { boxShadow: "5px 5px 10px #ccc" },
                    backgroundColor: "whitesmoke",
                    marginX: 3,
                  }}
                >
                  <Container
                    sx={{
                      borderRadius: "50%",
                      borderColor: "black",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      overflow: "hidden",
                      width: "15vw",
                      height: "15vw",
                      marginBottom: 3,
                    }}
                  >
                    <img
                      src={profileData.image ? imageURL : imgDefault}
                      alt="img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Container>

                  <Typography variant="h4" fontWeight="lighter">
                    Hola
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {profileData.firstName} {profileData.lastName}!
                  </Typography>

                  <Container>
                    <Typography variant="body1">
                      Email: {perfilUsuario?.email}
                    </Typography>
                    <Typography variant="body1">
                      Fecha de Nacimiento: {profileData.birthDate}
                    </Typography>
                    <Typography variant="body1">
                      DNI: {profileData?.dni}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      Deuda acumulada: $0
                    </Typography>
                  </Container>
                </Box>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div className="profileContainer">
            <div className="leftProfileContainer">
              {role !== 'user' && perfilUsuario?.profile ? (
                <div className="table-edit-container">
                  <div className="link-edits-container">
                    <Link to="/editarSponsor">
                      <h4 title="Haz click aquí para editar los sponsors">
                        Editar sponsors
                      </h4>
                    </Link>
                  </div>
                  <div className="link-edits-container">
                    <h4>
                      Editar noticias{' '}
                      <Tooltip
                        title="Si quieres editar una noticia, haz click en su título."
                        placement="top-start"
                      >
                        <button className="button-question">
                          <QuestionMarkIcon fontSize="small" />
                        </button>
                      </Tooltip>
                    </h4>
                    {noticias?.map((not, i) => {
                      return (
                        <div key={i}>
                          <Link to={`/editarNoticia/${not.id}`}>
                            <span>*{not.title}</span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
            {!showEditProfile ? null : (
              <UpdateProfile perfilUsuario={perfilUsuario} />
            )}
            <div className="centerProfileContainer">
              <div className="portadaContainer">
                <img
                  src={
                    perfilUsuario?.image ? perfilUsuario?.image : defaultPortada
                  }
                  alt=""
                />
                <img
                  src={
                    perfilUsuario?.profile?.image
                      ? perfilUsuario?.profile?.image
                      : imgDefault
                  }
                  alt=""
                />
              </div>

              <div className="nameAndEditContainer">
                <h1>
                  {perfilUsuario?.profile?.firstName}{" "}
                  {perfilUsuario?.profile?.lastName}
                </h1>
                <div className="editButtonContainer">
                  <div
                    onClick={() => {
                      dispatch(showProfileEdit());
                    }}
                  >
                    <Edit />
                  </div>
                </div>
              </div>
              <div className="perfilInfoContainer">
                <div className="detallesContainer">
                  <span className="detallesSpan">Detalles</span>
                  <div className="dataContainers">
                    <Email /> <span>{perfilUsuario?.email}</span>
                  </div>
                  <div className="dataContainers">
                    <BadgeIcon /> <span>{perfilUsuario?.profile?.dni}</span>
                  </div>
                  <div className="dataContainers">
                    <CakeIcon />
                    <span>
                      {perfilUsuario?.profile?.birthDate.split('T')[0]}
                    </span>
                  </div>
                  <div className="dataContainers">
                    <LocalPhoneIcon />
                    <span>{perfilUsuario?.profile?.phone}</span>
                  </div>
                  <div className="dataContainers">
                    {perfilUsuario?.profile?.gender === "Femenino" ? (
                      <FemaleIcon />
                    ) : (
                      <MaleIcon />
                    )}
                    <span>{perfilUsuario?.profile?.gender}</span>
                  </div>
                </div>
                <div className="estadoDeudaContainer">
                  <div className="estadocontainer">
                    <span className="detallesSpan">Estado de cuenta</span>
                    <div className="dataContainers">
                      <AttachMoneyIcon fontSize="large" />
                      <span>Deuda actual: $1900,57</span>
                    </div>
                  </div>
                  {!preferenceId ? (
                    <div className="pagarContainer">
                      {" "}
                      <button onClick={handleBuy}>Pagar con MercadoPago</button>
                    </div>
                  ) : null}
                  <div className="mercadopagoContainer">
                    {preferenceId && (
                      <Wallet initialization={{ preferenceId }} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rigthProfileContainer">
            {role === 'super_admin' && perfilUsuario?.profile ? (
                <div>
                  <Link to={'/auth/dashboard'}>
                  <button className="learn-more">
                    <span aria-hidden="true" className="circle">
                      <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Administrador</span>
                  </button>
                </Link>
                </div>
              ) : null}
            </div>
          </div>
        )
      ) : (
        <div className={style.boxLoadingBall}>
          <div className={style.shadowLoadingBall}></div>
          <div className={style.gravityLoadingBall}>
            <div className={style.ballLoadingBall}></div>
          </div>
        </div>
      )}
    </div>
  );
}
