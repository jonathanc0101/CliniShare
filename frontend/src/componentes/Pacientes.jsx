import { Box, Button, ButtonGroup, Grid, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

function Pacientes() {
  return (
    <>
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
        <Grid item xs={1}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
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
        </Grid>
      </Grid>
      </Box>

    </>
  );
}

export default Pacientes;
