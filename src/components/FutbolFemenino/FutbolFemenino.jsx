import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';


const FutbolFemenino = () => {
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
       Fútbol femenino
      </Typography>
      <Container sx={{ width: '100vw' }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div data-aos="fade-up-right">
              <Box m={2}>
                <Typography variant="body1">
                  <br />
                  En 1998, el hermano de uno de los albañiles que estaba trabajando en el club llegó con la propuesta de un equipo de fútbol femenino a ADIP. la institución aceptó y rápidamente comenzaron sus primeros partidos. Flor Ruggeri, con apenas 11 años, integraba ese plantel
                  Los partidos se jugaban en cancha de 11 y no había división de categorías. Pero las jugadoras se fueron yendo de a poco y el técnico se mudó a Bahía Blanca, lo que llevó a la disolución total del femenino.
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
                  src={"https://res.cloudinary.com/drpdobxfu/image/upload/v1695183618/info%20club/DSC-3746--_l2tcu0.png"}
                />
              </Box>
            </div>
          </Grid>
        </Grid>

        {/* SEGUNDA ANIMACION */}
        <br />
        <Grid container>
          <Grid item xs={12} md={6}>
            <div data-aos="fade-up-right">
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
                  src={"https://res.cloudinary.com/drpdobxfu/image/upload/v1695183965/info%20club/DSC_1520_cw222c.jpg"}
                />
              </Box>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div data-aos="fade-up-left">
              <Box m={2}>
                <br />
                <Typography variant="body1">
                A fines del 2014, un grupo de jugadoras, junto con su técnico, Juan Vitale, presentaron un proyecto para incluir el femenino en el club. La dirigencia aceptó y al siguiente año comenzó el torneo femenino de la Liga Amateur Platense, en cancha de 7.
                En el año 2016, la liga incluyó la categoría 3ra, y más mujeres se acercaron al club. También, en septiembre del 2017, Juan Vitale presentó el proyecto de la “Cantera Naranja” para fomentar las categorías inferiores tanto infantiles como juveniles
                En el 2019, la Reserva se consagró campeona en los torneos apertura y clausura y la Primera siempre estuvo en los primeros puestos de la tabla.
                Pasaron pocos años desde la llegada del plantel femenino a la Institución y sus logros van más allá de los deportivos. Ocuparon un espacio, construyeron las bases para que el fútbol femenino sea una realidad para muchas chicas que, como los chicos, comparten la misma pasión por el deporte

                </Typography>
              </Box>
            </div>
          </Grid>
        </Grid>

        {/* TERCERA ANIMACION */}
        <Grid container>
          <Grid item xs={12} md={6}>
            <div data-aos="fade-up-right">
              <Box m={2}>
                <br />
                <Typography variant="body1">
                En el 2022, fue un año muy importante para las Naranjas, resultado del proceso del crecimiento del fútbol femenino en el club, obtuvo el ascenso a la primera A, además de ganar el campeonato del torneo clausura y por su parte, la reserva obtuvo el campeonato del torneo apertura de ese mismo año.
                Las naranjas se encuentran dando sus primeros pasos en la A y sus inferiores estan en continuo crecimiento. 

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
                  src={"https://res.cloudinary.com/drpdobxfu/image/upload/v1695184254/info%20club/IMG_7343_ezdm58.jpg"}
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

export default FutbolFemenino