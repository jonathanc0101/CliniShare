import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { api } from "../API backend/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
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
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import { alertas } from "./alertas";

function ModificarPaciente() {
  const params = useParams();
  let navigate = useNavigate();

  const [paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
  });

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, [name]: value };
    });
  };

  const handleChangeDni = (event) => {
    let value = event.target.value.replace(/\D/g, "");

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, dni: value };
    });
  };

  const handleChangeFecha = (event) => {
    const value = event["$d"];
    console.log(event);
    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, fechaNacimiento: value };
    });
  };

  const update = async () => {
    // e.preventDefault();
    const respuesta = await api.modificarPaciente(params.id, { ...paciente });
    if (respuesta) {
      alertas.alertaModificacionExitosa("paciente");
      navigate(-1);
    } else {
      alertas.alertaProblemas();
    }
  };

  useEffect(() => {
    (async () => {
      const pacienteRespuesta = await api.obtenerPacienteById(params.id);
      setPaciente((estadoAnterior) => {
        return { ...estadoAnterior, ...pacienteRespuesta };
      });
    })();
  }, [params.id]);

  return (
    <>
      <Typography component="h4" variant="h4">
        Paciente
      </Typography>
      <Card>
        <CardContent>
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
                value={paciente.nombre}
                onChange={handleChange}
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
                value={paciente.apellido}
                onChange={handleChange}
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
                value={paciente.dni}
                onChange={handleChangeDni}
              ></TextField>
            </Grid>

            <Grid item xs={6}>
              <EventosImportantes id={params.id}></EventosImportantes>
            </Grid>
          </Grid>
          <hr></hr>
          <br></br>
          <Grid item xs={4} sm={4}>
            <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha de nacimiento"
                name="fechaNacimiento"
                value={paciente.fechaNacimiento}
                onChange={handleChangeFecha}
                renderInput={(params) => (
                  <TextField onKeyDown={onKeyDown} {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <br></br>
          <Grid item xs={8}>
            <Button
              variant="contained"
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
          <br></br>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <EventosDePaciente id={params.id} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br></br>
      <Grid item>
        <IconButton aria-label="save" size="large" onClick={update}>
          <SaveIcon color="info" fontSize="inherit" />
          <Typography color={"black"} variant="h6" align="right">
            &nbsp;Guardar
          </Typography>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton aria-label="save" size="large" onClick={() => navigate(-1)}>
          <ArrowBackIcon color="info" fontSize="inherit" />
          <Typography color={"black"} variant="h6" align="left">
            &nbsp;Atrás
          </Typography>
        </IconButton>
      </Grid>
    </>
  );
}

export default ModificarPaciente;
