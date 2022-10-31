import { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { api } from "../API backend/api";
import Grid from "@mui/material/Unstable_Grid2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

function EventosImportantes(params) {
  const [eventosImportantes, setEventosImportantes] = useState([]);

  useEffect(() => {
    const obtenerEventosImportantes = async () => {
      const response =
        await api.obtenerEventosCompletosImportantesPorPacienteId(params.id);

      setEventosImportantes(response.data);
    };
    obtenerEventosImportantes();
  }, [params.id]);

  return (
    <>
      <Grid xs={5}>
        <ListItemText
          style={{
            textAlign: "center",
            color: "white",
            background: "#66B2FF",
            fontStyle: "bold",
          }}
          sx={{ my: 0 }}
          primary="Eventos importantes"
          primaryTypographyProps={{
            fontSize: 20,
            fontWeight: "medium",
            letterSpacing: 0,
          }}
        />
        <List
          sx={{
            width: "100%",
            maxWidth: 660,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 100,
          }}
        >
          {eventosImportantes.map((evento) => (
            <ListItem style={{ textAlign: "center" }} key={`${evento.id}`}>
              <ListItemText primary={`${evento.titulo}`} />
              <Link to={"/eventos/ver/id/" + evento.id}> 
                <VisibilityIcon color="info"></VisibilityIcon>
              </Link>
            </ListItem>
          ))}
        </List>
      </Grid>
    </>
  );
}

export default EventosImportantes;
