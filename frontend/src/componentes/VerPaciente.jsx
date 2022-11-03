import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { api } from "../API backend/api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventosImportantes from "./EventosImportantes";
import EventosDePaciente from "./EventosDePaciente";
import { Link } from "react-router-dom";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BotonVolver from "./botones/BotonVolver";

function VerPaciente() {
  const params = useParams();

  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  useEffect(() => {
    (async () => {
      const res = await api.obtenerPacienteById(params.id);
      setNombre(res.nombre + " " + res.apellido);
      setDni(res.dni);
      setFechaNacimiento(res.fechaNacimiento);
    })();
  }, [params.id]);
  return (
    <>
      <Typography
        component="h6"
        variant="h6"
        style={{
          backgroundColor: "#5090D3",
          color: "white",
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
        }}
      >
        &nbsp;&nbsp;&nbsp;Paciente
      </Typography>
      <Card>
        <CardContent>
          {/* DATOS DEL PACIENTE */}
          <Grid container direction="row" spacing={2}>
            {/* NOMBRE */}
            <Grid item xs={4} sm={4}>
              <TextField
                disabled
                label="Nombre completo"
                type="text"
                name="nombre"
                margin="normal"
                fullWidth
                variant="outlined"
                value={nombre}
              ></TextField>
            </Grid>
            {/* GÉNERO */}
            <Grid item xs={4} sm={2}>
              <TextField
                disabled
                label="Género"
                type="text"
                name="genero"
                margin="normal"
                fullWidth
                variant="outlined"
                value={"F o M"}
              ></TextField>
            </Grid>
            {/* APELLIDO */}
            {/* <Grid item xs={4} sm={3}>
                <TextField
                  disabled
                  label="Apellido/s"
                  type="text"
                  name="apellido"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={apellido}
                ></TextField>
              </Grid> */}
            {/* EVENTOS IMPORTANTES DEL PACIENTE */}
            <Grid item xs={4} sm={6}>
              <EventosImportantes id={params.id}></EventosImportantes>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* DNI */}
            <Grid item xs={3} sm={3}>
              <TextField
                disabled
                label="DNI"
                type="text"
                name="dni"
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
                value={dni}
              ></TextField>
            </Grid>
            {/* FECHA DE NACIMIENTO */}
            <Grid item xs={4} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  disabled
                  label="Fecha de nacimiento"
                  name="fechaNacimiento"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  renderInput={(params) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={12}>
              <Box textAlign="right">
                <Link
                  to={"/eventos/new/paciente/" + params.id}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    style={{ fontWeight: "bold" }}
                    startIcon={<AddCircleOutlineTwoToneIcon />}
                  >
                    Agregar evento
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <EventosDePaciente id={params.id} />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={4}>
              <BotonVolver></BotonVolver>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default VerPaciente;
