import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { api } from "../API backend/api";
import Grid from "@mui/material/Unstable_Grid2";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

function EventosDePaciente(params) {
  const [eventos, setEventos] = useState([]);
  const [eventosVacios, setEventosVacios] = useState(false);

  const formatearFecha = (fechaDeEvento) => {
    let fecha = new Date(fechaDeEvento);
    let dia = `${fecha.getDate()}`.padStart(2, "0");
    let mes = `${fecha.getMonth() + 1}`.padStart(2, "0");
    let anio = fecha.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    return fechaFormateada;
  };

  useEffect(() => {
    const obtenerEventosPorPacienteId = async () => {
      const response = await api.obtenerEventosCompletosPorPacienteId(params.id);
      if (response.data.length !== 0) {
        setEventos(response.data);
      } else {
        setEventosVacios(true);
      }
    };
    obtenerEventosPorPacienteId();
  }, [params.id]);

  return (
    <>
      {eventosVacios ? (
        <div>No hay ningún evento</div>
      ) : (
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <h4>&nbsp;&nbsp;Historia clínica</h4>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Importante</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Médico</TableCell>
                  <TableCell align="center" >Editar</TableCell>
                  <TableCell align="center" >Ver</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventos.map((evento) => (
                  <TableRow
                    key={evento.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{evento.importante ? 
                    <CheckCircleOutlineRoundedIcon></CheckCircleOutlineRoundedIcon>
                    : "No"}</TableCell>
                    <TableCell>{evento.titulo}</TableCell>
                    <TableCell>{formatearFecha(evento.fecha)}</TableCell>
                    <TableCell>{evento.descripcion}</TableCell>
                    <TableCell>{evento.medico.nombre} {evento.medico.apellido}</TableCell>
                    <TableCell align="center" component="th" scope="row">
                      <Link to={"/eventos/id/" + evento.id}>
                        <EditIcon color="info"></EditIcon>
                      </Link>
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      <Link to={"/eventos/ver/id/" + evento.id}>
                        <VisibilityIcon color="info"></VisibilityIcon>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </>
  );
}

export default EventosDePaciente;
