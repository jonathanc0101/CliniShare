import {
  Box,
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
  const [passwordActual, setPasswordActual] = useState("");

  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

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
  const [medico, setMedico] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    matricula: "",
    password: "",
    fechaNacimiento: "",
    sexo: "",
    genero: "",
    direccion: "",
    telefono: "",
  });

  const verificarPassword = (password) => password === medico.password;

  useEffect(() => {
    (async () => {
      const usuario = await JSON.parse(
        window.localStorage.getItem("loggedCliniShareAppUser")
      );
      console.log(JSON.stringify(usuario));
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
    const respuesta = await api.modificarMedico({ ...medico });
    if (respuesta) {
      alertas.alertaModificacionExitosa("usuario");
      setGuardado(true);
    } else {
      alertas.alertaProblemas();
    }
  };

  const handleChangeGenero = (event) => {
    setGenero(event.target.value);
  };

  const handleChangeTelefono = (event) => {
    let value = event.target.value.replace(/\D/g, "");

    setTelefono(value);
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
        &nbsp;&nbsp;&nbsp;Configuración general de la cuenta
      </Typography>
      <Card style={{ height: "94vh" }}>
        <CardContent>
          {/* DATOS DEL MÉDICO USUARIO */}
          <Grid container direction="row" spacing={2}>
            {/* {this.state.redirect ? <Redirect to="/users" /> : null} */}
            {/* NOMBRE */}
            <Grid item xs={4} sm={5}>
              <TextField
                label="Nombre/s"
                type="text"
                name="nombre"
                value={medico.nombre}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
            {/* APELLIDO */}
            <Grid item xs={4} sm={5}>
              <TextField
                label="Apellido/s"
                type="text"
                name="apellido"
                value={medico.apellido}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
            {/* SEXO */}
            <Grid item xs={4} sm={2}>
              <TextField
                id="outlined-select-sexo-native"
                select
                label="Sexo"
                name="sexo"
                value={medico.sexo}
                margin="normal"
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Seleccione su sexo"
              >
                {generos.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* DNI */}
            <Grid item xs={4} sm={4}>
              <TextField
                label="DNI"
                type="text"
                name="dni"
                value={medico.dni}
                onChange={handleChangeDni}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
            {/* MÁTRICULA */}
            <Grid item xs={4} sm={4}>
              <TextField
                label="Mátricula habilitante"
                type="text"
                name="matricula"
                value={medico.matricula}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
            {/* FECHA DE NACIMIENTO */}
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
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* DIRECCIÓN */}
            <Grid item xs={4} sm={8}>
              <TextField
                label="Dirección"
                type="text"
                name="direccion"
                value={direccion}
                onChange={({ target }) => setDireccion(target.value)}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
            {/* TELÉFONO */}
            <Grid item xs={4} sm={4}>
              <TextField
                label="Teléfono"
                type="text"
                name="telefono"
                value={telefono}
                onChange={handleChangeTelefono}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* CORREO ELECTRÓNICO */}
            <Grid item xs={4} sm={6}>
              <TextField
                label="Correo electrónico"
                type="text"
                name="email"
                value={medico.email}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                disabled
              ></TextField>
            </Grid>
            {/* CONTRASEÑA ACTUAL */}
            <Grid item xs={4} sm={6}>
              <TextField
                label="Contraseña actual"
                type="password"
                name="passwordActual"
                value={passwordActual}
                onChange={({ target }) => setPasswordActual(target.value)}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* CONTRASEÑA NUEVA */}
            <Grid item xs={4} sm={6}>
              <TextField
                label="Nueva contraseña"
                type="password"
                name="password"
                value={medico.password}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
            {/* CONTRASEÑA A VERIFICAR */}
            <Grid item xs={4} sm={6}>
              <TextField
                label="Vuelva a escribir la nueva contraseña"
                type="password"
                name="passwordVerificada"
                value={passwordAVerificar}
                onChange={handleChangeVerificar}
                margin="normal"
                fullWidth
                variant="outlined"
                helperText="Campo obligatorio"
              ></TextField>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            {/* VOLVER A ATRÁS */}
            <Grid item xs={4} sm={8}>
              <BotonVolver></BotonVolver>
            </Grid>
            {/* BOTÓN GUARDAR CAMBIOS */}
            <Grid item xs={4} sm={4}>
              <Box textAlign="right">
                <Button
                  variant="contained"
                  endIcon={<SaveIcon />}
                  onClick={update}
                  size="large"
                  style={{ fontWeight: "bold" }}
                >
                  Guardar cambios
                </Button>
              </Box>
              {guardado ? <Navigate to={"/"}></Navigate> : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default ModificarMedico;
