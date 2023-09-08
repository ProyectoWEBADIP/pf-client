/* eslint-disable no-unused-vars */
import { Check, CheckBox } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  MenuItem,
  Select,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  Box,
  FormLabel,
  FormGroup,
  Divider,
  RadioGroup,
  Radio,
} from '@mui/material';
/* eslint-disable no-unused-vars */
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fontStyle } from '@mui/system';
import FiltroDeFechas from '../FiltroDeFechas/FiltroDeFechas';
import { useSelector, useDispatch } from 'react-redux';
import { getNoticiasByCategory } from '../../redux/noticiasActions/noticiasActions';
import { getAllNoticias } from '../../redux/noticiasActions/noticiasActions';
import './filtros.css';
export default function Filtros() {
  // const [state, setState] = useState({
  //     femenino: false,
  //     masculino: false,
  //     infantiles: false,
  //     inferiores: false,
  //     recreativo: false,
  // });

  const dispatch = useDispatch();
  const handleChange = (event) => {
    if (event.target.value === 'Default') {
      dispatch(getAllNoticias());
    } else {
      dispatch(getNoticiasByCategory(event.target.value));
    }
  };

  // const [orderBy, setOrderBy] = useState('');

  // const handleOrderByChange = (event) => {
  //   setOrderBy(event.target.value);
  // };

  // const { femenino, masculino, infantiles, inferiores, recreativo } = state;
  const categorias = useSelector((state) => state.categorias);

  return (
    <Container className="containerFiltros">
      <Box className="catFilterCont">

          <Typography className="type">Filtrar por categoría</Typography>

        <FormControl fullWidth>
     

          <InputLabel id="demo-simple-select-label">Categorías</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Categorías"
            onChange={handleChange}
          >
            <MenuItem value="Default">Todas</MenuItem>
            {categorias?.map((el) => {
              return (
                <MenuItem key={el.id} value={el.id}>
                  {el.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box className="fechaFilterCont">
        
          <Typography className="type">Filtrar por fecha</Typography>
      
        <Divider />
        <Box className='filtroFechaCont'>
          <FiltroDeFechas />
        </Box>
      </Box>
    </Container>
  );
}
