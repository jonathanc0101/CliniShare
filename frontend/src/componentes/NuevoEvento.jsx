import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import { urlBackend as url } from "../utilidades/constantes";
import { api } from "../API backend/api";

const axios = require("axios");

function NuevoEvento() {

  const [eventoData, setEventoData] = useState({
    titulo: "",
    fecha: new Date(),
    importante: false,
    medicoDni: "",
    pacienteDni: "",
    descripcion: "",
  });

  const { titulo, fecha, importante, medicoDni, pacienteDni, descripcion } =
    eventoData;

  const handleOnchange = (e) => {
    if (e.target.name === "importante") {
      setEventoData({ ...eventoData, [e.target.name]: e.target.checked });
    } else {
      setEventoData({ ...eventoData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (
    titulo,
    fecha,
    importante,
    medicoDni,
    pacienteDni,
    descripcion
  ) => {
    const evento = {
      titulo,
      fecha,
      importante,
      medicoDni,
      pacienteDni,
      descripcion,
    };
    // console.log(evento);
    try {
      const response = await api.guardarEvento(evento);
      if (!response) {
        alert(`El paciente no existe`);
      } else {
        console.log(evento);
        alert(`Se cargo el evento`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Grid container direction="row" spacing={40}>
        <Grid item xs={4}>
          <Typography component="h2" variant="h4" align="right">
            Nuevo evento
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Button to="/" variant="outlined" startIcon={<EditIcon />}>
            Editar
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%" }}>
        <Card>
          <CardContent>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4} sm={4}>
                <TextField
                  disabled
                  label="Identificador"
                  type="text"
                  name="identificador"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  label="Título"
                  type="text"
                  name="titulo"
                  value={titulo}
                  onChange={handleOnchange}
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      disabled
                      label="Fecha del evento"
                      inputFormat="DD/MM/YYYY"
                      name="fecha"
                      value={fecha}
                      onChange={handleOnchange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={40}>
              <Grid item xs={4}>
                <FormControlLabel
                  name="importante"
                  value={importante}
                  onChange={handleOnchange}
                  control={<Checkbox />}
                  label="Evento importante"
                />
              </Grid>
            </Grid>
            <br></br>
            <Typography component="h2" variant="h5" align="left">
              Medico
            </Typography>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={3} sm={3}>
                <TextField
                  disabled
                  label="Nombre"
                  type="text"
                  name="nombre"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                ></TextField>
              </Grid>
              <Grid item xs={3} sm={3}>
                <TextField
                  disabled
                  label="Apellido"
                  type="text"
                  name="apellido"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                ></TextField>
              </Grid>
              <Grid item xs={3} sm={3}>
                <TextField
                  label="DNI"
                  type="text"
                  name="medicoDni"
                  value={medicoDni}
                  onChange={handleOnchange}
                  margin="dense"
                  fullWidth
                  variant="outlined"
                ></TextField>
              </Grid>
              <Grid item xs={3} sm={3}>
                <TextField
                  disabled
                  label="Matricula"
                  type="text"
                  name="matricula"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                ></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Typography component="h2" variant="h5" align="left">
              Paciente
            </Typography>

            <Grid container direction="row" spacing={2}>
              <Grid item xs={3} sm={3}>
                <TextField
                  disabled
                  label="Nombre"
                  type="text"
                  name="nombre"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                ></TextField>
              </Grid>
              <Grid item xs={3} sm={3}>
                <TextField
                  disabled
                  label="Apellido"
                  type="text"
                  name="apellido"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                ></TextField>
              </Grid>
              <Grid item xs={3} sm={3}>
                <TextField
                  label="DNI"
                  type="text"
                  name="pacienteDni"
                  value={pacienteDni}
                  onChange={handleOnchange}
                  margin="dense"
                  fullWidth
                  variant="outlined"
                ></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12} sm={12} lg={6}>
                <Typography component="h2" variant="h6" align="left">
                  Descripción
                </Typography>
                <TextareaAutosize
                  aria-label="maximum height"
                  placeholder="Descripción"
                  name="descripcion"
                  value={descripcion}
                  onChange={handleOnchange}
                  style={{ width: 1249, height: 100 }}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <IconButton
                  aria-label="save"
                  size="large"
                  onClick={() =>
                    handleSubmit(
                      titulo,
                      fecha,
                      importante,
                      medicoDni,
                      pacienteDni,
                      descripcion
                    )
                  }
                >
                  <SaveIcon color="info" fontSize="inherit" />
                  <Typography color={"black"} variant="h6" align="left">
                    &nbsp;Guardar
                  </Typography>
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default NuevoEvento;
