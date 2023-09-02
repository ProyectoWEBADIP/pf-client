/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../Searchbar/SearchBar";
import Notificaciones from "../Notificaciones/Notificaciones";
import "./navbar.css";
import { AppBar, Toolbar, Typography, Button, IconButton, Box  } from "@mui/material";
import logo from "../../assets/Escudo ADIP sin fondo.png"
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { logout } from "../../redux/login-registerActions/loginActions";
import { useDispatch } from "react-redux";



const Navbar = () => {
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const access_token = localStorage.access_token
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function logOut() {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <>
    <AppBar position="fixed" >
      <Toolbar>
        <div className="contImg">
          <img src={logo} alt="logo"/>
        </div>
    
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
          A.D.I.P.
        </Typography>
    
        <Button href="/" color="inherit">HOME</Button>

            
        <Button href="/crearNoticia" color="inherit">Crear Noticia</Button>

      

      <SearchBar />
      {/* <Box sx={{ flexGrow: 1 }} />
       */}
      <Notificaciones />
      
      
      {auth && (
      <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                sx={{ mt: '45px' }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                { access_token ? (
                  <div>
                  <MenuItem onClick={handleClose}><Button href="/miPerfil">Mi Perfil</Button></MenuItem>
                  <MenuItem><Button onClick={() => logOut()}>Cerrar sesión</Button></MenuItem>
                  </div>
                ) : (
                  <MenuItem onClick={handleClose}><Button href="/login" >Log in</Button></MenuItem>  
                )}
                                
              </Menu>
            </div>
      )}
      
      </Toolbar>
    </AppBar>
    
     <div style={{ marginTop: '80px' }}/>
    </>
  );
};

export default Navbar;
