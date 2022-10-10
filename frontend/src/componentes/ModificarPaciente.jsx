import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { api } from "../API backend/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { Link } from "react-router-dom";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import EventosDePaciente from "./EventosDePaciente";
import EventosImportantes from "./EventosImportantes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ModificarPaciente() {
  const params = useParams();
  let navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");

  const update = async () => {
    // e.preventDefault();
    await api.modificarPaciente(params.id, {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
    });
    alert("Se modificó el paciente exitosamente");
    navigate(-1);
  };

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
        Paciente a modificar
      </Typography>
      <Card>
        <CardContent>
          <Box sx={{ width: "100%" }}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={3} sm={2}>
                <TextField
                  label="Nombre"
                  type="text"
                  name="nombre"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={3} sm={2}>
                <TextField
                  label="Apellido"
                  type="text"
                  name="apellido"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={3} sm={2}>
                <TextField
                  label="DNI"
                  type="text"
                  name="dni"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item sm={6}>
                <EventosImportantes></EventosImportantes>
              </Grid>
            </Grid>
          </Box>
          <br></br>
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
      <Grid container direction="row" spacing={130}>
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
        <Grid item>
          <IconButton aria-label="save" size="large" onClick={update}>
            <SaveIcon color="info" fontSize="inherit" />
            <Typography color={"black"} variant="h6" align="right">
              &nbsp;Guardar
            </Typography>
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}

export default ModificarPaciente;
