/* eslint-disable no-unused-vars */
"use client";
import validation from "./validation";
import { Link, useNavigate, useParams } from "react-router-dom";
import style from "./Perfil.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
   createLocalProfile,
   getUserById,
} from "../../redux/login-registerActions/loginActions";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

import { setIsLoading } from "../../utils/setIsLoading";
import {
   Alert,
   Box,
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
import { getAllNoticias } from "../../redux/noticiasActions/noticiasActions";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ConstructionIcon from "@mui/icons-material/Construction";

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
   const [errors, setErrors] = useState({
      firstName: "Ingrese su nombre, por favor.",
      lastName: "Ingrese su apellido, por favor.",
      dni: "Ingrese su número de DNI.",
      birthDate: "Ingrese su fecha de nacimiento.",
      phone: "Ingrese su número de teléfono.",
   });

   initMercadoPago(`TEST-c2bc2a6c-e7ac-4a00-bd64-68b499cde86d`);
   const createPreference = async () => {
      try {
         const { data } = await axios.post(`/payment/createPreference`, {
            description: "Cuota mensual Club deportivo A.D.I.P",
            price: perfilUsuario.profile.saldo,
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
   const [mpLoading, setmpLoading] = useState(false);
   const handleBuy = async () => {
      setmpLoading(true);
      const id = await createPreference();
      setmpLoading(false);
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
      setErrors(
         validation({ ...profileData, [event.target.name]: event.target.value })
      );
   };
   const imgDefault =
      "https://pbs.twimg.com/profile_images/1454099552106074116/eEn8pMnN_400x400.jpg";

   //FUNCION QUE DESHABILITA EL BOTON PARA ACTUALIZAR PERFIL SI HAY ERRORES
   function disabler() {
      let disabled = true;
      for (const err in errors) {
         if (errors[err] === "") {
            disabled = false;
         } else {
            disabled = true;
            break;
         }
      }
      return disabled;
   }
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
         setSuccess(
            <Alert severity="success">Imagen subida exitosamente.</Alert>
         );
         return data;
      } catch (error) {
         setCloudinaryResponse(false);
         setSuccess(<Alert severity="error">Error al subir la imágen.</Alert>);
      }
   }

   async function handleSubmit(e) {
      e.preventDefault();
      const cloudinaryResponse = await submitImgToCloudinary();
      profileData.image = cloudinaryResponse.secure_url;

      dispatch(createLocalProfile(id, profileData));
   }
   const perfilUsuario = useSelector((state) => state.perfilUsuario);
   const showEditProfile = useSelector((state) => state.showEditProfile);
   const isLoading = useSelector((state) => state.isLoading);

   const [errorAlert, setErrorAlert] = useState("");
   const [showError, setShowError] = useState(false);
   const defaultPortada =
      "https://res.cloudinary.com/drpdobxfu/image/upload/v1695156861/info%20club/banderin2_smq847.jpg";

   return (
      <Box className={style.perfContainerContainer}>
         {showError && (
            <Box className="alerts">
               <AlertError error={errorAlert} />
            </Box>
         )}
         {!isLoading ? (
            // FORM REGISTRO
            !perfilUsuario?.active ? (
               <div className={style.contProf}>
                  <form onSubmit={handleSubmit}>
                     <h2>¡Actualiza tu perfil para terminar de registrarte!</h2>

                     <Grid container>
                        <Grid
                           item
                           xs={12}
                           sm={12}
                           md={6}
                           sx={{ justifyContent: "center" }}
                           container
                           direction={"column"}
                        >
                           <div style={{ margin: "20px" }}>
                              <div className="input-error-container">
                                 <TextField
                                    margin="normal"
                                    htmlFor="firstName"
                                    name="firstName"
                                    type="text"
                                    label="Nombre"
                                    onChange={handleChange}
                                 />
                                 {errors.firstName ? (
                                    <span>{errors.firstName}</span>
                                 ) : null}
                              </div>
                              <div className="input-error-container">
                                 <TextField
                                    margin="normal"
                                    htmlFor="lastName"
                                    name="lastName"
                                    type="text"
                                    label="Apellido"
                                    onChange={handleChange}
                                 />
                                 {errors.lastName ? (
                                    <span>{errors.lastName}</span>
                                 ) : null}
                              </div>

                              <div className="input-error-container">
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
                                 {errors.birthDate ? (
                                    <span>{errors.birthDate}</span>
                                 ) : null}
                              </div>

                              <div className="input-error-container">
                                 <TextField
                                    margin="normal"
                                    htmlFor="dni"
                                    name="dni"
                                    type="text"
                                    label="DNI"
                                    onChange={handleChange}
                                 />
                                 {errors.dni ? <span>{errors.dni}</span> : null}
                              </div>
                           </div>
                        </Grid>

                        <Grid
                           item
                           xs={12}
                           sm={12}
                           md={6}
                           sx={{ justifyContent: "center" }}
                           container
                           direction={"column"}
                        >
                           <div style={{ margin: "20px" }}>
                              <div className="photo-container">
                                 <img
                                    src={profileData.image ? imageURL : logo}
                                    alt=""
                                 />
                                 <div className="fileContModal">
                                    <input
                                       onChange={handleChange}
                                       name="image"
                                       id="uploadImgInput"
                                       type="file"
                                    />
                                    <label htmlFor="uploadImgInput">
                                       <FileUploadIcon fontSize="large" />
                                    </label>
                                 </div>
                              </div>

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
                                    defaultValue="Femenino"
                                    fullWidth
                                 >
                                    <MenuItem value="Femenino">
                                       Femenino
                                    </MenuItem>
                                    <MenuItem value="Masculino">
                                       Masculino
                                    </MenuItem>
                                 </Select>
                              </FormControl>

                              <div className="input-error-container">
                                 <TextField
                                    margin="normal"
                                    name="phone"
                                    type="text"
                                    label="Teléfono"
                                    onChange={handleChange}
                                 />
                                 {errors.phone ? (
                                    <span>{errors.phone}</span>
                                 ) : null}
                              </div>

                              <p>
                                 {cloudinaryResponse ? (
                                    <div className={style.loader}></div>
                                 ) : (
                                    success
                                 )}
                              </p>

                              <div className="input-update-container">
                                 <Button
                                    type="submit"
                                    disabled={disabler()}
                                    variant="contained"
                                 >
                                    Actualizar mi perfil
                                    {/* <input
                  
                  type="submit"
                  disabled={disabler()}
                  value={'Actualizar mi perfil'}
                /> */}
                                 </Button>
                              </div>
                           </div>
                        </Grid>
                     </Grid>
                  </form>
               </div>
            ) : (
               //!|||||||||||||||||||||||||perfil actualizado|||||||||||||||||||||||||||||||||||||

               <Box className="profileContainer">
                  {!showEditProfile ? null : (
                     <UpdateProfile perfilUsuario={perfilUsuario} />
                  )}
                  <div>
                     <Grid container>
                        <Grid >
                           <Box className="containerGlobal">
                              <Box className="portadaContainer">
                                 <img
                                    src={
                                       perfilUsuario?.image
                                          ? perfilUsuario?.image
                                          : defaultPortada
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
                              </Box>

                             
                              <Box className="nameAndEditContainer">
                                 <Box className="editButtonContainer">
                                    <h1>
                                       {perfilUsuario?.profile?.firstName}{" "}
                                       {perfilUsuario?.profile?.lastName}
                                    </h1>
                                    <Box
                                       onClick={() => {
                                          dispatch(showProfileEdit());
                                       }}
                                       className="Editbutton"
                                    >
                                       <Edit />
                                    </Box>
                                 </Box>
                              </Box>

                              <Box className="perfilInfoContainer">
                                 <Box className="detallesContainer">
                                    <Box className="carnet-container">
                                    <div >
                                 {role === "super_admin" &&
                                 perfilUsuario?.profile ? (
                                    <div>
                                       <Link to={"/auth/dashboard"}>
                                          <Button variant="contained">
                                             {" "}
                                             <ConstructionIcon fontSize="large" />{" "}
                                          </Button>
                                       </Link>
                                    </div>
                                 ) : null}
                              </div>

                                       <Box className="gen-carnet-container">
                                          {perfilUsuario.active && (
                                             <Link
                                                to={`/QrCarnetDigital/${perfilUsuario.profile.dni}`}
                                             >
                                                <Button variant="contained">
                                                   {" "}
                                                   <QrCode2Icon fontSize="large" />
                                                </Button>
                                             </Link>
                                          )}
                                       </Box>
                                    </Box>
                                    <span className="detallesSpan">
                                       Detalles
                                    </span>
                                    <Box className="dataContainers">
                                       <Email />{" "}
                                       <span>{perfilUsuario?.email}</span>
                                    </Box>
                                    <Box className="dataContainers">
                                       <BadgeIcon />{" "}
                                       <span>
                                          {perfilUsuario?.profile?.dni}
                                       </span>
                                    </Box>
                                    <Box className="dataContainers">
                                       <CakeIcon />
                                       <span>
                                          {
                                             perfilUsuario?.profile?.birthDate.split(
                                                "T"
                                             )[0]
                                          }
                                       </span>
                                    </Box>
                                    <Box className="dataContainers">
                                       <LocalPhoneIcon />
                                       <span>
                                          {perfilUsuario?.profile?.phone}
                                       </span>
                                    </Box>
                                    <Box className="dataContainers">
                                       {perfilUsuario?.profile?.gender ===
                                       "Femenino" ? (
                                          <FemaleIcon />
                                       ) : (
                                          <MaleIcon />
                                       )}
                                       <span>
                                          {perfilUsuario?.profile?.gender}
                                       </span>
                                    </Box>
                                 </Box>
                                 <Box className="estadoDeudaContainer">
                                    {perfilUsuario.profile.saldo > 0 ? (
                                       <Box className="estadodeuda-container">
                                          <span className="detallesSpan">
                                             Estado de cuenta
                                          </span>

                                          <span className="deuda-span">
                                             <AttachMoneyIcon fontSize="large" />
                                             Deuda actual: $
                                             {perfilUsuario.profile.saldo}
                                          </span>
                                          <Box className="mercadopagoContainer">
                                             {mpLoading ? (
                                                <Box className="loader-barra-container">
                                                   <span className="loader-barra-mp"></span>
                                                </Box>
                                             ) : preferenceId ? (
                                                <Box>
                                                   <Wallet
                                                      initialization={{
                                                         preferenceId,
                                                      }}
                                                   />
                                                </Box>
                                             ) : (
                                                <Box className="pagarContainer">
                                                   {" "}
                                                   <button onClick={handleBuy}>
                                                      Pagar con MercadoPago
                                                   </button>
                                                </Box>
                                             )}
                                          </Box>
                                       </Box>
                                    ) : (
                                       <Box className="aldia-container">
                                          <span className="detallesSpan">
                                             Estado de cuenta
                                          </span>
                                          <Box>
                                             <img
                                                src="https://res.cloudinary.com/drpdobxfu/image/upload/v1695234309/utawyobyj6ujarsa52hm.png"
                                                alt=""
                                             />
                                             <span>
                                                Usted no presenta deudas.
                                             </span>
                                          </Box>
                                       </Box>
                                    )}
                                 </Box>
                              </Box>
                           </Box>
                        </Grid>
                     </Grid>
                  </div>
               </Box>
            )
         ) : (
            <Box className={style.boxLoadingBall}>
               <Box className={style.shadowLoadingBall}></Box>
               <Box className={style.gravityLoadingBall}>
                  <Box className={style.ballLoadingBall}></Box>
               </Box>
            </Box>
         )}
      </Box>
   );
}
