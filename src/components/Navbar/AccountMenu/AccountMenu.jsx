/* eslint-disable react/jsx-no-undef */
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/login-registerActions/loginActions";
import { Link, useNavigate } from "react-router-dom";
import './accMenu.css'
export default function AccountMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = localStorage.userId;
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function logOut() {
    dispatch(logout());
    navigate("/login");
  }
  const access_token = localStorage.access_token;

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Perfil">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>P</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {access_token ? (
          <div >
            <MenuItem onClick={handleClose}>
             <div className="perfil-nav-cont">
             <Link to={`/${id}/profile`}>
                <div className="perfil-nav-cont">
                <span><Avatar /> <span>Mi perfil</span></span>
                </div>
              </Link>
             </div>
            </MenuItem>

            <Divider />
            {/* <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Configuración
            </MenuItem> */}
            <MenuItem onClick={() => logOut()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </div>
        ) : (
          <MenuItem onClick={handleClose}>
            <Link to="/login" >Iniciar sesión</Link>
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}
