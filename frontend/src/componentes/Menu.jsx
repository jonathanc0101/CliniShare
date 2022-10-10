import MenuList from "@mui/material/MenuList";
import { MenuItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import ListadoEventos from "./ListadoEventos";
import { useState } from "react";
import ListadoPacientes from "./ListadoPacientes";
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
      <Grid xs={2}>
        <Paper square={true}>
          <MenuList>
            <MenuItem>Menú</MenuItem>
            <Link to={"/pacientes/all"} style={{ color: 'inherit', textDecoration: 'inherit'}}
            >
              <MenuItem >Mis pacientes</MenuItem>
            </Link>

            <Link to={"/eventos/all"}  style={{ color: 'inherit', textDecoration: 'inherit'}}> 
              <MenuItem >Eventos</MenuItem>
            </Link>
          </MenuList>
        </Paper>
      </Grid>
    </>
  );
}

export default Menu;
