import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import PacienteASincronizar from "./PacienteASincronizar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BotonVolver from "../Botones/BotonVolver";
import MenuAppBar from "../Menu/MenuAppBar";

function Sincronizacion() {
  const params = useParams();

  const [pacienteExterno, setPacienteExterno] = useState({
    datos: {
      id: "",
      nombre: "",
      apellido: "",
      dni: "",
      fechaNacimiento: "",
      telefono: "",
      domicilio: "",
      genero: "",
      sexo: "",
    },
    validez: {
      idNuevo: false,
      nombreNuevo: false,
      apellidoNuevo: false,
      dniNuevo: false,
      fechaNacimientoNuevo: false,
      telefonoNuevo: false,
      domicilioNuevo: false,
      generoNuevo: false,
      sexoNuevo: false,
    },
  });

  const [pacienteLocal, setPacienteLocal] = useState({
    datos: {
      id: "",
      nombre: "",
      apellido: "",
      dni: "",
      fechaNacimiento: "",
      telefono: "",
      domicilio: "",
      genero: "",
      sexo: "",
    },
    validez: {
      idNuevo: false,
      nombreNuevo: true,
      apellidoNuevo: false,
      dniNuevo: false,
      fechaNacimientoNuevo: false,
      telefonoNuevo: false,
      domicilioNuevo: false,
      generoNuevo: false,
      sexoNuevo: false,
    },
  });

  const [pacienteActualizado, setPacienteActualizado] = useState({});

  const [pacienteChecks, setPacienteChecks] = useState({});
  const recibirPaciente = (paciente) => {
    setPacienteActualizado((estadoAnterior) => {
      return { ...estadoAnterior, ...paciente };
    });
  };

  const actualizarPaciente = () => {
    // // setPacienteActualizado((estadoAnterior) => {
    // //   return { ...estadoAnterior, ...paciente };
    // // });
  };

  const pacientesLocalesData = [
    {
      id: "1",
      nombre: "Nicole",
      apellido: "Alvarado",
      dni: "43032135",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "2",
      nombre: "Gianella",
      apellido: "Zeballos",
      dni: "43036123",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "3",
      nombre: "Teodoro",
      apellido: "Fernández",
      dni: "41238023",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "4",
      nombre: "Ismael",
      apellido: "Cruz",
      dni: "40026199",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
  ];

  const pacientesOtrosData = [
    {
      id: "1",
      nombre: "Nicol",
      apellido: "Alvarado Rodriguez",
      dni: "43032135",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "2",
      nombre: "Yanela",
      apellido: "Zeballos",
      dni: "43036123",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "3",
      nombre: "Teo",
      apellido: "Fernandez",
      dni: "41238023",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
    {
      id: "4",
      nombre: "Ismael Teo",
      apellido: "Cruz",
      dni: "40026199",
      fechaNacimiento: "13-02-2001",
      telefono: "4458572",
      domicilio: "domicilio",
      genero: "test",
      sexo: "depende",
    },
  ];

  const handleChangePacienteLocal = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    // setPacienteLocal((estadoAnterior) => {
    //   return { ...estadoAnterior, [name]: value };
    // });
  };

  const handleChangePacienteExterno = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setPacienteExterno((estadoAnterior) => {
      return { ...estadoAnterior, [name]: value };
    });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const obtenerPacienteLocal = () => {
    const pacienteLocal = pacientesLocalesData.find(
      (element) => element.id === params.id
    );
    setPacienteLocal((estadoAnterior) => {
      console.log(estadoAnterior);
      return { ...estadoAnterior, ...pacienteLocal };
    });
  };

  const obtenerPacienteExterno = () => {
    const pacienteExterno = pacientesOtrosData.find(
      (element) => element.id === params.id
    );
    setPacienteExterno((estadoAnterior) => {
      console.log(estadoAnterior);
      return { ...estadoAnterior, ...pacienteExterno };
    });
  };
  useEffect(() => {
    (async () => {
      obtenerPacienteLocal();
      obtenerPacienteExterno();
    })();
  }, [params.id]);
  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "auto" }}>
        <Grid container direction="row">
          <Grid item xs={4} sm={12}>
            <MenuAppBar></MenuAppBar>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Item>Conflictos en datos del paciente</Item>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid xs={6}>
            <Typography>&nbsp;&nbsp;Datos del paciente localmente</Typography>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Nombre:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="nombrePacienteLocal"
                  checked={pacienteLocal.validez.nombreNuevo}
                  control={<Checkbox />}
                  label={pacienteLocal.nombre}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Apellido:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="apellidoPacienteLocal"
                  checked={pacienteLocal.validez.apellidoNuevo}
                  control={<Checkbox />}
                  label={pacienteLocal.apellido}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0} columnSpacing={1}>
              <Grid item xs={6}>
                <FormControl>
                  <FormLabel component="legend">DNI:</FormLabel>
                  <FormControlLabel
                    value="start"
                    size="small"
                    name="dniPacienteLocal"
                    checked={pacienteLocal.validez.dniNuevo}
                    control={<Checkbox />}
                    label={pacienteLocal.dni}
                    labelPlacement="start"
                  />
                </FormControl>
              </Grid>
              {/* <Grid item xs={6}>
                <FormControl>
                  <FormLabel component="legend">Fecha de nacimiento:</FormLabel>
                  <FormControlLabel
                    value="start"
                    size="small"
                    name="fechaDeNacimientoPacienteLocal"
                    checked={pacienteLocal.validez.fechaNacimientoNuevo}
                    control={<Checkbox />}
                    label={pacienteLocal.fechaNacimiento}
                    labelPlacement="start"
                  />
                </FormControl>
              </Grid> */}
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Fecha de nacimiento:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="fechaDeNacimientoPacienteLocal"
                  checked={pacienteLocal.validez.fechaNacimientoNuevo}
                  control={<Checkbox />}
                  label={pacienteLocal.fechaNacimiento}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0} columnSpacing={1}>
              <Grid item xs={6}>
                <InputLabel>&nbsp;&nbsp;Sexo</InputLabel>
                <OutlinedInput
                  id="outlined-pacienteLocal-sexo"
                  type="text"
                  // value={pacienteASincronizar.apellido}
                  // onChange={handleChangePacienteLocal}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>&nbsp;&nbsp;Género</InputLabel>
                <OutlinedInput
                  id="outlined-pacienteLocal-genero"
                  type="text"
                  // value={pacienteASincronizar.apellido}
                  // onChange={handleChangePacienteLocal}
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <InputLabel>&nbsp;&nbsp;Domicilio</InputLabel>
              <OutlinedInput
                id="outlined-pacienteLocal-domicilio"
                type="text"
                // value={pacienteASincronizar.apellido}
                // onChange={handleChangePacienteLocal}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid container direction="row" spacing={0}>
              <InputLabel>&nbsp;&nbsp;Teléfono</InputLabel>
              <OutlinedInput
                id="outlined-pacienteLocal-telefono"
                type="text"
                // value={pacienteASincronizar.apellido}
                // onChange={handleChangePacienteLocal}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid xs={6}>
            <Typography>&nbsp;&nbsp;Datos del paciente externo</Typography>
            <Grid container direction="row" spacing={0}>
              <InputLabel>&nbsp;&nbsp;Nombre</InputLabel>
              <OutlinedInput
                id="outlined-paciente-externo-nombre"
                type="text"
                value={pacienteExterno.nombre}
                onChange={handleChangePacienteExterno}
                size="small"
                fullWidth
                margin="none"
              />
            </Grid>
            {/* <FormControlLabel
                size="small"
                name="nombre"
                checked={paciente.nombre}
                onChange={handleChange}
                control={<Checkbox />}
                label="Nombre"
              /> */}
            <Grid container direction="row" spacing={0}>
              <InputLabel>&nbsp;&nbsp;Apellido</InputLabel>
              <OutlinedInput
                id="outlined-paciente-externo-apellido"
                type="text"
                value={pacienteExterno.apellido}
                onChange={handleChangePacienteExterno}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid container direction="row" spacing={0} columnSpacing={1}>
              <Grid item xs={6}>
                <InputLabel>&nbsp;&nbsp;DNI</InputLabel>
                <OutlinedInput
                  id="outlined-paciente-externo-dni"
                  type="text"
                  value={pacienteExterno.dni}
                  onChange={handleChangePacienteExterno}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>&nbsp;&nbsp;Fecha de nacimiento</InputLabel>
                <OutlinedInput
                  id="outlined-paciente-externo-fechaDeNacimiento"
                  type="text"
                  // value={pacienteASincronizar.apellido}
                  // onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={0} columnSpacing={1}>
              <Grid item xs={6}>
                <InputLabel>&nbsp;&nbsp;Sexo</InputLabel>
                <OutlinedInput
                  id="outlined-paciente-externo-sexo"
                  type="text"
                  // value={pacienteASincronizar.apellido}
                  // onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>&nbsp;&nbsp;Género</InputLabel>
                <OutlinedInput
                  id="outlined-paciente-externo-genero"
                  type="text"
                  // value={pacienteASincronizar.apellido}
                  // onChange={handleChange}
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <InputLabel>&nbsp;&nbsp;Domicilio</InputLabel>
              <OutlinedInput
                id="outlined-paciente-externo-domicilio"
                type="text"
                // value={pacienteASincronizar.apellido}
                // onChange={handleChange}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid container direction="row" spacing={0}>
              <InputLabel>&nbsp;&nbsp;Teléfono</InputLabel>
              <OutlinedInput
                id="outlined-paciente-externo-telefono"
                type="text"
                // value={pacienteASincronizar.apellido}
                // onChange={handleChange}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <br></br>
        <BotonVolver> </BotonVolver>
        <br></br>
        <br></br>
        <Button variant="outlined" onClick={actualizarPaciente}>
          Actualizar
        </Button>
      </Box>
    </>
  );
}

export default Sincronizacion;
