import {
  Box,
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
import { api } from "../API backend/api";
const axios = require("axios");

function ModificarEvento() {
  const url = "http://localhost:3000";

  const [eventoData, setEventoData] = useState({
    id:"",
    titulo: "",
    fecha: new Date(),
    importante: false,
    medicoDni: "",
    pacienteDni: "",
    descripcion: "",
  });

  const handleOnchange = (e) => {
    if (e.target.name === "importante") {
      setEventoData({ ...eventoData, [e.target.name]: e.target.checked });
    } else {
      setEventoData((estadoAnterior) => {
        return { ...estadoAnterior, [e.target.name]: e.target.value };
      });
    }
  };

  const handleSubmit = async (
    id,
    titulo,
    fecha,
    importante,
    medicoDni,
    descripcion
  ) => {
    const evento = {
      id,
      titulo,
      fecha,
      importante,
      medicoDni,
      descripcion,
    };

    try {
      const response = await api.modificarEvento(evento)
      if (!response) {
        alert(`Problemas al guardar`);
      } else {
        console.log(evento);
        alert(`Se modific'el evento`);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
        <>
        <Typography component="h2" variant="h4" align="left">
          Evento 
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Card>
            <CardContent>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={4} sm={4}>
                <TextField
                    label="Identificador"
                    type="number"
                    name="id"
                    value={eventoData.id}
                    onChange={handleOnchange}
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                  ></TextField>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                    label="Título"
                    type="text"
                    name="titulo"
                    value={eventoData.titulo}
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
                        value={eventoData.fecha}
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
                    value={eventoData.importante}
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
                    value={eventoData.medicoDni}
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
                    value={eventoData.descripcion}
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
                        eventoData.id,
                        eventoData.titulo,
                        eventoData.fecha,
                        eventoData.importante,
                        eventoData.medicoDni,
                        eventoData.descripcion
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

export default ModificarEvento;
