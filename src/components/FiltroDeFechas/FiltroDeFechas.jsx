/* eslint-disable no-unused-vars */
import { Box, Divider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { filteredNoticias } from '../../redux/noticiasActions/noticiasActions';
import './filtroFecha.css'
function FiltroDeFechas() {
  //!HOOKS
  const dispatch = useDispatch()
  //!HOOKS

  const [valueStart, setValueStart] = useState('');
  const [valueEnd, setValueEnd] = useState('');
  let startDate;
  let endDate;
  const handleChangeStart = (newValue) => {
    const fechaStringStart = newValue
      ? dayjs(newValue).format('YYYY-MM-DD')
      : '';
    startDate = Date.parse(`${fechaStringStart}T00:00:00.000Z`);
  };

  const handleChangeEnd = (newValue) => {
    const fechaStringEnd = newValue ? dayjs(newValue).format('YYYY-MM-DD') : '';
    endDate = Date.parse(`${fechaStringEnd}T00:00:00.000Z`);
  };

  function handleSearch() {
    dispatch(filteredNoticias(startDate,endDate))
  }
  const today = dayjs();

  return (
    <Box className='filterCont'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          slotProps={{ textField: { variant: 'outlined' } }}
          label="Desde..."
          value={valueStart}
          onChange={handleChangeStart}
          maxDate={today}
        />
        <DatePicker
          slotProps={{ textField: { variant: 'outlined' } }}
          value={valueEnd}
          label="Hasta..."
          onChange={handleChangeEnd}
          maxDate={today}
        />
      </LocalizationProvider>

      <Box >
        <Button onClick={handleSearch} variant="contained">Buscar</Button>
      </Box>
    </Box>
  );
}

export default FiltroDeFechas;
