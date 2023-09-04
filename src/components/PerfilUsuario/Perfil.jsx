/* eslint-disable no-unused-vars */
'use client';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './Perfil.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createLocalProfile,
  getUserById,
} from '../../redux/login-registerActions/loginActions';
import { useSelect } from '@mui/base';
import Validation from '../Login/validaciones';
import axios from 'axios';
import { lightGreen } from '@mui/material/colors';
import { setIsLoading } from '../../utils/setIsLoading';
import { Alert } from '@mui/material';
export default function Perfil() {
  //!HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.userId; //AGARRO ID DEL USER DEL LOCALSTORAGE
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    birthDate: '',
    image: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});

  useEffect(() => {
dispatch(setIsLoading())
    dispatch(getUserById(id));
  }, [dispatch, id]);

  const [imageURL, setImageURL] = useState(''); //url

  const handleChange = (event) => {
    if (event.target.name === 'image') {
      const file = event.target.files[0];
      setFile(event.target.files[0]);
      const path = URL.createObjectURL(file);
      setImageURL(path);
    }
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
    // setError(Validation({
    //     ...profileData,
    //     [event.target.name] : event.target.value
    // }) )
  };
  const imgDefault =
    'https://pbs.twimg.com/profile_images/1454099552106074116/eEn8pMnN_400x400.jpg';

  //?FUNCION QUE DESHABILITA EL BOTON PARA ACTUALIZAR PERFIL SI HAY ERRORES
  // function disabler() {
  //     let disabled = true;
  //     for (const err in error) {
  //       if (error[err] === "") {
  //         disabled = false;
  //       } else {
  //         disabled = true;
  //         break;
  //       }
  //     }
  //     return disabled;
  //   }
  const [cloudinaryResponse, setCloudinaryResponse] = useState(null);
  const [success, setSuccess]= useState(false)
  async function submitImgToCloudinary() {
    setCloudinaryResponse(true);
    setSuccess(false)
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Usuarios');
      formData.append('cloud_name', 'drpdobxfu');

      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/drpdobxfu/image/upload',
        formData
      );

      setProfileData({ ...profileData, image: data.secure_url });
      setCloudinaryResponse(false);
      setSuccess(<Alert severity="success">Imagen subida exitosamente.</Alert>)
      return;
    } catch (error) {
      setCloudinaryResponse(false);
setSuccess(<Alert severity="error">Error al subir la imágen.</Alert>)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(createLocalProfile(id, profileData));
  }
  const perfilUsuario = useSelector((state) => state.perfilUsuario);
const isLoading = useSelector(state=>state.isLoading)
  return (
    <div className={style.formcomponentcont}>
      <div>
{!isLoading?      !perfilUsuario.active ? (
        <div className={style.contProf}>
          <div className={style.formContainerProfile}>
            {
              //Este contendrá todo para hacer la previsualización
            }
            {/* <div className={style.image}>
              <img src="https://pbs.twimg.com/profile_images/1454099552106074116/eEn8pMnN_400x400.jpg" />
            </div> */}
            <h2>
              Actualiza tu perfil para terminar de registrarte en Club ADIP.
            </h2>
            <div className={style.formContainer}>
              <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">Nombre:</label>
                {/* {error.nombre && <p className="text-red-500">{error.nombre}</p>} */}
                <input onChange={handleChange} name="firstName" type="text" />
                <br />
                <label htmlFor="lastName">Apellido:</label>
                {/* {error.nombre && <p className="text-red-500">{error.nombre}</p>} */}
                <input onChange={handleChange} name="lastName" type="text" />
                <br />
                <label htmlFor="birthDate">Fecha de nacimiento:</label>
                {/* {error.nombre && <p className="text-red-500">{error.nombre}</p>} */}
                <input onChange={handleChange} name="birthDate" type="date" />
                <br />
                <label htmlFor="image">Imagen:</label>
                {/* {error.nombre && <p className="text-red-500">{error.nombre}</p>} */}
                <input onChange={handleChange} name="image" type="file" />
                <button type="button" onClick={submitImgToCloudinary}>
                  Subir imagen
                </button>
                <p>{cloudinaryResponse?<div className={style.loader}></div>:success}</p>
                <br />
                <label htmlFor="dni">DNI:</label>
                {/* {error.nombre && <p className="text-red-500">{error.nombre}</p>} */}
                <input onChange={handleChange} name="dni" type="text" />
                <br />
                <button>Actualizar mi perfil</button>

                {/* <button disabled={disabler()}>Actualizar mi perfil</button> CUANDO ESTÉ LA VALIDACION DE ERRORES, SE USARÁ ESTE BOTÓN QUE SE DESHABILITA SI HAY ERRORES*/}
              </form>
            </div>
          </div>
          {
            //!ACÁ SE DIVIDE LA VISTA PREVIA
          }
          <div className={style.prevContainer}>
            <div className={style.prevImgCont}>
              <img
                src={profileData.image ? imageURL : imgDefault}
                alt="img"
              />
              <div>
              <h2>
                Bienvenido, {<br></br>}{profileData.firstName} {profileData.lastName}
              </h2>
            </div>
              {/* {error.imagen && <p>{error.imagen}</p>} */}
            </div>
            
            <div>
              <p>Email: {perfilUsuario.email}</p>
            </div>
            <div>
              <label>Fecha de nacimiento: </label>
              <p>{profileData.birthDate}</p>
            </div>
            <div>
              <label>DNI: </label>
              <p>{profileData.dni}</p>
            </div>
            <div>
              <label>Deuda actual: </label>
              <p>$ 99999999,28</p> {/*deuda de prueba*/}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {' '}
          {/*  ACÁ SE DIVIDE CUANDO TIENE PERFIL Y CUANDO NO*/}
          <div className={style.perfilContainer}>
            <div className={style.imgCont}>
              <div>
                <h1>
                  Bienvenido, {<br></br>}
                  {perfilUsuario.profile.firstName}{' '}
                  {perfilUsuario.profile.lastName}
                </h1>
              </div>
              <img
                src={
                  perfilUsuario.profile.image
                    ? perfilUsuario.profile.image
                    : imgDefault
                }
                alt="img"
              />

              {error.imagen && <p>{error.imagen}</p>}
            </div>
            <div>
              <p>Email: {perfilUsuario.email}</p>
            </div>
            <div>
              <p>
                Fecha de nacimiento:{' '}
                {perfilUsuario.profile.birthDate.split('T')[0]}
              </p>
            </div>
            <div>
              <p>DNI: {perfilUsuario.profile.dni}</p>
            </div>
            <div>
              <label htmlFor=""></label>
              <p>Deuda actual: $ 99999999,28</p> {/*deuda de prueba*/}
            </div>
          </div>
        </div>
      ):(
        <div className={style.box}>
          <div className={style.shadow}></div>
          <div className={style.gravity}>
            <div className={style.ball}></div>
          </div>
        </div>
      )}
      </div>

    </div>
  );
}
