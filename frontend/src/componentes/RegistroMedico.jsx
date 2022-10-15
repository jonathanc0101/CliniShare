import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { api } from "../API backend/api";
import { alertas } from "./alertas";
import SaveIcon from "@mui/icons-material/Save";

function RegistroMedico() {
  const [estado, setEstado] = useState({
    error: false,
    loading: false,
  });

  const [medico, setMedico] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    matricula: "",
  });

  const guardar = async function () {
    setEstado({ loading: true });

    const medicoGuardado = await api.guardarMedico(medico);
    if (medicoGuardado === true) {
      alertas.alertaExito();
      // navigate(-1);
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setMedico((estadoAnterior) => {
      return { ...estadoAnterior, [name]: value };
    });
  };

  const handleChangeDni = (event) => {
    let value = event.target.value.replace(/\D/g, "");

    setMedico((estadoAnterior) => {
      return { ...estadoAnterior, dni: value };
    });
  };

  return (
    <>
      <Card>
        <Typography component="h4" variant="h4">
          Registrarse el médico
        </Typography>
        <CardContent>
          <Grid container direction="row" spacing={2}>
            {/* REDIRECT
    //   {this.state.redirect ? <Redirect to="/users" /> : null} */}

            {/* Nombre y apellido */}
            <Grid item xs={4} sm={4}>
              <TextField
                label="Nombre"
                type="text"
                name="nombre"
                value={medico.nombre}
                onChange={handleChange}
                margin="dense"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                label="Apellido"
                type="text"
                name="apellido"
                value={medico.apellido}
                onChange={handleChange}
                margin="dense"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={4}>
              <TextField
                label="DNI"
                type="text"
                name="dni"
                value={medico.dni}
                onChange={handleChangeDni}
                margin="dense"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
            <Grid item xs={4} sm={4}>
              <TextField
                label="Mátricula habilitante"
                type="text"
                name="matricula"
                value={medico.matricula}
                onChange={handleChange}
                margin="dense"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
          </Grid>
          <br></br>
          {/* <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Fecha de nacimiento"
                  inputFormat="DD/MM/YYYY"
                  name="fecha"
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid> */}
          <br></br>

          <Grid container direction="row" spacing={2}>
            <Grid item xs={2} sm={6}>
              <TextField
                label="Correo electrónico"
                type="text"
                name="correo"
                margin="dense"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={2} sm={6}>
              <TextField
                label="Contraseña"
                type="text"
                name="contraseña"
                margin="dense"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={2} sm={6}>
              <TextField
                label="Verifique contraseña"
                type="text"
                name="contraseñaVerificada"
                margin="dense"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                endIcon={<SaveIcon />}
                onClick={guardar}
              >
                <Typography color={"white"} variant="h7" align="left">
                  &nbsp;Guardar
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default RegistroMedico;
