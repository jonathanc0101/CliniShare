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
import VisibilityIcon from "@mui/icons-material/Visibility";
import Menu from "./Menu";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
        <Grid xs={12}>
          <Item style={{ color: "inherit" }}>
            Mis pacientes
          </Item>
        </Grid>
      </Grid>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Menu></Menu>

        <Grid xs={10}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineTwoToneIcon />}
          >
            <Link
              to={"/pacientes/new/"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Agregar paciente
            </Link>
          </Button>
          <br></br>

          <br></br>

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
                      <Link to={"/pacientes/ver/id/" + paciente.id}>
                        <VisibilityIcon color="info"></VisibilityIcon>
                      </Link>
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
      </Grid>
    </>
  );
}

export default ListadoPacientes;
