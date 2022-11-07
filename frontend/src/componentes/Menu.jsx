import MenuList from "@mui/material/MenuList";
import { MenuItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [verEventos, setVerEventos] = useState(false);
  const [verPacientes, setVerPacientes] = useState(false);

  const handleListadoEventos = () => {
    setVerPacientes(false);
    setVerEventos(true);
  };

  const handleListadoPacientes = () => {
    setVerEventos(false);
    setVerPacientes(true);
  };

  return (
    <>
      <Grid xs={4} sm={2}>
        <Paper square={true}>
          <MenuList>
            <Link
              to={"/ejemplo/tabla"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <MenuItem>Menú</MenuItem>
            </Link>
            <Link
              to={"/pacientes/all"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <MenuItem>Mis pacientes</MenuItem>
            </Link>
            <Link
              to={"/medicos/all"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <MenuItem>Médicos</MenuItem>
            </Link>
            {/* <Link
              to={"/eventos/all"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <MenuItem>Eventos</MenuItem>
            </Link> */}
          </MenuList>
        </Paper>
      </Grid>
    </>
  );
}

export default Menu;
