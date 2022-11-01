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
  const [genero, setGenero] = useState("");
  const generos = [
    {
      value: "F",
      label: "Femenino",
    },
    {
      value: "M",
      label: "Masculino",
    },
  ];
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

  const handleChangeGenero = (event) => {
    setGenero(event.target.value);
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
        &nbsp;&nbsp;&nbsp;Nuevo paciente
      </Typography>
      <br></br>
      {/* DATOS DEL PACIENTE */}
      <Card>
        <CardContent>
          {/* DATOS DEL PACIENTE */}
          <Grid container direction="row" spacing={2}>
            {/* NOMBRE */}
            <Grid item xs={4} sm={6}>
              <TextField
                label="Nombre/s"
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
            <Grid item xs={4} sm={6}>
              <TextField
                label="Apellido/s"
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
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* DNI */}
            <Grid item xs={4} sm={5}>
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
            {/* FECHA DE NACIMIENTO */}
            <Grid item xs={4} sm={3}>
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
                  renderInput={(params) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      helperText="Campo obligatorio"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            {/* GÉNERO */}
            <Grid item xs={4} sm={2}>
              <TextField
                id="outlined-select-genero-native"
                select
                label="Género"
                value={genero}
                margin="normal"
                onChange={handleChangeGenero}
                SelectProps={{
                  native: true,
                }}
                helperText="Seleccione su género"
              >
                {generos.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <br></br>
          <Grid container direction="row" spacing={2}>
            {/* VOLVER A ATRÁS */}
            <Grid item xs={4} sm={10}>
              <BotonVolver></BotonVolver>
            </Grid>
{/* BOTÓN GUARDAR PACIENTE */}
            <Grid item xs={4} sm={2}>
              <Box textAlign="right">
                <Button
                  variant="contained"
                  endIcon={<SaveIcon />}
                  onClick={handleGuardar}
                  size="large"
                  style={{ fontWeight: "bold" }}
                >
                  Guardar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default NuevoPaciente;
