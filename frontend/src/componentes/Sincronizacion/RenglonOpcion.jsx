import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Input,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useState } from "react";

function RenglonOpcion({ titulo, val1, val2, setAtributoPacienteResuelto }) {
  const [checkedPacienteInterno, setChekedPacienteInterno] = useState({
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
  });
  const [checkedPacienteExterno, setChekedPacienteExterno] = useState({
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

  function capitalizarTitulo(titulo) {
    if (titulo === "dni") {
      return titulo.toUpperCase() + ":";
    } else if (titulo === "genero") {
      return "Género:";
    } else if (titulo === "fechaNacimiento") {
      return "Fecha de nacimiento:";
    } else if (titulo === "fechaDefuncion") {
      return "Fecha de defunción:";
    } else if (titulo === "Teléfono") {
      return "Teléfono";
    } else if (titulo === "email") {
      return "Correo electrónico:";
    } else {
      return titulo.charAt(0).toUpperCase() + titulo.slice(1) + ":";
    }
  }

  const handleChangePacienteInterno = (event) => {
    let checked = event.target.checked;
    setChekedPacienteInterno({ ...checkedPacienteInterno, [titulo]: checked });
    if (checked == true) {
      setAtributoPacienteResuelto(titulo, val1);

      setChekedPacienteExterno({ ...checkedPacienteInterno, [titulo]: false });
    }
  };

  const handleChangePacienteExterno = (event) => {
    let checked = event.target.checked;
    setChekedPacienteExterno({ ...checkedPacienteExterno, [titulo]: checked });
    if (checked == true) {
      setAtributoPacienteResuelto(titulo, val2);

      setChekedPacienteInterno({ ...checkedPacienteInterno, [titulo]: false });
    }
  };

  return (
    <>
      <Grid container direction="row" spacing={0}>
        <Grid xs={6}>
          <Typography>{capitalizarTitulo(titulo)}</Typography>

          <FormControlLabel
            // disabled={checkedPacienteExterno[titulo] ? true : false}
            control={
              <Checkbox
                checked={checkedPacienteInterno[titulo]}
                onChange={handleChangePacienteInterno}
                name={capitalizarTitulo(titulo)}
              />
            }
            label={val1}
            labelPlacement="start"
          />
        </Grid>
        <Grid xs={6}>
          <Typography>{capitalizarTitulo(titulo)}</Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={checkedPacienteExterno[titulo]}
                onChange={handleChangePacienteExterno}
                name={capitalizarTitulo(titulo)}
              />
            }
            label={val2}
            labelPlacement="start"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default RenglonOpcion;
