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
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { api } from "../API backend/api";
import { useParams } from "react-router-dom";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import BotonVolver from "./botones/BotonVolver";

function VerEvento() {
  const params = useParams();
  let navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [importante, setImportante] = useState(false);
  const [fecha, setFecha] = useState("");
  const [pacienteNombre, setPacienteNombre] = useState("");
  const [pacienteApellido, setPacienteApellido] = useState("");
  const [pacienteDni, setPacienteDni] = useState("");

  useEffect(() => {
    (async () => {
      const res = await api.obtenerEventoConPacienteYMedicoPorId(params.id);
      setTitulo(res.titulo);
      setImportante(res.importante);
      setFecha(res.fecha);
      setDescripcion(res.descripcion);
      setPacienteNombre(res.paciente.nombre);
      setPacienteApellido(res.paciente.apellido);
      setPacienteDni(res.paciente.dni);
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
                  value={titulo}
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
                      onChange={(e) => setFecha(e.target.value)}
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
                  checked={importante}
                  control={<Checkbox />}
                  label="Evento importante"
                />
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
                  value={pacienteNombre}
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
                  value={pacienteApellido}
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
                  value={pacienteDni}
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
                  value={descripcion}
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
