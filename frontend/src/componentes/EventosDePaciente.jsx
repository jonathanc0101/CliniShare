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

function EventosDePaciente(params) {
  const [eventos, setEventos] = useState([]);
  const [eventosVacios, setEventosVacios] = useState(false);


  useEffect(() => {
    const obtenerEventosPorPacienteId = async () => {
      const response = await api.obtenerEventosPorPacienteId(params.id);
      console.log(response);
      if (response.data.length === 0){
        setEventosVacios(true);
      }else{
      setEventos(response.data);
    }
    };
    obtenerEventosPorPacienteId();
    }, [params.id]);



  return (
    <>
    {eventosVacios ? <div>No hay eventos</div>:
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1250 }} aria-label="simple table">
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
      </TableContainer> }
    </>
  );
}

export default EventosDePaciente;
