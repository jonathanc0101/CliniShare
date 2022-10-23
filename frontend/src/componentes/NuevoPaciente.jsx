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

function NuevoPaciente() {
  async function obtenerPacientesExistentes(pacienteDni) {
    const pacientesExistentes = await api.obtenerPacientes();

    return pacientesExistentes.data.some((element) => {
      return element.dni === pacienteDni;
    });
  }

  const usuario = JSON.parse(
    window.localStorage.getItem("loggedCliniShareAppUser")
  );

  const [Paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    ownerId: "",
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
      handleChangeUsuarioId();
      console.log("PACIENTE A GUARDAR: ", Paciente);
      const pacienteGuardado = await api.guardarPaciente(Paciente);
      if (pacienteGuardado === true) {
        alertas.alertaExito("paciente");
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

  const handleChangeUsuarioId = () => {
    // quitamos los valores no numericos
    let value = usuario.medico.id.toString();

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, ownerId: value };
    });
    console.log("OWNER ID EN HANDLE: ", Paciente.ownerId );

  };

  return (
    <>
      <Typography component="h4" variant="h5">
        Nuevo paciente
      </Typography>
      <br></br>
      <Box sx={{ width: "100%" }}>
        <Card>
          <CardContent>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4} sm={4}>
                <TextField
                  label="Nombre"
                  type="text"
                  name="nombre"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={Paciente.nombre}
                  onChange={handleChange}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  label="Apellido"
                  type="text"
                  name="apellido"
                  margin="dense"
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
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={Paciente.dni}
                  onChange={handleChangeDni}
                ></TextField>
              </Grid>
              <br></br>
              <Grid item xs={4} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Fecha de nacimiento"
                    name="fechaNacimiento"
                    value={Paciente.fechaNacimiento}
                    onChange={handleChangeFecha}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <br></br>
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
