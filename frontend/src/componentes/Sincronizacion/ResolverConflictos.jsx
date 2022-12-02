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
    let pacienteResultado = { ...pacienteExterno };
    for (let atributo in estadoPacienteLocal) {
      if (estadoPacienteLocal[atributo] === true) {
        let valor = pacienteLocal[atributo];

        pacienteResultado[atributo] = valor;
      }
    }
    resolverConflictos(pacienteResultado);
  };

  const resolverConflictos = async function (pacienteResultado) {
    const respuesta = await api.resolverConflictos(pacienteResultado);
    console.log("RESPUESTA:", respuesta);
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

        <RenglonesOpcion
          paciente={pacienteLocal}
          conflicto={pacienteExterno}
        ></RenglonesOpcion>
      </Box>
      <Button onClick={guardar}>Guardar</Button>
      <hr></hr>
      <BotonVolver> </BotonVolver>
    </>
  );
}

export default ResolverConflictos;
