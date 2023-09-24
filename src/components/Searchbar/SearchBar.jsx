/* eslint-disable no-unused-vars */
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useDispatch } from "react-redux";
import { getNoticiasByTitle } from "../../redux/noticiasActions/noticiasActions";

const Search = styled("div")(({ theme }) => ({
   position: "relative",
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginRight: theme.spacing(2),
   marginLeft: 0,
   width: "100%",
   [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
   },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: "100%",
   position: "absolute",
   pointerEvents: "none",
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
}));
const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
   fontSize: "2vw",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: "inherit",
   "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
         width: "20ch",
      },
      fontSize: "1.8vw",
   },
}));

export default function SearchBar() {
   const dispatch = useDispatch();
   const handleChange = (event) => {
      dispatch(getNoticiasByTitle(event.target.value));
   };
   return (
      <>
         <Search>
            <SearchIconWrapper>
               <StyledSearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
               placeholder="Buscar noticias..."
               inputProps={{ "aria-label": "search" }}
               onChange={handleChange}
            />
         </Search>
      </>
   );
}
