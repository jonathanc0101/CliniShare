import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import BotonVolver from "./botones/BotonVolver";
import { api } from "../API backend/api";
import { useParams, useNavigate } from "react-router-dom";
import { alertas } from "./alertas";
import moment from "moment";
import validator from "validator";

function NuevoEvento() {
  const params = useParams();
  let navigate = useNavigate();
  moment.locale("es");

  const usuario = JSON.parse(
    window.localStorage.getItem("loggedCliniShareAppUser")
  );

  const [paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });

  const [evento, setEvento] = useState({
    titulo: "",
    importante: false,
    medicoId: usuario.medico.medicoId,
    pacienteId: params.id,
    descripcion: "",
    fechaVencimiento: "",
  });

  useEffect(() => {
    (async () => {
      const pacienteEncontrado = await api.obtenerPacienteById(params.id);

      setPaciente((estadoAnterior) => {
        return { ...estadoAnterior, ...pacienteEncontrado };
      });
    })();
  }, [params.id]);

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const handleOnchange = (e) => {
    if (e.target.name === "importante") {
      setEvento({ ...evento, [e.target.name]: e.target.checked });
    } else {
      setEvento({ ...evento, [e.target.name]: e.target.value });
    }
  };

  const handleChangeFecha = async (e) => {
    if (e === null) {
      e = {};
    } else {
      const value = e["$d"];

      setEvento((estadoAnterior) => {
        return { ...estadoAnterior, fechaVencimiento: value };
      });
    }
  };

  const handleSubmit = async (evento) => {
    try {
      if (evento.titulo.length === 0 || evento.descripcion.length === 0) {
        alertas.alertaCamposObligatorios();
        return;
      } else {
        let fechaActual = new Date();

        if (evento.fechaVencimiento === "") {
          evento.fechaVencimiento = null;
        } else {
          if (
            !validator.isDate(evento.fechaVencimiento) ||
            evento.fechaVencimiento.getFullYear() < fechaActual.getFullYear()
          ) {
            alertas.fechaErronea("vencimiento");
            return;
          }
        }
      }

      evento.pacienteId = params.id;
      evento.medicoId = usuario.medico.medicoId;
      console.log("evento_ ", evento);
      const response = await api.crearEvento(evento);
      if (!response) {
        console.log("respuesta mal: ", response);

        alertas.alertaProblemas();
      } else {
        console.log("respuesta: ", response);

        alertas.alertaExito("evento");
        navigate(-1);
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
        {/* <BotonEditar></BotonEditar> */}
      </Grid>

      <Box sx={{ width: "100%" }}>
        <Card>
          <CardContent>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4} sm={8}>
                <TextField
                  required
                  label="Título"
                  type="text"
                  name="titulo"
                  value={evento.titulo}
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
                      onChange={handleOnchange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <br></br>
            <Grid container direction="row" spacing={2}>
              {/* IMPORTANTE */}
              <Grid item xs={4} sm={2}>
                <FormControlLabel
                  name="importante"
                  value={evento.importante}
                  onChange={handleOnchange}
                  control={<Checkbox />}
                  label="Evento importante"
                />
              </Grid>
              {/* FECHA DE VENCIMIENTO */}
              <Grid item xs={4} sm={10}>
                <LocalizationProvider
                  adapterLocale="es"
                  dateAdapter={AdapterDayjs}
                >
                  <DesktopDatePicker
                    disabled={!evento.importante}
                    label="Fecha de vencimiento"
                    name="fechaVencimiento"
                    value={evento.fechaVencimiento}
                    onChange={handleChangeFecha}
                    minDate={moment().add(1, "days")}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <br></br>
            {/* DATOS DEL PACIENTE */}
            <Typography component="h2" variant="h5" align="left">
              Paciente
            </Typography>
            {/* NOMBRE DEL PACIENTE */}
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4} sm={4}>
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
              {/* APELLIDO DEL PACIENTE */}
              <Grid item xs={4} sm={4}>
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
              {/* DNI DEL PACIENTE */}
              <Grid item xs={4} sm={4}>
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
            {/* DESCRIPCIÓN */}
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12} sm={12} lg={6}>
                <Typography component="h2" variant="h6" align="left">
                  Descripción
                </Typography>
                <TextareaAutosize
                  aria-label="maximum height"
                  placeholder="Descripción"
                  name="descripcion"
                  value={evento.descripcion}
                  onChange={handleOnchange}
                  style={{ width: 1249, height: 100 }}
                />
              </Grid>
            </Grid>
            <br></br>
            <Grid container direction="row" spacing={2}>
              {/* VOLVER A ATRÁS */}
              <Grid item xs={10}>
                <BotonVolver></BotonVolver>
              </Grid>
              {/* GUARDAR */}
              <Grid item>
                <Button
                  variant="contained"
                  endIcon={<SaveIcon />}
                  onClick={() => handleSubmit(evento)}
                >
                  <Typography color={"white"} variant="h7" align="left">
                    &nbsp;Guardar
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default NuevoEvento;
