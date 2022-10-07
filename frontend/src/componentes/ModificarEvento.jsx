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
import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { api } from "../API backend/api";
import {useParams } from "react-router-dom";

function ModificarEvento() {
  const params = useParams();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [importante, setImportante] = useState("");
  const [fecha, setFecha] = useState("");
  const [medicoDni, setMedicoDni] = useState("");

  const update = async () => {
    // e.preventDefault();
    await api.modificarEvento(params.id, {
      titulo: titulo,
      descripcion: descripcion,
      importante: importante,
      medicoDni: medicoDni,
    });
    alert("Se modificó el evento exitosamente");
  };

 


  useEffect(() => {
    (async () => {
      const res = await api.obtenerEvento(params.id);
      setTitulo(res.titulo);
      setImportante(res.importante);
      setMedicoDni(res.medicoDni);
      setFecha(res.fecha);
      setDescripcion(res.descripcion);
    })();

  }, [params.id]);


  return (
    <>
      <Typography component="h2" variant="h4" align="left">
        Evento a modificar
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
                  // value={id}

                  // onChange={handleOnchange}
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
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  // onChange={handleOnchange}
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
                      // onChange={handleOnchange}
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
                  onChange={(e) => setImportante(e.target.checked)}
                  // onChange={handleOnchange}
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
                  onChange={(e) => setMedicoDni(e.target.value)}
                  // onChange={handleOnchange}
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
                  // onChange={handleOnchange}
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
                  onChange={(e) => setDescripcion(e.target.value)}
                  // onChange={handleOnchange}
                  style={{ width: 1249, height: 100 }}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <IconButton
                  aria-label="save"
                  size="large"
                  onClick={update}
                  // onSubmit={update}
                  // onClick={() =>
                  //   handleSubmit(
                  //     eventoData.id,
                  //     eventoData.titulo,
                  //     eventoData.fecha,
                  //     eventoData.importante,
                  //     eventoData.medicoDni,
                  //     eventoData.descripcion
                  //   )
                  // }
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
