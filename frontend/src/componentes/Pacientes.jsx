import {
  Box,
  Button,
  ButtonGroup,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";

import { api } from "../API backend/api";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import MenuList from "@mui/material/MenuList";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Pacientes() {
  const [eventos, setEventos] = useState([]);
  const [medicoNombre, setMedicoNombre] = useState([]);
  const [medicoApellido, setMedicoApellido] = useState([]);

  useEffect(() => {
    obtenerEventos();
  }, []);

  const obtenerEventos = async () => {
    const response = await api.obtenerEventos();
    setEventos(response.data);
  };

  // const obtenerMedicoByDni = async () => {
  //   const response = await api.obtenerMedicoByDni(1000);
  //   setMedicoNombre(response.nombre);
  //   setMedicoApellido(response.apellido);
  // };

  const print = () => {
    console.log("se van a mostrar los pacientes ");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
        <Grid xs={12}>
          <Item>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button>
                <Link to="/eventos/new" className="btn btn-dark">
                  Agregar
                </Link>
              </Button>
              <Button>
                <Link to="/eventos/id" className="btn btn-dark">
                  Modificar
                </Link>
              </Button>
            </ButtonGroup>
          </Item>
        </Grid>
      </Grid>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={2}>
          <Paper square={true}>
            <MenuList>
              <MenuItem>Menú</MenuItem>
              <MenuItem onClick={print}>Mis pacientes</MenuItem>
              <MenuItem>Mis medicos</MenuItem>
            </MenuList>
          </Paper>
        </Grid>
        <Grid xs={10}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ver evento</TableCell>
                  <TableCell>N° evento</TableCell>
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
                      Ojito
                    </TableCell>
                    <TableCell>{evento.id}</TableCell>
                    <TableCell>{evento.titulo}</TableCell>
                    <TableCell>{evento.descripcion}</TableCell>
                    <TableCell>{medicoNombre} {medicoApellido}</TableCell>
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
        </Grid>
      </Grid>
    </Box>
  );
}
{
  /* <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button>
                  <Link to="/eventos/new" className="btn btn-dark">
                    Agregar
                  </Link>
                </Button>
                <Button>
                  <Link to="/eventos/id" className="btn btn-dark">
                    Modificar
                  </Link>
                </Button>
              </ButtonGroup> */
}

export default Pacientes;
