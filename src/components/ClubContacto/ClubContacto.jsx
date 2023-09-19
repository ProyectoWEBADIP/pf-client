import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const ClubContacto = () => {
  return (
    <div>
        <div style={{marginTop: "80px"}}></div>
        <Container>
            <Typography mt={4} sx={{fontWeight: "bold"}} variant='h2'>CONTACTO</Typography> 
            <Box>
                <Typography variant='h6'>Redes sociales</Typography>
            </Box>
            <Box>
            <Typography variant='h6'>Mail</Typography>
            </Box>
            <Box>
            <Typography variant='h6'>Club 10 y 485, la plata buenos aires argentina</Typography>
            <Typography variant='h6'>Sede Social 8 y 526</Typography>
            </Box>
        </Container>  
    </div>
  )
}

export default ClubContacto