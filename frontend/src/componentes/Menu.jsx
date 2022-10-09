import MenuList from "@mui/material/MenuList";
import { MenuItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import ListadoEventos from "./ListadoEventos";
import { useState } from "react";
import ListadoPacientes from "./ListadoPacientes";

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
            <MenuItem onClick={handleListadoPacientes}>Mis pacientes</MenuItem>
            <MenuItem onClick={handleListadoEventos}>Eventos</MenuItem>
          </MenuList>
        </Paper>
      </Grid>
      {verEventos ? <ListadoEventos /> : null}
      {verPacientes ? <ListadoPacientes /> : null}
    </>
  );
}

export default Menu;
