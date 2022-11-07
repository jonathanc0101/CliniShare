import React, { useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "../App.css";
import { api } from "../API backend/api";
import SaveIcon from "@mui/icons-material/Save";
import BotonVolver from "./botones/BotonVolver";
import { alertas } from "./alertas";
import "dayjs/locale/es";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function NuevoPaciente() {
  let navigate = useNavigate();
  async function obtenerPacientesExistentes(pacienteDni) {
    const pacientesExistentes = await api.obtenerPacientes();

    return pacientesExistentes.data.some((element) => {
      return element.dni === pacienteDni;
    });
  }

  const usuario = JSON.parse(
    window.localStorage.getItem("loggedCliniShareAppUser")
  );

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const [Paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    ownerId: usuario.medico.medicoId,
  });

  const handleGuardar = async function () {
    if (
      Paciente.dni.length === 0 ||
      Paciente.nombre.length === 0 ||
      Paciente.apellido.length === 0 ||
      Paciente.fechaNacimiento.length === 0
    ) {
      alertas.alertaCamposObligatorios();
      return;
    }

    const existePaciente = await obtenerPacientesExistentes(Paciente.dni);
    if (existePaciente) {
      alertas.alertaPacienteExiste(Paciente.dni);
      return;
    } else {
      const pacienteGuardado = await api.guardarPaciente(Paciente);
      if (pacienteGuardado === true) {
        alertas.alertaExito("paciente");
        navigate(-1);
      }
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, [name]: value };
    });
  };

  const handleChangeFecha = (event) => {
    const value = event["$d"];
    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, fechaNacimiento: value };
    });
  };

  const handleChangeDni = (event) => {
    // quitamos los valores no numericos
    let value = event.target.value.replace(/\D/g, "");

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, dni: value };
    });
  };

  return (
    <>
      <Typography component="h2" variant="h4" align="left">
        Nuevo paciente
      </Typography>
      <br></br>
      {/* DATOS DEL PACIENTE */}
      <Box sx={{ width: "100%" }}>
        <Card>
          <CardContent>
            {/* DATOS DEL PACIENTE */}
            <Grid container direction="row" spacing={2}>
              {/* NOMBRE */}
              <Grid item xs={4} sm={4}>
                <TextField
                  label="Nombre"
                  type="text"
                  name="nombre"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={Paciente.nombre}
                  onChange={handleChange}
                ></TextField>
              </Grid>
              {/* APELLIDO */}
              <Grid item xs={4} sm={4}>
                <TextField
                  label="Apellido"
                  type="text"
                  name="apellido"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={Paciente.apellido}
                  onChange={handleChange}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  label="DNI"
                  type="text"
                  name="dni"
                  margin="normal"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={Paciente.dni}
                  onChange={handleChangeDni}
                ></TextField>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              {/* FECHA DE NACIMIENTO */}
              <Grid item xs={4} sm={4}>
                <LocalizationProvider
                  adapterLocale="es"
                  dateAdapter={AdapterDayjs}
                >
                  <DesktopDatePicker
                    label="Fecha de nacimiento"
                    name="fechaNacimiento"
                    value={Paciente.fechaNacimiento}
                    onChange={handleChangeFecha}
                    maxDate={moment()}
                    renderInput={(params) => <TextField  margin="normal"{...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Grid container direction="row" spacing={2}>
          <Grid item xs={10}>
            <BotonVolver></BotonVolver>
          </Grid>

          <Grid item xs={2}>
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={handleGuardar}
            >
              <Typography color={"white"} variant="h7" align="left">
                &nbsp;Guardar
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default NuevoPaciente;
