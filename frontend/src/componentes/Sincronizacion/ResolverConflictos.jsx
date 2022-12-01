import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../API backend/api";
import BotonVolver from "../Botones/BotonVolver";
import MenuAppBar from "../Menu/MenuAppBar";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

function ResolverConflictos() {
  const params = useParams();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [pacienteExterno, setPacienteExterno] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    fechaDefuncion: "",
    genero: "",
    sexo: "",
    telefono: "",
    direccion: "",
    email: "",
  });

  const [estadoPacienteExterno, setEstadoPacienteExterno] = useState({
    conflictoId: true,
    nombre: false,
    apellido: false,
    dni: true,
    fechaNacimiento: true,
    fechaDefuncion: false,
    genero: false,
    sexo: false,
    telefono: false,
    direccion: false,
    email: false,
    computadoraId: true,
  });

  const [pacienteResuelto, setPacienteResuelto] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    fechaDefuncion: "",
    genero: "",
    sexo: "",
    telefono: "",
    direccion: "",
    email: "",
  });

  const [pacienteLocal, setPacienteLocal] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    fechaNacimiento: "",
    fechaDefuncion: "",
    genero: "",
    sexo: "",
    telefono: "",
    direccion: "",
    email: "",
  });

  const [estadoPacienteLocal, setEstadoPacienteLocal] = useState({
    nombre: false,
    apellido: false,
    dni: false,
    fechaNacimiento: false,
    fechaDefuncion: false,
    genero: false,
    sexo: false,
    telefono: false,
    direccion: false,
    email: false,
  });

  const handleChangePacienteExterno = (event) => {
    let name = event.target.name;
    let checked = event.target.checked;
    setEstadoPacienteExterno({ ...estadoPacienteExterno, [name]: checked });
  };

  const handleChangePacienteLocal = (event) => {
    let name = event.target.name;
    let checked = event.target.checked;
    console.log("CHECKED " + event.target.checked);
    console.log("NAME " + event.target.name);
    setEstadoPacienteLocal({ ...estadoPacienteLocal, [name]: checked });
  };

  const guardar = async function () {
    // Recorre para los datos locales
    for (let atributo in estadoPacienteLocal) {
      if (estadoPacienteLocal[atributo] === true) {
        let valor = pacienteLocal[atributo];
        console.log("Valor en paciente local: \n", valor);

        setPacienteResuelto((estadoAnterior) => {
          return { ...estadoAnterior, [atributo]: valor };
        });
      }
    }
    // Recorre para los datos externos
    for (let atributo in estadoPacienteExterno) {
      if (estadoPacienteExterno[atributo] === true) {
        let valor = pacienteExterno[atributo];
        console.log("Valor en paciente externo: \n", valor);
        console.log("Atributo: \n", atributo);


        setPacienteResuelto((estadoAnterior) => {
          return { ...estadoAnterior, [atributo]: valor };
        });
      }
    }
    const respuesta = await api.resolverConflictos({pacienteResuelto});
    console.log(JSON.stringify(respuesta));
  };

  useEffect(() => {
    (async () => {
      const respuestaPacienteConflictivo = await api.obtenerPacienteConflictivo(
        params.dni
      );
      setPacienteExterno((estadoAnterior) => {
        return { ...estadoAnterior, ...respuestaPacienteConflictivo };
      });

      const respuestaPaciente = await api.obtenerPacienteByDni(params.dni);
      setPacienteLocal((estadoAnterior) => {
        return { ...estadoAnterior, ...respuestaPaciente };
      });
    })();
  }, [params.dni]);

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
            <Typography>&nbsp;&nbsp;Datos del paciente local</Typography>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Nombre:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="nombre"
                  checked={estadoPacienteLocal.nombre}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
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
                  name="apellido"
                  checked={estadoPacienteLocal.apellido}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.apellido}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">DNI:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="dni"
                  checked={estadoPacienteLocal.dni}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.dni}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Fecha de nacimiento:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="fechaNacimiento"
                  checked={estadoPacienteLocal.fechaNacimiento}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.fechaNacimiento}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Sexo:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="sexo"
                  checked={estadoPacienteLocal.sexo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.sexo}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Género:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="genero"
                  checked={estadoPacienteLocal.genero}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.genero}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Teléfono:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="telefono"
                  checked={estadoPacienteLocal.telefono}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.telefono}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Dirección:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="direccion"
                  checked={estadoPacienteLocal.direccion}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.direccion}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Correo electrónico:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="email"
                  checked={estadoPacienteLocal.email}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.email}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Fecha de defunción:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="fechaDefuncion"
                  checked={estadoPacienteLocal.fechaDefuncion}
                  control={<Checkbox />}
                  onChange={handleChangePacienteLocal}
                  label={pacienteLocal.fechaDefuncion}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid xs={6}>
            <Typography>&nbsp;&nbsp;Datos del paciente externo</Typography>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Nombre:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="nombre"
                  checked={estadoPacienteExterno.nombre}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.nombre}
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
                  name="apellido"
                  checked={estadoPacienteExterno.apellido}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.apellido}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">DNI:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="dni"
                  checked={estadoPacienteExterno.dni}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.dni}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Fecha de nacimiento:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="fechaNacimiento"
                  checked={estadoPacienteExterno.fechaNacimiento}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.fechaNacimiento}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Sexo:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="sexo"
                  checked={estadoPacienteExterno.sexo}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.sexo}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Género:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="genero"
                  checked={estadoPacienteExterno.genero}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.genero}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Teléfono:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="telefono"
                  checked={estadoPacienteExterno.telefono}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.telefono}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Dirección:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="direccion"
                  checked={estadoPacienteExterno.direccion}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.direccion}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Correo electrónico:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="email"
                  checked={estadoPacienteExterno.email}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.email}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
            <Grid container direction="row" spacing={0}>
              <FormControl>
                <FormLabel component="legend">Fecha de defunción:</FormLabel>
                <FormControlLabel
                  value="start"
                  size="small"
                  name="fechaDefuncion"
                  checked={estadoPacienteExterno.fechaDefuncion}
                  control={<Checkbox />}
                  onChange={handleChangePacienteExterno}
                  label={pacienteExterno.fechaDefuncion}
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Button onClick={guardar}>Guardar</Button>
      <hr></hr>
      <BotonVolver> </BotonVolver>
    </>
  );
}

export default ResolverConflictos;
