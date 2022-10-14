import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BotonVolver() {
  let navigate = useNavigate();

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
      >
        <Typography variant="h7">Volver</Typography>
      </Button>
    </>
  );
}

export default BotonVolver;
