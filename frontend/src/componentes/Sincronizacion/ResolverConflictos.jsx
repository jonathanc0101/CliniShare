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
import RenglonesOpcion from "./RenglonesOpcion";

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
    conflictoId: "",
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
    computadoraId: "",
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

  const guardar = async function () {
    resolverConflictos(pacienteResueltoAux);
  };

  const resolverConflictos = async function (p) {
    const respuesta = await api.resolverConflictos(p);
  };

  function setAtributoPacienteResuelto(atributo, valor) {

    pacienteResueltoAux[atributo] = valor;
    console.log("PACIENTE  : ", pacienteResueltoAux);
  }


  const  pacienteResueltoAux = pacienteExterno;

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

  useEffect(() => {
    // setPacienteResuelto({ ...pacienteExterno });
    console.log("AUX: ",pacienteResueltoAux);

  }, []);

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
        <RenglonesOpcion
          paciente={pacienteLocal}
          conflicto={pacienteExterno}
          setAtributoPacienteResuelto={setAtributoPacienteResuelto}
        ></RenglonesOpcion>
      </Box>
      <Button onClick={guardar}>Guardar</Button>
      <hr></hr>
      <BotonVolver> </BotonVolver>
    </>
  );
}

export default ResolverConflictos;
