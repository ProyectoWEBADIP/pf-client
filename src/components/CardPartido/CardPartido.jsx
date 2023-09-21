/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Button, Input, Paper, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
export default function CardPartido({
   title,
   competence,
   Local_shield,
   visitor_shield,
   date,
   location,
   description,
   home_goals,
   visitor_goals,
   category_name,
}) {
   const [detalles, setDetalles] = useState(false);
   const [editar, setEditar] = useState(false);
   const [partidoModificado, setPartidoModificado] = useState({
      competence,
      Local_shield,
      visitor_shield,
      date,
      location,
      description,
      home_goals,
      visitor_goals,
   });

   const handleDetail = () => {
      setDetalles(!detalles);
   };

   return (
      <Paper elevation={3}>
         {detalles ? (
            <Box
               padding={1}
               overflow={"auto"}
               maxHeight={"13.5rem"}
               width={"13.5rem"}
            >
               <Box>
                  <p style={{ marginBottom: "10px" }}>
                     {partidoModificado.description}
                  </p>
               </Box>
               <Box sx={{ mt: 1 }}>
                  <Button sx={{ height: "30px" }} onClick={handleDetail}>
                     Ver Tarjeta
                  </Button>
               </Box>
            </Box>
         ) : (
            <Box padding={1}>
               <Typography variant="h5" fontWeight="bold">
                  {title}
               </Typography>
               <Typography variant="body1" fontWeight="light">
                  {category_name}
               </Typography>
               {editar ? (
                  <Input
                     value={partidoModificado.competence}
                     name="competence"
                  />
               ) : (
                  <Typography variant="body2" fontWeight="bold">
                     {competence}
                  </Typography>
               )}
               <Toolbar>
                  <div style={{ marginRight: "10px" }}>
                     <img
                        src={Local_shield}
                        alt="logo"
                        style={{
                           width: "60px",
                           height: "60px",
                           objectFit: "cover",
                        }}
                     />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                     <Typography variant="h6">
                        {title === "Proximo" ? null : home_goals}
                     </Typography>
                     <Typography variant="h6" style={{ margin: "0 5px" }}>
                        {title === "Proximo" ? "vs" : "-"}
                     </Typography>
                     <Typography variant="h6">
                        {title === "Proximo" ? null : visitor_goals}
                     </Typography>
                  </div>
                  <div style={{ marginLeft: "10px" }}>
                     <img
                        src={visitor_shield}
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
                  {date}
               </Typography>
               <Typography variant="body2" fontWeight="light">
                  {location}
               </Typography>

               <Button size="xs" onClick={handleDetail}>
                  Ver detalle
               </Button>
            </Box>
         )}
      </Paper>
   );
}
