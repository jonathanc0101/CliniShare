import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { api } from "../API backend/api";
import BotonVolver from "./botones/BotonVolver";
import { Navigate } from "react-router-dom";
import { alertas } from "./alertas";
import "dayjs/locale/es";
import moment from "moment";

function ModificarMedico() {
  const [guardado, setGuardado] = useState(false);
  const [passwordAVerificar, setPasswordAVerificar] = useState("");
  const [medico, setMedico] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    matricula: "",
    password: "",
    fechaNacimiento: "",
  });

  const onKeyDown = (e) => {
    e.preventDefault();
  };

  const verificarPassword = (password) => password === medico.password;

  useEffect(() => {
    (() => {
      const usuario = JSON.parse(
        window.localStorage.getItem("loggedCliniShareAppUser")
      );

      setMedico((estadoAnterior) => {
        return { ...estadoAnterior, ...usuario.medico };
      });
    })();
  }, []);

  const update = async () => {
    if (!verificarPassword(passwordAVerificar)) {
      alertas.contraseñasDiferentes();
      return;
    }
    // e.preventDefault();
    const respuesta = await api.modificarMedico({ ...medico });
    if (respuesta) {
      alertas.alertaModificacionExitosa("usuario");
      setGuardado(true);
    } else {
      alertas.alertaProblemas();
    }
  };

  const handleChangeVerificar = (event) => {
    let value = event.target.value;

    setPasswordAVerificar(value);
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
          Configuración general de la cuenta
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
                onChange={(e) => setMedico({ matricula: e.target.value })}
                margin="dense"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={4}>
              <LocalizationProvider
                adapterLocale="es"
                dateAdapter={AdapterDayjs}
              >
                <DesktopDatePicker
                  label="Fecha de nacimiento"
                  name="fechaNacimiento"
                  value={medico.fechaNacimiento}
                  onChange={handleChangeFecha}
                  maxDate={moment().subtract(18, "years").toDate()}
                  renderInput={(params) => (
                    <TextField onKeyDown={onKeyDown} {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={2} sm={6}>
              <TextField
                label="Correo electrónico"
                type="text"
                name="email"
                value={medico.email}
                onChange={handleChange}
                margin="dense"
                fullWidth
                variant="outlined"
                disabled
              ></TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={2} sm={6}>
              <TextField
                label="Nueva contraseña"
                type="text"
                name="password"
                value={medico.password}
                onChange={handleChange}
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
                value={passwordAVerificar}
                onChange={handleChangeVerificar}
                margin="dense"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
          </Grid>
          <br></br>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={10}>
              <BotonVolver></BotonVolver>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                endIcon={<SaveIcon />}
                onClick={update}
              >
                <Typography color={"white"} variant="h7" align="left">
                  &nbsp;Guardar
                </Typography>
              </Button>
              {guardado ? <Navigate to={"/"}></Navigate> : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default ModificarMedico;
