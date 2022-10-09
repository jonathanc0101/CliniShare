import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";


function ListadoPacientes() {

    const [pacientes, setPaciente] = useState([]);
  
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
              {/* {eventos.map((evento) => (
                <TableRow
                  key={evento.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  <Link to={"/eventos/ver/id/" + evento.id}>
                      <VisibilityIcon color="info"></VisibilityIcon>
                    </Link>
                  </TableCell>
                  <TableCell>{evento.id}</TableCell>
                  <TableCell>{evento.titulo}</TableCell>
                  <TableCell>{evento.descripcion}</TableCell>
                  <TableCell>

                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link to={"/eventos/id/" + evento.id}>
                      <EditIcon color="info"></EditIcon>
                    </Link>
                  </TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default ListadoPacientes;
