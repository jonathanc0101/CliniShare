import { Button, Grid, Typography } from "@mui/material";
import { api } from "../../API backend/api"

function BotonSincronizar() {
  return (
    <>
      <Grid container direction="row">
        <Button
          style={{ border: "1px solid #0c5774" }}
          variant="outlined"
          onClick={() => api.sincronizar()}
          // startIcon={
          //   <ArrowBackIcon
          //     style={{ color: "#0c5774", fontWeight: "bold" }}
          //   ></ArrowBackIcon>
          // }
        >
          <Typography variant="h7" color={"#0c5774"} fontWeight={"bold"}>
            SINCRONIZAR
          </Typography>
        </Button >
      </Grid>
    </>
  );
}

export default BotonSincronizar;
