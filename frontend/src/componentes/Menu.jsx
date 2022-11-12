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
      <Grid item xs={4} sm={2} style={{backgroundColor:"#007FFF", border: "3px solid #007FFF"}}>
        <Paper square={true}>
          <MenuList>
              <MenuItem style={{fontWeight:"bold", fontSize:17}}>Menú</MenuItem>
            <Link
              to={"/pacientes/all"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <MenuItem style={{color:"#007FFF", fontSize:15}} >Mis pacientes</MenuItem>
            </Link>
            <Link
              to={"/medicos/all"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <MenuItem style={{color:"#007FFF", fontSize:15}}>Médicos</MenuItem>
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
