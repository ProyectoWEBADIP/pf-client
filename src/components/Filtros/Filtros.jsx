/* eslint-disable no-unused-vars */
import { CheckBox } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Container, MenuItem, Select, Typography, FormControl, InputLabel, TextField, Box } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Filtros(){
    const [checked, setChecked] = useState([false, false, false, false, false]);

    const handleChange = (index) => (event) => {
        const newChecked = [...checked];
        newChecked[index] = event.target.checked;
        setChecked(newChecked);
      };


    const categorias = [
    { label: 'Eventos', index: 0 },
    { label: 'Femenino', index: 1 },
    { label: 'Inferiores', index: 2 },
    { label: 'Institucional', index: 3 },
    { label: 'Masculino', index: 4 },
  ];

  const checkboxesContent = categorias.map((checkbox) => (
    <FormControlLabel
      key={checkbox.index}
      label={checkbox.label}
      control={
        <CheckBox checked={checked[checkbox.index]} onChange={handleChange(checkbox.index)} />
      }
    />
  ));


  const [orderBy, setOrderBy] = useState('');

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };


    
    return(
        <Container>
        
        <Box>
            <Typography>Filtrar categorías</Typography>
        </Box>
       

        <Box mt={3}>
            <TextField variant="standard" fullWidth id="outlined-select-order" select label="Ordenar por" defaultValue="Más reciente">
                <MenuItem value="latest">Más reciente</MenuItem>
                <MenuItem value="oldest">Más antiguo</MenuItem>
            </TextField>
        </Box>

       
    </Container>
    )
}