import { Button, Grid, Typography } from "@mui/material";
import { api } from "../../API backend/api";
import SyncIcon from "@mui/icons-material/Sync";
function BotonSincronizar() {
  return (
    <>
      <Button
        style={{ backgroundColor: "white" }}
        variant="contained"
        onClick={() => api.sincronizar()}
        endIcon={
          <SyncIcon style={{ color: "#0c5774", fontWeight: "bold" }}></SyncIcon>
        }
      >
        <Typography variant="h7" color={"#0c5774"} fontWeight={"bold"}>
          SINCRONIZAR
        </Typography>
      </Button>
    </>
  );
}

export default BotonSincronizar;
