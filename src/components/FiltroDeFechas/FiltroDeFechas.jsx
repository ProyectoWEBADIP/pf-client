import { Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import Button from '@mui/joy/Button';
import dayjs from "dayjs";

function FiltroDeFechas() {
  const [valueStart, setValueStart] = useState({});
  const [valueEnd, setValueEnd] = useState({});

  const handleSearchClick = () => {
    const dateString1 = valueStart ? dayjs(valueStart).format("DD-MM-YYYY") : "";
    const dateString2 = valueEnd ? dayjs(valueEnd).format("DD-MM-YYYY") : "";

    console.log("Fecha 1:", dateString1);
    console.log("Fecha 2:", dateString2);
  };

  return (
    <Box>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Desde..."
          value={valueStart}
          onChange={(newValue) => setValueStart(newValue)}
          renderInput={(props) => <TextField {...props} />}
        />

        <DatePicker
          value={valueEnd}
          label="Hasta..."
          onChange={(newValue) => setValueEnd(newValue)}
          renderInput={(props) => <TextField {...props} />}
        />

      </LocalizationProvider>

      <Button
        color="primary"
        disabled={false}
        onClick={handleSearchClick}
        size="sm"
        variant="soft"
      >Busqueda</Button>

    </Box>
  );
}

export default FiltroDeFechas;
