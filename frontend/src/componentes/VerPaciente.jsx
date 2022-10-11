import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { api } from "../API backend/api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventosImportantes from "./EventosImportantes";
import EventosDePaciente from "./EventosDePaciente";
import { Link } from "react-router-dom";

import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";

function VerPaciente() {
  const params = useParams();
  let navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  useEffect(() => {
    (async () => {
      const res = await api.obtenerPacienteById(params.id);
      setNombre(res.nombre);
      setApellido(res.apellido);
      setDni(res.dni);
    })();
  }, [params.id]);
  return (
    <>
      <Typography component="h4" variant="h4">
        Paciente
      </Typography>
      <Card>
        <CardContent>
          <Box sx={{ width: "100%" }}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={3} sm={2}>
                <TextField
                  disabled
                  label="Nombre"
                  type="text"
                  name="nombre"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={nombre}
                ></TextField>
              </Grid>
              <Grid item xs={3} sm={2}>
                <TextField
                  disabled
                  label="Apellido"
                  type="text"
                  name="apellido"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={apellido}
                ></TextField>
              </Grid>
              <Grid item xs={3} sm={2}>
                <TextField
                  disabled
                  label="DNI"
                  type="text"
                  name="dni"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={dni}
                ></TextField>
              </Grid>
              <Grid item sm={6}>
                <EventosImportantes id={params.id}></EventosImportantes>
              </Grid>
            </Grid>
          </Box>
          <hr></hr>
          <Grid item xs={8}>
            <Button
              variant="outlined"
              startIcon={<AddCircleOutlineTwoToneIcon />}
            >
              <Link
                to={"/eventos/new/paciente/" + params.id}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                Agregar evento
              </Link>
            </Button>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <EventosDePaciente id={params.id} />
            </Grid>
          </Grid>
          <br></br>
        </CardContent>
      </Card>
        <Grid item>
          <IconButton
            aria-label="save"
            size="large"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon color="info" fontSize="inherit" />
            <Typography color={"black"} variant="h6" align="left">
              &nbsp;Atrás
            </Typography>
          </IconButton>
        </Grid>
    </>
  );
}

export default VerPaciente;
