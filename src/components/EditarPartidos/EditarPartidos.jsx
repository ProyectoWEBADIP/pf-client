import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
   Box,
   Button,
   Container,
   FormControl,
   Grid,
   MenuItem,
   Paper,
   Select,
   TextField,
   Toolbar,
   Typography,
} from "@mui/material";
import {
   getAllMatch,
   updateMatch,
} from "../../redux/partidosActions/partidosActions";
// import SelectInput from "@mui/material/Select/SelectInput";

export default function EditarPartidos() {
   const dispatch = useDispatch();
   const [imagenLocal, setImagenLocal] = useState(null);
   const [imagenVisitante, setImagenVisitante] = useState(null);
   const [partidoModificado, setPartidoModificado] = useState({
      competence: "",
      Local_shield: "",
      visitor_shield: "",
      date: "",
      location: "",
      description: "",
      home_goals: 0,
      visitor_goals: 0,
   });
   const partidos = useSelector((state) => state.partidos);

   useEffect(() => {
      dispatch(getAllMatch());
   }, [dispatch]); //! modifivado para probar

   const handleSelectImageLocal = async () => {
      if (imagenLocal) {
         try {
            const formData = new FormData();
            formData.append("file", imagenLocal);
            formData.append("upload_preset", "Escudos");
            formData.append("cloud_name", "drpdobxfu");

            const { data } = await axios.post(
               "https://api.cloudinary.com/v1_1/drpdobxfu/image/upload",
               formData
            );

            setPartidoModificado({
               ...partidoModificado,
               Local_shield: data.secure_url,
            });
            alert("Subida con  exito!");
         } catch (error) {
            alert("Error al subir la imagen");
         }
      } else {
         alert("Debe subir una imagen");
      }
   };
   const handleSelectImageVisitante = async () => {
      if (imagenVisitante) {
         try {
            const formData = new FormData();
            formData.append("file", imagenVisitante);
            formData.append("upload_preset", "Escudos");
            formData.append("cloud_name", "drpdobxfu");

            const { data } = await axios.post(
               "https://api.cloudinary.com/v1_1/drpdobxfu/image/upload",
               formData
            );

            setPartidoModificado({
               ...partidoModificado,
               visitor_shield: data.secure_url,
            });
            alert("Subida con  exito!");
         } catch (error) {
            alert("Error al subir la imagen");
         }
      } else {
         alert("Debe subir una imagen");
      }
   };
   const handleSelect = (event) => {
      const selectedValue = event.target.value;
      setSelectedOption(selectedValue); // Actualiza el estado con la opción seleccionada
      const partido = partidos.find((el) => el.id === selectedValue);
      setPartidoModificado(partido);
   };
   const handleChange = (event) => {
      setPartidoModificado({
         ...partidoModificado,
         [event.target.name]: event.target.value,
      });
   };
   const handleSubmit = () => {
      dispatch(updateMatch(partidoModificado.id, partidoModificado));
   };

   const [selectedOption, setSelectedOption] = useState("");

   return (
      <div
         style={{
            display: "flex",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <Grid container spacing={{ md: 2 }} alignContent={"center"}>
            <Grid item xs={12} sm={12} md={6} marginBottom={5}>
               <Container>
                  <Typography variant="body" fontWeight={"bold"}>
                     Modificar tarjeta de partidos 🛠️
                  </Typography>
                  <br />
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                     <Select
                        onChange={handleSelect}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={selectedOption}
                        sx={{ width: "100%", mt: 3 }}
                        displayEmpty
                        MenuProps={{
                           PaperProps: {
                              style: {
                                 backgroundColor: "white",
                              },
                           },
                        }}
                     >
                        <MenuItem value="" disabled>
                           Selecciona una tarjeta
                        </MenuItem>
                        {partidos?.map((el) => (
                           <MenuItem key={el.id} value={el.id}>
                              {el.title} {el.category_name}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
                  <br />

                  <TextField
                     onChange={handleChange}
                     type="text"
                     value={partidoModificado.competence}
                     name="competence"
                     label="Competencia"
                     margin="normal"
                     size="small"
                     sx={{ m: 1 }}
                  />
                  <TextField
                     onChange={handleChange}
                     type="text"
                     value={partidoModificado.date}
                     name="date"
                     label="Fecha"
                     margin="normal"
                     size="small"
                     sx={{ m: 1 }}
                  />
                  <TextField
                     onChange={handleChange}
                     type="text"
                     value={partidoModificado.location}
                     name="location"
                     label="Ubicación"
                     margin="normal"
                     size="small"
                     sx={{ m: 1 }}
                  />
                  <TextField
                     onChange={handleChange}
                     type="text"
                     value={partidoModificado.description}
                     name="description"
                     label="Descripción"
                     margin="normal"
                     size="small"
                     sx={{ m: 1 }}
                  />
                  <TextField
                     onChange={handleChange}
                     type="text"
                     value={partidoModificado.home_goals}
                     name="home_goals"
                     label="Goles del equipo Local"
                     margin="normal"
                     size="small"
                     sx={{ m: 1 }}
                  />
                  <TextField
                     onChange={handleChange}
                     type="text"
                     value={partidoModificado.visitor_goals}
                     name="visitor_goals"
                     label="Goles del equipo Visitante"
                     margin="normal"
                     size="small"
                     sx={{ m: 1 }}
                  />
                  <Toolbar>
                     <TextField
                        type="file"
                        name="Local_shield"
                        label="Escudo equipo Local"
                        focused
                        margin="normal"
                        onChange={() => setImagenLocal(event.target.files[0])}
                        size="small"
                        sx={{ m: 1 }}
                     />
                     <Button
                        size="xs"
                        variant="outlined"
                        sx={{
                           marginLeft: "5px",
                           fontSize: "15px",
                           alignContent: "center",
                        }}
                        onClick={handleSelectImageLocal}
                     >
                        Subir
                     </Button>
                  </Toolbar>
                  <Toolbar>
                     <TextField
                        type="file"
                        name="visitor_shield"
                        label="Escudo equipo Visitante"
                        focused
                        margin="normal"
                        onChange={() =>
                           setImagenVisitante(event.target.files[0])
                        }
                        size="small"
                        sx={{ m: 1 }}
                     />
                     <Button
                        size="xs"
                        variant="outlined"
                        sx={{
                           marginLeft: "5px",
                           fontSize: "15px",
                           alignContent: "center",
                        }}
                        onClick={handleSelectImageVisitante}
                     >
                        Subir
                     </Button>
                  </Toolbar>
                  <Button variant="contained" onClick={handleSubmit}>
                     Guardar
                  </Button>
               </Container>
            </Grid>

            <Grid item md={6} alignItems="center" justifyContent="center">
               <Container>
                  <Paper
                     elevation={3}
                     sx={{
                        maxWidth: "250px",
                        minHeight: "300px",
                        display: "flex",
                        justifyContent: "center",
                     }}
                  >
                     <Box padding={2}>
                        <Typography variant="h5" fontWeight="bold">
                           {partidoModificado.title}
                        </Typography>
                        <Typography variant="body1" fontWeight="light">
                           {partidoModificado.category_name}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                           {partidoModificado.competence}
                        </Typography>
                        <Toolbar>
                           <div style={{ marginRight: "10px" }}>
                              <img
                                 src={partidoModificado.Local_shield}
                                 alt="logo"
                                 style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                 }}
                              />
                           </div>
                           <div
                              style={{ display: "flex", alignItems: "center" }}
                           >
                              <Typography variant="h6">
                                 {partidoModificado.title === "Proximo"
                                    ? null
                                    : partidoModificado.home_goals}
                              </Typography>
                              <Typography
                                 variant="h6"
                                 style={{ margin: "0 5px" }}
                              >
                                 {partidoModificado.title === "Proximo"
                                    ? "vs"
                                    : "-"}
                              </Typography>
                              <Typography variant="h6">
                                 {partidoModificado.title === "Proximo"
                                    ? null
                                    : partidoModificado.visitor_goals}
                              </Typography>
                           </div>
                           <div style={{ marginLeft: "10px" }}>
                              <img
                                 src={partidoModificado.visitor_shield}
                                 alt="logo"
                                 style={{
                                    width: "60px",
                                    height: "60px",
                                    objectFit: "cover",
                                 }}
                              />
                           </div>
                        </Toolbar>
                        <Typography variant="body2" fontWeight="bold">
                           {partidoModificado.date}
                        </Typography>
                        <Typography
                           variant="body2"
                           fontWeight="light"
                           sx={{ mt: 1 }}
                        >
                           {partidoModificado.location}
                        </Typography>
                     </Box>
                  </Paper>
               </Container>
            </Grid>
         </Grid>
      </div>
   );
}
