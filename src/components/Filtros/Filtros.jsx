import { Check, CheckBox } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Container, MenuItem, Select, Typography, FormControl, InputLabel, TextField, Box, FormLabel } from "@mui/material";
/* eslint-disable no-unused-vars */
import { CheckBox } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Container, MenuItem, Select, Typography, FormControl, InputLabel, TextField, Box } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fontStyle } from "@mui/system";
import FiltroDeFechas from '../FiltroDeFechas/FiltroDeFechas'

export default function Filtros(){
    const [state, setState] = useState({
        femenino: false,
        masculino: false,
        infantiles: false,
        inferiores: false, 
        recreativo: false,
    });


    const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      }; 


  const [orderBy, setOrderBy] = useState('');

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const { femenino, masculino, infantiles, inferiores, recreativo } = state;

    
    return(
        <Container>
        <Box m={2} sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Filtrar por categoría</FormLabel>
                <FormControlLabel
                control={
                <CheckBox checked={femenino} onChange={handleChange} name="femenino" />
                }
                label="Femenino"
                />
                <FormControlLabel
                control={
                <CheckBox checked={masculino} onChange={handleChange} name="masculino" />
                }
                label="Masculino"
                />
                <FormControlLabel
                control={
                <CheckBox checked={infantiles} onChange={handleChange} name="infantiles" />
                }
                label="Infantiles"
                />
                <FormControlLabel
                control={
                <CheckBox checked={inferiores} onChange={handleChange} name="inferiores" />
                }
                label="Inferiores"
                />
                <FormControlLabel
                control={
                <CheckBox checked={recreativo} onChange={handleChange} name="recreativo" />
                }
                label="Recreativo"
                />
            </FormControl>
        </Box>
       
        <Box mt={3}>
            <TextField variant="standard" fullWidth id="outlined-select-order" select label="Ordenar por" defaultValue="Más reciente">
                <MenuItem value="latest">Más reciente</MenuItem>
                <MenuItem value="oldest">Más antiguo</MenuItem>
            </TextField>
        </Box>
        <Box mt={3}>
            <Typography>Filtrar por fecha</Typography>
        </Box>
      <Box mt={3}>
        <FiltroDeFechas />
      </Box>
    </Container>
    )
}