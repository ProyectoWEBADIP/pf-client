import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';


const MasNaranja = () => {
    useEffect(() => {
        Aos.init();
      }, []);
    
      return (
        <div style={{marginTop: "30px"}}>
        <Box>
          <Typography
            sx={{ fontWeight: 'bold', textAlign:'center'}}
            variant="h2"
          >
            Hacete + Naranja!
          </Typography>
          <Container sx={{ width: '100vw' }}>
            <Grid container>
              <Grid item xs={12} md={5}>
                <div data-aos="fade-up-right">
                  <Box m={2}>
                    <Typography variant="body1">
                    <br />
                    Más Naranja es una propuesta pensada para quienes quieran aportar para que el club siga creciendo.
                    <br />
                    Quienes sean Más Naranja recibirán algunos beneficios (entrada gratis a todas las jornadas de local en ADIP y descuentos con comercios adheridos!) 
                    <br />
                    <span  style={{color: "red"}}>Jugadores y jugadoras ya cuentan con estos beneficios por lo tanto no se deben asociar</span>
                    <br />
                    <span style={{fontWeight: "bold"}}> Ayudanos a que el club siga creciendo y hacete más naranja!</span>
                    <br/>
                    Para más información sobre la inscripción visita nuestras redes sociales o podes consultar en la oficina de Administración del club! 
                    </Typography>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div data-aos="fade-up-left">
                  <Box
                    borderRadius={5}
                    p={3}
                    m={2}
                    boxShadow={'5px 5px 10px #ccc'}
                    sx={{
                      ':hover': { boxShadow: '5px 5px 10px #ccc' },
                      backgroundColor: 'whitesmoke',
                    }}
                  >
                    <img
                      style={{ objectFit: 'cover', maxWidth: '100%' }}
                      src={"https://res.cloudinary.com/drpdobxfu/image/upload/v1695256988/info%20club/mas_naranja_rzkp70.png"}
                    />
                  </Box>
                </div>
              </Grid>
            </Grid>
            </Container>
    </Box>
    </div>
  )
}

export default MasNaranja