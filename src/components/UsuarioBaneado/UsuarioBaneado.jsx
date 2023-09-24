/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Box, Button , TextField} from '@mui/material'
import emailjs from '@emailjs/browser'

export default function UsuarioBaneado() {

  const [emailUser, setEmailUser ] = useState("")
  const [message, setMessage] = useState("")

  function HandleClick() {
    emailjs.send(
      "service_3otzb8r",
      "template_c8wlhci",
      { to_email: "", 
        message: message  },
      "VnCsNpxaskLGMjw4N"
    );
  }
    
  return (
    <Box>
      <Box>
      <Button variant='outlined' sx={{ mt: 2}} onClick={HandleClick}>Enviar correo</Button>
      </Box>
    </Box>
  )
}

 