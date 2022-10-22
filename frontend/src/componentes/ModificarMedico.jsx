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
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { api } from "../API backend/api";

function ModificarMedico() {

  // const update = async () => {
  //   // e.preventDefault();
  //   await api.modificarMedico(params.id, {
  //     nombre: nombre,
  //     apellido: apellido,
  //     dni: dni,
  //   });
  //   alert("Se modificó el paciente exitosamente");
  //   navigate(-1);
  // };

  useEffect(() => {
    (async () => {
      const usuario = await window.localStorage.getItem("loggedCliniShareAppUser");;
      setNombre(usuario.nombre);
      setApellido(usuario.apellido);
      setDni(usuario.dni);
    })();
  }, [params.id]);

  const emailValido = (email) =>
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

  const guardar = async () => {
    return;
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
                onChange={handleChange}
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Fecha de nacimiento"
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
              <TextField
                label="Correo electrónico"
                type="text"
                name="email"
                value={medico.email}
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
                label="Contraseña"
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

export default ModificarMedico;
