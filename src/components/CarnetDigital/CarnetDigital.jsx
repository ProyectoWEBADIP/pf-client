import { Link, useParams } from "react-router-dom";
import { getUserLoggedById } from "../../redux/usersActions/usersActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material"
import "./CarnetDigital.css"
import { calcularEdad } from "../../dashboardAdminComponents/components/Table/Table";
import dayjs from 'dayjs';

export default function CarnetDigital() {
  const [louding, setLouding] = useState(false);
  const { id } = useParams();
  const usuario = useSelector((state) => state.perfilUsuarioCarnet)
  console.log("usuario",usuario);
  // const usuario = {
  //   // id: 1,
  //   active:true,
  //   authStrategy:null,
  //   createdAt:"2023-09-18T02:57:52.589Z",
  //   deletedAt:null,
  //   email: "losredondos551@gmail.com",
  //   id:"42f83265-15fa-4589-910b-16acaf6d8ac8",
  //   profile: {
  //     birthDate: "1993-11-29T00:00:00.000Z",
  //     dni: "37778791",
  //     firstName: "Juanma",
  //     gender: "Masculino",
  //     id:"78acd9fa-1fce-4c5f-8cca-92af9dcc4e06",
  //     image: "https://res.cloudinary.com/drpdobxfu/image/upload/v1695007323/Usuarios/gokaotv2vh6njnkxceta.png",
  //     lastName:"Nuel",
  //     phone: "2612159554",
  //     razonBan: null,
  //     role:"super_admin",
  //     username: "Juanmanuel",
  //     cuenta: 0
  //   }
  // }
  

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserLoggedById(id));
  }, [dispatch]);

  
  




  return (
  <div>
    {!usuario.id ? <div className="loading">
    <h1>Cargando...</h1></div> :  <div  className="overlay">
    <div className="statusCont">
      <div className="statusTextCont">
        </div>
        <div>
          <span className="title">Carnet Digital</span>
        </div>
      <div className="fotoModanCont">
        <img
          src={
            usuario?.profile ? usuario?.profile?.image : null
          }
          alt="Perfil"
        />
      </div>
        <span className="mainSpan">
          Nombre completo:{' '}
          <span className="infoSpan">
            {usuario?.profile
              ? usuario?.profile?.firstName +
                ' ' +
                usuario?.profile?.lastName
              : usuario?.profile?.username}
          </span>
        </span>

        <span className="mainSpan">
          DNI:{' '}
          <span className="infoSpan">
            {usuario?.profile
              ? usuario?.profile.dni
              : 'DNI no registrado.'}
          </span>
        </span>

        <span className="mainSpan">
          Edad:{' '}
          <span className="infoSpan">
            {usuario.profile
              ? `${calcularEdad(
                  dayjs(usuario.profile.birthDate).format('DD/MM/YYYY')
                )} años.`
              : 'Edad no registrada.'}{' '}
          </span>
        </span>

        <span className="mainSpan">
          Sanciones:{' '}
          <span className="infoSpan">
            {usuario?.profile?.razonBan
              ? usuario?.profile?.razonBan
              : 'El usuario no tiene infracciones.'}
          </span>
        </span>
        <span className="mainSpan">
          Deuda:{' '}
          <span className={usuario?.profile?.cuenta == 0 ? 'activo' : 'inactivo'}>
            {usuario?.profile?.cuenta == 0 ? 'No registra deuda' : `$ ${usuario?.profile?.cuenta}`}
          </span>
        </span>
        <span className="mainSpan">
          Rol: <span className="infoSpan"> {usuario?.profile?.role}</span>
        </span>
      </div>
      <Link to={"/"}><button className="loaderCont">Home</button></Link>
    </div>}
    </div>

)}


        
        
       
       
    
   

