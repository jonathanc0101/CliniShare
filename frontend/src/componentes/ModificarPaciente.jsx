import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { api } from "../API backend/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import EventosDePaciente from "./EventosDePaciente";
import EventosImportantes from "./EventosImportantes";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import { alertas } from "./alertas";
import moment from "moment";
import BotonVolver from "./botones/BotonVolver";
import validator from "validator";

function ModificarPaciente() {
  const params = useParams();
  let navigate = useNavigate();

  const [fechaAuxiliar, setFechaAuxiliar] = useState("");
  const [paciente, setPaciente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
  });

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, [name]: value };
    });
  };

  const handleChangeDni = (event) => {
    let value = event.target.value.replace(/\D/g, "");

    setPaciente((estadoAnterior) => {
      return { ...estadoAnterior, dni: value };
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

  const update = async () => {
    if (
      paciente.nombre.length === 0 ||
      paciente.apellido.length === 0 ||
      paciente.dni.length === 0 ||
      paciente.fechaNacimiento.length === 0
    ) {
      alertas.alertaCamposObligatorios();
      return;
    } else if (
      !validator.isDate(paciente.fechaNacimiento) &&
      paciente.fechaNacimiento !== fechaAuxiliar
    ) {
      console.log(validator.isDate(paciente.fechaNacimiento));
      alertas.fechaErronea("nacimiento");
      return;
    } else if (paciente.fechaNacimiento > moment()) {
      console.log(paciente.fechaNacimiento);
      alertas.fechaNacimientoPaciente();
    } else {
      const respuesta = await api.modificarPaciente(params.id, { ...paciente });
      if (respuesta) {
        alertas.alertaModificacionExitosa("paciente");
        navigate(-1);
      } else {
        alertas.alertaProblemas();
      }
    }
  };

  useEffect(() => {
    (async () => {
      const pacienteRespuesta = await api.obtenerPacienteById(params.id);
      setFechaAuxiliar(pacienteRespuesta.fechaNacimiento);
      setPaciente((estadoAnterior) => {
        return { ...estadoAnterior, ...pacienteRespuesta };
      });
    })();
  }, [params.id]);

  return (
    <>
      <Typography
        component="h6"
        variant="h6"
        style={{
          backgroundColor: "#0c5774",
          color: "white",
          textAlign: "left",
          fontWeight: "bold",
          lineHeight: "2",
        }}
      >
        &nbsp;&nbsp;&nbsp;Datos del paciente
      </Typography>
      <Card>
        <CardContent>
          {/* DATOS DEL PACIENTE */}
          <Grid container direction="row" spacing={2}>
            <Grid item xs={6}>
              {/* DATOS DEL PACIENTE */}
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                {/* NOMBRE */}

                <Grid item xs={4} sm={6}>
                  <TextField
                    label="Nombre"
                    type="text"
                    name="nombre"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                    value={paciente.nombre}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
                {/* APELLIDO */}
                <Grid item xs={4} sm={6}>
                  <TextField
                    label="Apellido"
                    type="text"
                    name="apellido"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                    value={paciente.apellido}
                    onChange={handleChange}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                {/* DNI */}
                <Grid item xs={4} sm={4}>
                  <TextField
                    label="DNI"
                    type="text"
                    name="dni"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                    value={paciente.dni}
                    onChange={handleChangeDni}
                  ></TextField>
                </Grid>
                {/* FECHA DE NACIMIENTO */}
                <Grid item xs={4} sm={5}>
                  <LocalizationProvider
                    adapterLocale="es"
                    dateAdapter={AdapterDayjs}
                  >
                    <DesktopDatePicker
                      label="Fecha de nacimiento"
                      name="fechaNacimiento"
                      value={paciente.fechaNacimiento}
                      onChange={handleChangeFecha}
                      maxDate={moment().toDate()}
                      renderInput={(params) => (
                        <TextField
                          margin="normal"
                          fullWidth
                          variant="outlined"
                          helperText="Campo obligatorio"
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                {/* GÉNERO */}
                {/* <Grid item xs={4} sm={3}>
                  {/* <TextField
                    disabled
                    id="outlined-select-genero-native"
                    select
                    // label="Género"
                    label="Masculino"
                    value={"Masculino"}
                    margin="normal"
                    SelectProps={{
                      native: true,
                    }}
                    helperText="Campo obligatorio"
                  > */}
                    {/* {generos.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))} */}
                  {/* </TextField> */}
                {/* </Grid> /*} */}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <br></br>
              <Grid container direction="row" justifyContent="flex-end">
                {/* EVENTOS IMPORTANTES DEL PACIENTE */}
                <Grid item xs={4} sm={12}>
                  <EventosImportantes id={params.id}></EventosImportantes>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <br></br>

          <Grid container direction="row" spacing={1}>
            <Grid item xs={4} sm={12}>
              <Box textAlign="left">
                <Link
                  to={"/eventos/new/paciente/" + params.id}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                      backgroundColor: "#007FFF",
                    }}
                    startIcon={
                      <AddCircleOutlineTwoToneIcon
                        style={{ fontSize: 24 }}
                      ></AddCircleOutlineTwoToneIcon>
                    }
                  >
                    Agregar evento
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
          <br></br>

          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={12}>
              <EventosDePaciente id={params.id} />
            </Grid>
          </Grid>

          <Grid container direction="row" spacing={2}>
            <Grid item xs={4} sm={4}>
              <BotonVolver></BotonVolver>
            </Grid>

            <Grid item xs={4} sm={4}>
              <Box textAlign="center">
                <Button
                  size="medium"
                  variant="contained"
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    backgroundColor: "#007FFF",
                  }}
                  startIcon={<SaveIcon style={{ fontSize: 24 }} />}
                  onClick={update}
                >
                  GUARDAR CAMBIOS
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default ModificarPaciente;
