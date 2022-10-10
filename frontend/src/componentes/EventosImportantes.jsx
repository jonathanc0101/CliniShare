import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { api } from "../API backend/api";

function EventosImportantes(params) {
  
  const [eventosImportantes, setEventosImportantes] = useState([]);

  useEffect(() => {
    const obtenerEventosImportantes = async () => {
      const response =
        await api.obtenerEventosCompletosImportantesPorPacienteId(params.id);
      console.log(response);

      setEventosImportantes(response.data);
    };
    obtenerEventosImportantes();
  }, [params.id]);

  return (
    <>
      <Typography component="h5" variant="h6" align="center">
        Eventos importantes
      </Typography>
      <List sx={{ width: "50%", maxWidth: 700, bgcolor: "background.paper" }}>
        {eventosImportantes.map((evento) => (
          <ListItem
            key={evento.id}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment">
                <VisibilityIcon />
              </IconButton>
            }
          >
            <ListItemText primary={`${evento.titulo}`} />
          </ListItem>
        ))}
      </List>
      {/* <Grid xs={10}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ver evento</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Médico</TableCell>
                <TableCell>Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventos.map((evento) => (
                  <TableRow
                    key={evento.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link to={"/eventos/ver/id/" + evento.id}>
                        <VisibilityIcon color="info"></VisibilityIcon>
                      </Link>
                    </TableCell>
                    <TableCell>{evento.titulo}</TableCell>
                    <TableCell>{evento.descripcion}</TableCell>
                    <TableCell></TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={"/eventos/id/" + evento.id}>
                        <EditIcon color="info"></EditIcon>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid> */}
    </>
  );
}

export default EventosImportantes;
