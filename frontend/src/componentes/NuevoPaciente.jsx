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
import validator from "validator";

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
    if (event === null) {
      event = {};
    } else {
      const value = event["$d"];
      setPaciente((estadoAnterior) => {
        return { ...estadoAnterior, fechaNacimiento: value };
      });
    }
  };

  const handleChangeDni = (event) => {
    // quitamos los valores no numericos
    let value = event.target.value.replace(/\D/g, "");

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, dni: value };
    });
  };

  const handleChangeNombreYApellido = (event) => {
    const { value } = event.target;
    let regex = new RegExp("^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]*$");

    // let regex = new RegExp("^[a-zA-Z ]*$");

    if (regex.test(value)) {
      if (event.target.name === "nombre") {
        setPaciente((estadoAnterior) => {
          return { ...estadoAnterior, nombre: value };
        });
      } else if (event.target.name === "apellido") {
        setPaciente((estadoAnterior) => {
          return { ...estadoAnterior, apellido: value };
        });
      }
    }
  };

  const handleGuardar = async function () {
    const existePaciente = await obtenerPacientesExistentes(Paciente.dni);

    if (
      Paciente.nombre.length === 0 ||
      Paciente.apellido.length === 0 ||
      Paciente.dni.length === 0 ||
      Paciente.fechaNacimiento.length === 0
    ) {
      alertas.alertaCamposObligatorios();
      return;
    } else if (existePaciente) {
      alertas.alertaPacienteExiste(Paciente.dni);
      return;
    } else if (!validator.isDate(Paciente.fechaNacimiento)) {
      alertas.fechaErronea("nacimiento");
      return;
    } else if (Paciente.fechaNacimiento > moment()) {
      alertas.fechaNacimientoPaciente();
    } else {
      const pacienteGuardado = await api.guardarPaciente(Paciente);
      if (pacienteGuardado === true) {
        alertas.alertaExito("paciente");
        navigate(-1);
      }
    }
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
                onChange={handleChangeNombreYApellido}
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
                onChange={handleChangeNombreYApellido}
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
              <Box textAlign="center">
                <Button
                  variant="contained"
                  endIcon={<SaveIcon style={{ fontSize: 24 }} />}
                  onClick={handleGuardar}
                  size="large"
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    backgroundColor: "#007FFF",
                  }}
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
