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

import { api } from "../API backend/api";



import MenuList from "@mui/material/MenuList";
import ListadoEventos from "./ListadoEventos";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    obtenerEventos();
  }, []);

  const obtenerEventos = async () => {
    const response = await api.obtenerEventos();
    setEventos(response.data);
  };

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
        <ListadoEventos eventos={eventos}></ListadoEventos>
      </Grid>
    </Box>
  );
}

export default Eventos;
