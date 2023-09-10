/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Alert } from '@mui/material'
import React from 'react'

const AlertSuccess = ({success}) => {
  return (
    <div><Alert severity="success">{success}</Alert></div>
  )
}

export default AlertSuccess