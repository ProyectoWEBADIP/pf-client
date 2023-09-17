import { Link } from "react-router-dom";
import CardPartido from "../CardPartido/CardPartido";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

export default function CardPartidoContainer() {
  const info = useSelector((state) => state.partidos);

  return (
    <Box>
      {info?.map((info, i) => (
        <Box key={i} marginBottom={2} sx={{ marginRight: "10px" }}>
          <CardPartido
            title={info.title}
            category_name={info.category_name}
            competence={info.competence}
            Local_shield={info.Local_shield}
            visitor_shield={info.visitor_shield}
            date={info.date}
            location={info.location}
            description={info.description}
            home_goals={info.home_goals}
            visitor_goals={info.visitor_goals}
          />
        </Box>
      ))}
      <Link to={"/editarPartidos"}>Editar</Link>
    </Box>
  );
}
