/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import Button from "@mui/material/Button";
import dayjs from "dayjs";

function FiltroDeFechas() {
  const [valueStart, setValueStart] = useState(null);
  const [valueEnd, setValueEnd] = useState(null);

  const handleChangeStart = (newValue) => {
    setValueStart(newValue);
    const fechaStringStart = newValue ? dayjs(newValue).format("YYYY-MM-DD") : "";
  };

  const handleChangeEnd = (newValue) => {
    setValueEnd(newValue);
    const fechaStringEnd = newValue ? dayjs(newValue).format("YYYY-MM-DD") : "";
  };

  const today = dayjs()

  return (
    <Box>
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

      <Box mt={1}>
        <Button variant="contained" >Buscar</Button>
      </Box>
    </Box>
  );
}

export default FiltroDeFechas;
