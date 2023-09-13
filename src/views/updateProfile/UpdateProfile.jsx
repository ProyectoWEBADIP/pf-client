/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './updateProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../redux/login-registerActions/loginActions';
import { setIsLoading } from '../../utils/setIsLoading';
import { useParams } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Radio from '@mui/material/Radio';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Cancel, Save } from '@mui/icons-material';
import { unshowProfileEdit } from '../../redux/profileActions/profileActions';
import { updateUserProfile } from '../../redux/usersActions/usersActions';
const UpdateProfile = ({ perfilUsuario }) => {

  return (
    
        <div className="overlayUpdateModal">

        </div>
  );
};

export default UpdateProfile;
