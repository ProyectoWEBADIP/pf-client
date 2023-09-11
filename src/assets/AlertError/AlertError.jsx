/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Alert } from '@mui/material'
import React from 'react'

const AlertError = ({error}) => {
  return (
    <div>
      <Alert severity="error">{error}</Alert>
    </div>
  )
}

export default AlertError