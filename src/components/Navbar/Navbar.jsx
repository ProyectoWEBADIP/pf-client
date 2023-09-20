/* eslint-disable no-unused-vars */
import { React } from "react";
import SearchBar from "../Searchbar/SearchBar";
import Notificaciones from "../Notificaciones/Notificaciones";
import "./navbar.css";
import { AppBar } from "@mui/material";
import { SwichtThemes } from "../ModeThemes/SwichtThemes";
import { StyledToolbar } from "./StyledToolBar/StyledToolbar";
import AccountMenu from "./AccountMenu/AccountMenu";
import { MenuItems } from "./Menu/MenuItems";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Navbar = ({ themeMode, toggleThemeMode }) => {
  const location = useLocation()
  return (
    <>
      <AppBar
        className="conteinNavBar"
        sx={{
          position:
            location.pathname !== "/login" &&
            location.pathname !== "/club/historia" &&
            location.pathname !== "/login/recuperacion" &&
            location.pathname !== "/login/SignUp"
              ? "fixed"
              : "static",
        }}
      >
        <StyledToolbar>
          <div>
            <MenuItems />
          </div>
          <div className="conteinOrder">
            <SwichtThemes
              themeMode={themeMode}
              toggleThemeMode={toggleThemeMode}
            />
            <SearchBar />
            <Notificaciones />
            <AccountMenu />
          </div>
        </StyledToolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
