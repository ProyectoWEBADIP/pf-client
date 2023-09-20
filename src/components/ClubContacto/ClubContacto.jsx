import { Box, Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const ClubContacto = () => {
  return (
    <div>
        <div style={{marginTop: "20px"}}></div>
        <Container> 
            <Grid container>
            <Grid item xs={12} md={6}>
            <Typography mt={4} sx={{fontWeight: "bold"}} variant='h4'>CONTACTANOS!</Typography>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Email" secondary="prensa@adip.com.ar"  />
                <Button variant='outlined' target='_blank' href="mailto:prensa@adip.com.ar" size='small'>Enviar correo</Button>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <InstagramIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Instagram" secondary="@adipoficial" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FacebookIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Facebook" secondary="adipoficial" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <MusicNoteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Tik Tok" secondary="@adipoficial" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <TwitterIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Twitter" secondary="@adipoficial" />
              </ListItem>
            </List>
            </Grid>
          

            <Grid item xs={12} md={6}>
            <Typography mt={4} sx={{fontWeight: "bold"}} variant='h4'>UBICACIÓN</Typography>
            <List sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
              }}>
            <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SportsSoccerIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="CLUB A.D.I.P." secondary="485 y 10, Gonnet" />
                <Button variant='outlined' href='https://maps.app.goo.gl/zoBrN2wAPQwWDgdv8' target='_blank' size='small'>¿Cómo llegar?</Button>
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocationOnOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="SEDE SOCIAL" secondary="8 y 526, Tolosa" />
                <Button variant='outlined' href='https://maps.app.goo.gl/EAhVkzdG4Cz2xLG66' target='_blank' size='small'>¿Cómo llegar?</Button>
              </ListItem>
            </List>
            </Grid>

            </Grid>
        </Container>  
    </div>
  )
}

export default ClubContacto