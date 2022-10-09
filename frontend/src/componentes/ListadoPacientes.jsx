import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { api } from "../API backend/api";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';

function ListadoPacientes() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    obtenerPacientes();
  }, []);

  const obtenerPacientes = async () => {
    const response = await api.obtenerPacientes();
    setPacientes(response.data);
  };
  return (
    <>
      <Grid xs={10}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ver paciente</TableCell>

                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pacientes.map((paciente) => (
                <TableRow
                  key={paciente.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                  {/* <Link to={"/eventos/ver/id/" + evento.id}> */}
                      <VisibilityIcon color="info"></VisibilityIcon>
                    {/* </Link> */}
                  </TableCell>
                  <TableCell>{paciente.nombre}</TableCell>
                  <TableCell>{paciente.apellido}</TableCell>
                  <TableCell>{paciente.dni}</TableCell>
                  <TableCell component="th" scope="row">
                    <Link to={"/pacientes/id/" + paciente.id}>
                      <EditIcon color="info"></EditIcon>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default ListadoPacientes;
