import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { api } from "../API backend/api";
import { alertas } from "./alertas";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function RegistroMedico() {
  const [values, setValues] = useState({
    mostrarPassword: "",
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      mostrarPassword: !values.mostrarPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const [medico, setMedico] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    matricula: "",
    email: "",
    password: "",
    fechaNacimiento: "",
  });

  const guardar = async function () {
    if (!isEmail(medico.email)) {
      console.log("Email invalido");
      alertas.alertaEmailInvalido();
      return;
    }

    const medicoGuardado = await api.guardarMedicoUsuario(medico);
    if (medicoGuardado === true) {
      alertas.alertaExito("médico");
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

  const handleChangeFecha = (event) => {
    const value = event["$d"];
    console.log(event);
    setMedico((estadoAnterior) => {
      return { ...estadoAnterior, fechaNacimiento: value };
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
            <OutlinedInput
              id="outlined-adornment-nombre"
              type="text"
              value={medico.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              fullWidth
              margin="dense"
              required
            />
            </Grid>
            <Grid item xs={4} sm={4}>
            <OutlinedInput
              id="outlined-adornment-apellido"
              type="text"
              value={medico.apellido}
              onChange={handleChange}
              placeholder="Apellido"
              fullWidth
              margin="dense"

              required
            />
            </Grid>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={4}>
            <OutlinedInput
              id="outlined-adornment-dni"
              type="text"
              value={medico.dni}
              onChange={handleChangeDni}
              placeholder="DNI"
              fullWidth
              margin="dense"

              required
            />

            </Grid>
            <Grid item xs={4} sm={4}>
            <OutlinedInput
              id="outlined-adornment-matricula"
              type="text"
              value={medico.matricula}
              onChange={handleChange}
              placeholder="Nombre"
              fullWidth
              required
            />
            </Grid>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={4}>
              <InputLabel>Fecha de nacimiento</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  name="fechaNacimiento"
                  value={medico.fechaNacimiento}
                  onChange={handleChangeFecha}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <br></br>

          <Grid container direction="row" spacing={2}>
            <Grid item xs={2} sm={6}>
            <OutlinedInput
              id="outlined-adornment-email"
              type="text"
              value={medico.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              fullWidth
              required
            />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={8}>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.mostrarPassword ? "text" : "password"}
              value={medico.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.mostrarPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Contraseña"
              required
            />
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
