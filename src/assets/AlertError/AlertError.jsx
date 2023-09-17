/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Alert } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const AlertError = () => {
  const errors = useSelector((state) => state.errors);
  
  return (
    <div>
      <Alert severity="error">{errors}</Alert>
    </div>
  );
}

export default AlertError