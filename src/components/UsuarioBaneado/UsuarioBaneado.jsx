/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Box, Button , TextField} from '@mui/material'
import emailjs from '@emailjs/browser'

export default function UsuarioBaneado() {

  const [emailUser, setEmailUser ] = useState("")
  const [message, setMessage] = useState("")

  function HandleClick() {
    emailjs.send(
      "service_8c6uo6a",
      "template_p35w6dm",
      { to_email: "", 
        message: message  },
      "LVu_qcdfDk8ci54aS"
    );
  }
    
  return (
    <Box>
      <Box>
      <TextField
      label="Ingrese su correo"
      type='email'
      placeholder='Ingrese su correo'
      value={emailUser}
      onChange={event => setEmailUser(event.target.value)}
      />
      </Box>

      <Box>
      <Button variant='outlined' sx={{ mt: 2}} onClick={HandleClick}>Enviar correo</Button>
      </Box>
    </Box>
  )
}

 