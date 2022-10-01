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

function NuevoPaciente() {
  const [Paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
  });

  const handleGuardar =  async function () {
    if(Paciente.dni.length === 0 || Paciente.length === 0 || Paciente.length === 0){
      return Paciente;
    }

    
    const pacienteGuardado = await api.guardarPaciente(Paciente);
    
    if(pacienteGuardado === true){
      alert("Paciente guardado!");
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
      return { ...estadoAnterior, dni: value};
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
                >
                </TextField>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button
                  size="large"
                  fullWidth
                  onClick={handleGuardar}
                  variant="contained"
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default NuevoPaciente;
