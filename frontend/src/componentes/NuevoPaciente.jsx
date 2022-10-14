import React, { useState } from "react";

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
    pacientesExistentes.data.forEach((paciente) => {
      if (pacienteDni === paciente.dni) {
        return true;
      }
    });
    return false;
  }

  const [Paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });

  const handleGuardar = async function () {
    if (
      Paciente.dni.length === 0 ||
      Paciente.nombre.length === 0 ||
      Paciente.apellido.length === 0
    ) {
      alertas.alertaCamposObligatorios();
      return;
    } else if (obtenerPacientesExistentes(Paciente.dni)) {
      alertas.alertaPacienteExiste(Paciente.dni);
    }

    const pacienteGuardado = await api.guardarPaciente(Paciente);
    if (pacienteGuardado === true) {
      alertas.alertaExito();
      // navigate(-1);
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, [name]: value };
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
      <Typography component="h4" variant="h4">
        Nuevo Paciente
      </Typography>
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
              <Grid container direction="row" spacing={2}>
                <Grid item xs={10}>
                  <BotonVolver></BotonVolver>
                </Grid>

                <Grid item>
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
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default NuevoPaciente;
