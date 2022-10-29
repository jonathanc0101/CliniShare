import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../API backend/api";
import { useParams } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BotonVolver from "./botones/BotonVolver";

function VerEvento() {
  const params = useParams();

  const [evento, setEvento] = useState({
    titulo: "",
    descripcion: "",
    importante: false,
    fecha: "",
    fechaVencimiento: "",
  });

  const [paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });

  useEffect(() => {
    (async () => {
      const eventoEncontrado = await api.obtenerEventoConPacienteYMedicoPorId(
        params.id
      );
      const pacienteDelEvento = eventoEncontrado.paciente;
      setEvento((estadoAnterior) => {
        return { ...estadoAnterior, ...eventoEncontrado };
      });
      setPaciente((estadoAnterior) => {
        return { ...estadoAnterior, ...pacienteDelEvento };
      });
    })();
  }, [params.id]);

  return (
    <>
      <Grid container direction="row" spacing={40}>
        <Grid item xs={4}>
          <Typography component="h2" variant="h4" align="left">
            Evento
          </Typography>
        </Grid>
        {/* <Grid item xs={8}>
          <Button variant="outlined" startIcon={<EditIcon />}>
            <Link
              to={"/eventos/id/" + params.id}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Editar
            </Link>
          </Button>
        </Grid> */}
      </Grid>

      <Box sx={{ width: "100%" }}>
        <Card>
          <CardContent>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4} sm={4}>
                <TextField
                  disabled
                  label="Título"
                  type="text"
                  name="titulo"
                  value={evento.titulo}
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
                      value={evento.fecha}
                      onChange={(e) => e.target.value}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={40}>
              <Grid item xs={4}>
                <FormControlLabel
                  disabled
                  name="importante"
                  checked={evento.importante}
                  control={<Checkbox />}
                  label="Evento importante"
                />
              </Grid>

              <Grid item xs={4} sm={4}>
                {evento.importante ? (
                  <LocalizationProvider
                    adapterLocale="es"
                    dateAdapter={AdapterDayjs}
                  >
                    <DesktopDatePicker
                      disabled
                      label="Fecha de vencimiento"
                      name="fechaVencimiento"
                      value={evento.fechaVencimiento}
                      onChange={(e) => e.target.value}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                ) : null}
              </Grid>
            </Grid>

            {/* <br></br> */}
            {/* <Typography component="h2" variant="h5" align="left">
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
                  disabled
                  label="DNI"
                  type="text"
                  name="medicoDni"
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
            </Grid> */}
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
                  value={paciente.nombre}
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
                  value={paciente.apellido}
                  margin="dense"
                  fullWidth
                  variant="outlined"
                ></TextField>
              </Grid>
              <Grid item xs={3} sm={3}>
                <TextField
                  disabled
                  label="DNI"
                  type="text"
                  name="pacienteDni"
                  value={paciente.dni}
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
                  disabled
                  aria-label="maximum height"
                  placeholder="Descripción"
                  name="descripcion"
                  value={evento.descripcion}
                  style={{ width: 1249, height: 100 }}
                />
              </Grid>
            </Grid>
            <br></br>
            <Grid item>
              <BotonVolver></BotonVolver>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default VerEvento;
