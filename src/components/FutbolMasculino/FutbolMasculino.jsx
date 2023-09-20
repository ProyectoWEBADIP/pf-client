import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';



export const FutbolMasculino = () => {
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
   Fútbol masculino
  </Typography>
  <Container sx={{ width: '100vw' }}>
    <Grid container>
      <Grid item xs={12} md={6}>
        <div data-aos="fade-up-right">
          <Box m={2}>
            <Typography variant="body1">
              <br />
              En 1986, un grupo de vecinos querían que sus hijos jueguen al
              futbol, comenzaron a reunirse en 11 y 32 donde practicaban las
              categorías mezcladas entre 9 y 12 años. La mayoría de los
              padres se quedaban a un costado mirando como jugaban, ese
              grupo comenzó a agrandarse cada vez más hasta que el 7 de
              agosto de 1986 se conformó la Agrupación Deportiva Infantil
              Platense. En esa época, también se había conformado la liga
              APlaFI y tanto A.D.I.P. como otros clubes estaban ansiosos por
              poder comenzar a jugar y competir pero teníamos un problema,
              no había cancha, los naranjas jugaban solo de visitante.
              Alfredo Cetratelli, uno de los dirigentes de ese entonces,
              consiguió unos terrenos ubicados en 11 y 527, donde se podía
              hacer una cancha de fútbol 7 y un vecino donó una casilla que
              funcionaba como buffet, sala de reuniones, tesorería y
              secretaría. Ese año se disputó el primer partido de adip de
              local contra CRISFA, la jornada más esperada por todos.
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
              src={"https://res.cloudinary.com/drpdobxfu/image/upload/v1695130616/info%20club/infantilesinicios--_bno5rx.jpg"}
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
              src={"https://res.cloudinary.com/drpdobxfu/image/upload/v1695130619/info%20club/comision--_fgvnye.jpg"}
            />
          </Box>
        </div>
      </Grid>

      <Grid item xs={12} md={6}>
        <div data-aos="fade-up-left">
          <Box m={2}>
            <br />
            <Typography variant="body1">
              El club estaba creciendo y 11 y 527 se convirtió en una
              segunda casa para muchos pero en 1991 los terrenos fueron
              loteados y volvimos a ser nómades. Algunos chicos y técnicos
              se fueron pensando que ese era el fin de ADIP. Julio
              Beorlegui, al igual que muchos dirigentes y padres no podía
              aceptar la idea que el club no haya durado ni 10 años, busco
              lo más que pudo y encontró en 8 y 526 el triángulo de la
              antártida argentina, unos terrenos que pertenecían a vialidad,
              en esa época era un descampado, ADIP se instaló y construyó su
              cancha. Paralelamente, se logró que la legislatura votara a
              favor del club, el suelo de un lugar propio parecía cumplirse.
              En 1994, nos afiliamos a la Liga Amateur Platense, para poder
              presentar la primer categoría en la cancha grande, pero
              nuevamente se presentaba el problema de la localía y del
              lugar, ya que en el nuevo predio no se podía hacer una cancha
              más grande.
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
              En los primeros años se usaba la cancha del parque San Martín,
              luego Etcheverry se pintaba de naranja para jugar en 229 y 52.
              ADIP estaba dispuesto a seguir creciendo pero nuevamente otro
              obstáculo se presentó en 1998, la municipalidad de la plata
              comenzó a trabajar en el triangulo de la antártida argentina,
              la Comisión Directiva no pudo reaccionar porque a los días ya
              habían roto la cancha e instalado máquinas para asfaltar. Otra
              vez nos teníamos que mudar. Encontraron 2 lotes de 5 hectáreas
              cada uno en Villa Castells.Varias familias naranjas viajaron a
              Buenos Aires en una combi alquilada para cerrar el trato con
              las dueñas. El terreno de Villa Castells era de ADIP, ahora
              tenían que comenzar a adaptarlo. comenzaron distintos tipos de
              jornada: de limpieza, donde las familias y allegados fueron a
              cortar el pasto, sacar piedras y yuyos, jornada de plantación,
              donde cada chico llevaba unas semillas y plantaba un árbol que
              tenía que cuidar hasta que creciera.
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
              src={"https://res.cloudinary.com/drpdobxfu/image/upload/v1695130618/info%20club/naranjitas-_mbroxe.jpg"}
            />
          </Box>
        </div>
      </Grid>
    </Grid>

  {/* CUARTA ANIMACION */}
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
              src={"https://res.cloudinary.com/drpdobxfu/image/upload/v1695130621/info%20club/globos--_icc1bc.jpg"}
            />
          </Box>
        </div>
      </Grid>
    <Grid item xs={12} md={6}>
      <div data-aos="fade-up-left">
        <Box m={2}>
            <br />
          <Typography variant="body1">
            La familia naranja comenzaba a ser parte de Villa Castells, uno
            de los lotes lo vendieron a una empresa de construcción y
            también acordaron que iban a ser los encargados en alambrar y
            construir las instalaciones Para cerrar el año 1999, se decidió
            hacer una entrega de premios en el nuevo predio, los autos
            quedaron a 2 cuadras de la entrada porque todavía no estaba el
            camino hecho. El SUM era solo una estructura, los chicos se
            sentaron en el piso, donde de a uno fueron recibiendo su premio
            junto con alfajores y helado Tocaron la puerta de los pocos
            vecinos que había para invitarlos a conocer el club. El 11 de
            marzo del 2000, el sueño se había hecho realidad, las canchas de
            fútbol 11 y 7 estaban hechas y valladas, la casa de Juancito el
            casero terminada y el salón para reuniones tenía sillas y mesas.
            Los árboles que habían plantado ya estaban crecidos y los chicos
            listos para jugar,ahora si la familia naranja podía crecer en
            armonía.
          </Typography>
        </Box>
      </div>
    </Grid>
  </Grid>
  </Container>
</Box>
</div>
  )
}
