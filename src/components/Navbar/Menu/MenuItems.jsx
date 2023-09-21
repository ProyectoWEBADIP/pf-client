import HomeIcon from "@mui/icons-material/Home";
import FutbolMenu from "./DownMenu/FútbolDownMenu";
import ClubMenu from "./DownMenu/ClubDownMenu";
import { Link } from "react-router-dom";
import "./MenuItems.css";
import SocioMenu from "./DownMenu/SocioDownMenu";
import PatrocinioMenu from "./DownMenu/PatrocinioDownMenu";
import { Box, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import  NoticiasMenu  from "./DownMenu/NoticiasDownMenu"

export const MenuItems = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <MenuIcon
        sx={{ display: { xs: "block", sm: "block", md: "none" } }}
        onClick={() => setOpen(!open)}
      ></MenuIcon>
      <Menu
        id="basic-menu"
        open={open}
        onClose={() => setOpen(!open)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ width: 200, height: "50vh" }}>
          <Link to="/">
            <HomeIcon sx={{ fontSize: "45px" }} />
          </Link>
          <FutbolMenu />
          <ClubMenu />
          {/* <PatrocinioMenu /> */}
          <SocioMenu />
          <NoticiasMenu/>
        </Box>
      </Menu>
      <Box
        className="conteinMenu"
        sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
      >
        <Link to="/">
          <HomeIcon sx={{ fontSize: "45px" }} />
        </Link>
        <FutbolMenu />
        <ClubMenu mode />
        {/* <PatrocinioMenu /> */}
        <SocioMenu />
        <NoticiasMenu/>
      </Box>
    </div>
  );
};
