import { Box, Container, Typography } from '@mui/material'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

const ClubComision = () => {
    useEffect(()=>{
        Aos.init()
    },[])
  return (
    <Container sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", textAlign: "center", fontFamily:"serif"}}>
    
    <div style={{padding: "50px"}} >
        <Typography mt={4} sx={{fontWeight: "bold"}} variant='h2'>COMISIÓN DIRECTIVA 2023-2025</Typography>
        
    </div>
    <div style={{padding: "50px"}}  data-aos="fade-up">
    <Box borderRadius={5} p={3} boxShadow={"5px 5px 10px #ccc"} sx={{":hover":{ boxShadow: "5px 5px 10px #ccc"}, backgroundColor:"whitesmoke"}}>
        <Typography variant='h4' color={"primary"} sx={{fontWeight: "bold"}}>PRESIDENCIA</Typography>
        <Typography variant='h6'>Manuel Mendicino</Typography>
    </Box>
    </div>
    <div style={{padding: "50px"}} data-aos="fade-up">
    <Box borderRadius={5} p={3} boxShadow={"5px 5px 10px #ccc"} sx={{":hover":{ boxShadow: "5px 5px 10px #ccc"}, backgroundColor:"whitesmoke"}}>    
        <Typography variant='h4' color={"primary"}  sx={{fontWeight: "bold"}}>VICEPRESIDENCIA</Typography>
        <Typography variant='h6'>Agustín Molinuevo</Typography>
    </Box>
    </div>

    <div style={{padding: "50px"}} data-aos="fade-up">
    <Box borderRadius={5} p={3} boxShadow={"5px 5px 10px #ccc"} sx={{":hover":{ boxShadow: "5px 5px 10px #ccc"}, backgroundColor:"whitesmoke"}}>
        <Typography variant='h4' color={"primary"} sx={{fontWeight: "bold"}}>SECRETARÍA</Typography>   
        <Typography variant='h6'>Emilia Falleo - <span style={{ fontWeight: 'bold' }}> SECRETARIA</span></Typography>
        <Typography variant='h6'>Gustavo Jorajuría - <span style={{ fontWeight: 'bold' }}> PROSECRETARIO</span></Typography>
    </Box>
    </div>
    
    <div style={{padding: "50px"}} data-aos="fade-up">
    <Box borderRadius={5} p={3} boxShadow={"5px 5px 10px #ccc"} sx={{":hover":{ boxShadow: "5px 5px 10px #ccc"}, backgroundColor:"whitesmoke"}}>
        <Typography variant='h4' color={"primary"} sx={{fontWeight: "bold"}}>TESORERÍA</Typography>
        <Typography variant='h6'>Matías Mastrocesare - <span style={{ fontWeight: 'bold' }}>TESORERO</span></Typography>
        <Typography variant='h6'>Alejandro Primus - <span style={{ fontWeight: 'bold' }}>PROTESORERO</span></Typography>
    </Box>
    </div>

    <div style={{padding: "50px"}} data-aos="fade-up">
    <Box borderRadius={5} p={3} boxShadow={"5px 5px 10px #ccc"} sx={{":hover":{ boxShadow: "5px 5px 10px #ccc"}, backgroundColor:"whitesmoke"}}>
        <Typography variant='h4' color={"primary"} sx={{fontWeight: "bold"}}>VOCALES</Typography>
        <Typography variant='h6'>María Inés Barroso - <span style={{ fontWeight: 'bold' }}>VOCAL TITULAR</span></Typography>
        <Typography variant='h6'>Jorge Ruggeri - <span style={{ fontWeight: 'bold' }}>VOCAL TITULAR</span></Typography>
        <Typography variant='h6'>Adriana Alonso - <span style={{ fontWeight: 'bold' }}>VOCAL SUPLENTE</span></Typography>
        <Typography variant='h6'>Alberto Obregón - <span style={{ fontWeight: 'bold' }}>VOCAL SUPLENTE</span></Typography>
    </Box>
    </div>

    <div style={{padding: "50px"}} data-aos="fade-up">
    <Box borderRadius={5} p={3} boxShadow={"5px 5px 10px #ccc"} sx={{":hover":{ boxShadow: "5px 5px 10px #ccc"}, backgroundColor:"whitesmoke"}}>
        <Typography variant='h4' color={"primary"} sx={{fontWeight: "bold"}}>REVISIÓN DE CUENTAS</Typography>
        <Typography variant='h6'>Leandro Soncini - <span style={{ fontWeight: 'bold' }}>REVISOR DE CUENTAS TITULAR</span></Typography>
        <Typography variant='h6'>Juan Pablo Ruggeri - <span style={{ fontWeight: 'bold' }}>REVISOR DE CUENTAS TITULAR</span></Typography>
        <Typography variant='h6'>Leandro Campano - <span style={{ fontWeight: 'bold' }}>REVISOR DE CUENTAS TITULAR</span></Typography>
        <Typography variant='h6'>Ivana Petrovt - <span style={{ fontWeight: 'bold' }}>REVISOR DE CUENTAS SUPLENTE</span></Typography>
        <Typography variant='h6'>Rodrigo Nieto Martínez - <span style={{ fontWeight: 'bold' }}>REVISOR DE CUENTAS SUPLENTE</span></Typography>
    </Box>
    </div>
    
    </Container>
    
  )
}

export default ClubComision