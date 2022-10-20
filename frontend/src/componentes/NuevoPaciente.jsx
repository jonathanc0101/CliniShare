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
  
    console.log("Paciente dni: ", pacienteDni);
    const pacientesExistentes = await api.obtenerPacientes();

    // pacientesExistentes.data.map((paciente) => {  
    //   if(paciente.dni===pacienteDni){
    //     return true;
    //   }
    //   return false;
    // })
  
    return pacientesExistentes.data.some(element => { return element.dni === pacienteDni; });

    // pacientesExistentes.data.forEach((paciente) => {
    //   if (pacienteDni === paciente.dni) {
    //     console.log("Si existe");
    //     return 1;
    //   }
    // });
    // console.log("No existe");
    // return 0;
  }

  const [Paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni:"",
    fechaNacimiento: "",
  });

  const handleGuardar = async function () {
    if (
      Paciente.dni.length === 0 ||
      Paciente.nombre.length === 0 ||
      Paciente.apellido.length === 0
    ) {
      alertas.alertaCamposObligatorios();
      return;
    } 

    const existePaciente = await obtenerPacientesExistentes(Paciente.dni)
    console.log("AA ", existePaciente);
    if (existePaciente) {
      console.log("paciente existe!!");
      alertas.alertaPacienteExiste(Paciente.dni);
      return;
    } else{

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
    console.log(event);
    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, fechaNacimiento: value };
    });
  }


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
