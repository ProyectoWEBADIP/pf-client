/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './updateProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../redux/login-registerActions/loginActions';
import {
  Alert,
  Box,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { MenuItem } from 'react-pro-sidebar';
import BadgeIcon from '@mui/icons-material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { AccountCircle, Cake, Close, Phone, Save } from '@mui/icons-material';
import {
  submitImgToCloudinary,
  unshowProfileEdit,
  updateUserProfile,
} from '../../redux/profileActions/profileActions';
import AlertSuccess from '../../assets/AlertSuccess/AlertSuccess';
const UpdateProfile = ({ perfilUsuario }) => {
  const dispatch = useDispatch();
  const [updatedFields, setUpdatedFields] = React.useState({
    firstName: perfilUsuario.profile.firstName,
    lastName: perfilUsuario.profile.lastName,
    birthDate: perfilUsuario.profile.birthDate,
    gender: perfilUsuario.profile.gender,
    image: perfilUsuario.profile.image,
    dni: perfilUsuario.profile.dni,
    phone: perfilUsuario.profile.phone,
  });
  const [imageURL, setImageURL] = useState(''); //url
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
const [imgUpdated, setImgUpdated] = useState(false)
  const [alert, setAlert] = useState('')

  function handleChange(e) {
    if (e.target.name === 'image') {
      setImgUpdated(true)
      const file = e.target.files[0];
      setFile(e.target.files[0]);
      const path = URL.createObjectURL(file);
      setImageURL(path);

    }
if(e.target.name === 'dni' && updatedFields.dni.length<8){
  setUpdatedFields({
    ...updatedFields,
    [e.target.name]: e.target.value,
  });
}
setUpdatedFields({
  ...updatedFields,
  [e.target.name]: e.target.value,
});
  }

  async function handleUpload(e) {
    if(imgUpdated){
      const cloudinaryResponse = await dispatch(submitImgToCloudinary(file));
      updatedFields.image = cloudinaryResponse.secure_url
      setAlert(cloudinaryResponse.message);
      setShowAlert(true);
      setTimeout(() => {
      setShowAlert(false);
        
      }, 5000);
    }
    const id = perfilUsuario.profile.id
const response = await dispatch(updateUserProfile(id,updatedFields))
setImgUpdated(false)
setSuccess(response)
setTimeout(() => {
  setSuccess(false)
}, 5000);
return ;
  }
  return (
    <div className="overlayUpdateModal">
      
      <div className="updateModal">
        {showAlert && <div className="imageAlertModal">
          <Alert severity="success">{alert}</Alert>
        </div>}
        {success && <div className='successUpdate'>
          <AlertSuccess success={success}/>
          </div>
  
          }
        <div
          className="closeButtonContainer"
          onClick={() => dispatch(unshowProfileEdit())}
        >
          <Close fontSize="medium" />
        </div>
        <div className="titleModal">
          <span>Editar perfil</span>
        </div>
        <div className="namesImgCont">
          <div className="namesModal">
            <TextField
              InputProps={{
               
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              name='firstName'
              placeholder={perfilUsuario.profile.firstName}
              id="outlined-basic"
              onChange={handleChange}
              label="Nombre"
              variant="outlined"
            />
            <TextField
              InputProps={{
                
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              name='lastName'
              placeholder={perfilUsuario.profile.lastName}
              onChange={handleChange}
              id="outlined-basic"
              label="Apellido"
              variant="outlined"
            />
          </div>
          <div className="imgModal">
            <div>
              <img
                src={imageURL ? imageURL : perfilUsuario.profile.image}
                alt=""
              />
            </div>
            <div className="fileContModal">
              <input
                onChange={handleChange}
                name="image"
                id="uploadImgInput"
                type="file"
              />
              <label htmlFor="uploadImgInput">
                {' '}
                <FileUploadIcon fontSize="large" />
              </label>
            </div>
          </div>
        </div>
        <div className="birth-gender-imgModal">
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Cake />
                </InputAdornment>
              ),
            }}
            name="birthDate"
            type="date"
            focused
            label="Fecha de Nacimiento"
            onChange={handleChange}
          />
          <RadioGroup
            onChange={handleChange}

            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={perfilUsuario.profile.gender}
            name="gender"
          >
            <FormControlLabel
              value="Femenino"
              control={<Radio />}
              label="Femenino"
            />
            <FormControlLabel
              value="Masculino"
              control={<Radio />}
              label="Masculino"
            />
          </RadioGroup>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
            placeholder={perfilUsuario.profile.phone}
            id="outlined-basic"
            onChange={handleChange}
            label="Teléfono"
            name='phone'
            variant="outlined"
          />
        </div>
        <div className="dniModal">
          <TextField
            InputProps={{
           maxLength: 10 ,

              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            }}
            id="outlined-basic"
            onChange={handleChange}
            label="DNI"
            name='dni'
            variant="outlined"
            maxLength="8"
            placeholder={perfilUsuario.profile.dni}
          />
        </div>
        <div onClick={handleUpload} className="saveButton">
          <span>
            <Save fontSize="large" /> Guardar cambios
          </span>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
