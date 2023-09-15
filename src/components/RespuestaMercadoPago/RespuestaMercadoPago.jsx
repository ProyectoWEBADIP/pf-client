/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Box } from '@mui/material'
import emailjs from '@emailjs/browser'

export default function RespuestaMercadoPago() {

  const [respuestaMp, setRespuestaMp] = useState({})

  const enviarCorreoConfirmacion  = () => {
     emailjs.send(
      "service_ckm9srh",
      "template_z7oue8n",
      { 
        asunto: "¡Pago Realizado con Éxito! ✅",
        to_email: "emailUser", 
        contexto: "Verificación de pago",
        mensaje: "Gracias por realizar el pago de tu cuota en nuestro club.",
        footer: "Tu contribución es fundamental para el funcionamiento de nuestro club. Si tienes alguna pregunta o necesitas información adicional, no dudes en contactarnos."
      },
      "Vfm3hxnSN68eRyMYf"
    );
  }

  const enviarCorreoNotificacion = () => {
    emailjs.send(
      "service_ckm9srh",
      "template_z7oue8n",
      { 
        asunto: "Pago Pendiente ⚠️",
        to_email: "emailUser", 
        contexto: "Pago Pendiente",
        mensaje: "Estimado miembro, Tu pago se encuentra pendiente de procesamiento en nuestro sistema. Por favor, ten en cuenta que esto puede deberse a diversos motivos y estamos trabajando para resolverlo lo antes posible. Te notificaremos tan pronto como se complete la transacción. Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactarnos.",
        footer: "Tu contribución es fundamental para el funcionamiento de nuestro club. Si tienes alguna pregunta o necesitas información adicional, no dudes en contactarnos."
      },
      "Vfm3hxnSN68eRyMYf"
    );
  }

  const enviarCorreoRechazo = () => {
    emailjs.send(
      "service_ckm9srh",
      "template_z7oue8n",
      { 
        asunto: "Pago rechazado ❌",
        to_email: "emailUser", 
        contexto: "Pago rechazado",
        mensaje: "Estimado miembro, Lamentablemente, tu pago ha sido rechazado por nuestro sistema. Esto puede deberse a diversas razones, como información de pago incorrecta o insuficiente. Por favor, verifica los detalles de tu tarjeta de crédito o método de pago y realiza nuevamente la transacción. Si sigues experimentando problemas, no dudes en ponerte en contacto con nosotros para obtener asistencia.",
        footer: "Tu contribución es fundamental para el funcionamiento de nuestro club. Si tienes alguna pregunta o necesitas información adicional, no dudes en contactarnos."
      },
      "Vfm3hxnSN68eRyMYf"
    );
  }

  if(respuestaMp === "aceptado") enviarCorreoConfirmacion()
  else if (respuestaMp === "pendiente") enviarCorreoNotificacion()
  else if (respuestaMp === "rechazado") enviarCorreoRechazo()



  return (
    <Box>
    </Box>
  )
}

 