import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import PacienteLocal from "./PacienteASincronizar";
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
        <Grid container rowSpacing={5}>
          <Grid xs={12}>
            <Item>Sincronizar paciente</Item>
          </Grid>
        </Grid>
        <Grid container rowSpacing={5}>
          <Grid xs={6}>
            <PacienteLocal paciente={pacienteLocal} esPacienteLocal={true} ></PacienteLocal>
          </Grid>
          <Grid xs={6}>
            <PacienteLocal paciente={pacienteExterno} esPacienteLocal={false} ></PacienteLocal>
          </Grid>
        </Grid>
        <br></br>
        <BotonVolver> </BotonVolver>
      </Box>
    </>
  );
}

export default Sincronizacion;
