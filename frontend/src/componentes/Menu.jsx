import MenuList from "@mui/material/MenuList";
import { MenuItem } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

function Menu() {
  const print = () => {
    console.log("se van a mostrar los pacientes ");
  };
  return (
    <>
      <Grid xs={2}>
        <Paper square={true}>
          <MenuList>
            <MenuItem>Menú</MenuItem>
            <MenuItem onClick={print}>Mis pacientes</MenuItem>
            <MenuItem>Mis medicos</MenuItem>
          </MenuList>
        </Paper>
      </Grid>
    </>
  );
}

export default Menu;
