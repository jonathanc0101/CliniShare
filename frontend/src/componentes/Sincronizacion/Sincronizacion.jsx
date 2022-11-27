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
  const [pacienteLocal, setPacienteLocal] = useState({
    id: "",
    nombre: "",
    apellido: "",
    dni: "",
  });
  const [pacienteExterno, setPacienteExterno] = useState({
    id: "",
    nombre: "",
    apellido: "",
    dni: "",
  });

  const [estadoPacienteLocal, setEstadoPacienteLocal] = useState([
    { id: "", idNuevo: false },
    { nombre: "", nombreNuevo: false },
    { apellido: "", apellidoNuevo: false },
    { dni: "", dniNuevo: false },
  ]);

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
    { id: "1", nombre: "Nicole", apellido: "Alvarado", dni: "43032135" },
    { id: "2", nombre: "Gianella", apellido: "Zeballos", dni: "43036123" },
    { id: "3", nombre: "Teodoro", apellido: "Fernández", dni: "41238023" },
    { id: "4", nombre: "Ismael", apellido: "Cruz", dni: "40026199" },
  ];

  const pacientesOtrosData = [
    {
      id: "1",
      nombre: "Nicol",
      apellido: "Alvarado Rodriguez",
      dni: "43032135",
    },
    { id: "2", nombre: "Yanela", apellido: "Zeballos", dni: "43036123" },
    { id: "3", nombre: "Teo", apellido: "Fernandez", dni: "41238023" },
    { id: "4", nombre: "Ismael Teo", apellido: "Cruz", dni: "40026199" },
  ];

  const handleChangePacienteLocal = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setPacienteLocal((estadoAnterior) => {
      return { ...estadoAnterior, [name]: value };
    });
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
      return { ...estadoAnterior, ...pacienteLocal };
    });
  };

  const obtenerPacienteExterno = () => {
    const pacienteExterno = pacientesOtrosData.find(
      (element) => element.id === params.id
    );
    setPacienteExterno((estadoAnterior) => {
      return { ...estadoAnterior, ...pacienteExterno };
    });
  };
  useEffect(() => {
    (async () => {
      obtenerPacienteLocal();
      obtenerPacienteExterno();
      // var datosDelPaciente = pacienteLocal.map(function(e, i) {
      //   return [e, estado[i]];
      // });

      console.log(estadoPacienteLocal);
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
              {/* <InputLabel>&nbsp;&nbsp;Nombre</InputLabel> */}

              {/* <OutlinedInput
                id="outlined-paciente-local-nombre"
                type="text"
                value={pacienteLocal.nombre}
                onChange={handleChangePacienteLocal}
                size="small"
                fullWidth
                margin="none"
              /> */}
              <FormControl>
                <FormLabel component="legend">Nombre:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="nombrePacienteLocal"
                  checked={pacienteLocal.nombreNuevo}
                  onChange={handleChangePacienteLocal}
                  control={<Checkbox />}
                  label={pacienteLocal.nombre}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <InputLabel>&nbsp;&nbsp;Apellido</InputLabel>
              <OutlinedInput
                id="outlined-paciente-local-apellido"
                type="text"
                value={pacienteLocal.apellido}
                onChange={handleChangePacienteLocal}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid container direction="row" spacing={0} columnSpacing={1}>
              <Grid item xs={6}>
                <InputLabel>&nbsp;&nbsp;DNI</InputLabel>
                <OutlinedInput
                  id="outlined-paciente-local-dni"
                  type="text"
                  value={pacienteLocal.dni}
                  onChange={handleChangePacienteLocal}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>&nbsp;&nbsp;Fecha de nacimiento</InputLabel>
                <OutlinedInput
                  id="outlined-pacienteLocal-fechaDeNacimiento"
                  type="text"
                  // value={pacienteASincronizar.apellido}
                  // onChange={handleChangePacienteLocal}
                  size="small"
                  fullWidth
                />
              </Grid>
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
