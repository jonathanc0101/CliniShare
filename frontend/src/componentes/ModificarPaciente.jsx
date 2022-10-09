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
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";

function ModificarPaciente() {

  const params = useParams();
  let navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");

  const update = async () => {
    // e.preventDefault();
    await api.modificarPaciente(params.id, {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
    });
    alert("Se modificó el paciente exitosamente");
    navigate(-1);
  };

  useEffect(() => {
    (async () => {
      const res = await api.obtenerPacienteById(params.id);
      setNombre(res.nombre);
      setApellido(res.apellido);
      setDni(res.dni);
    })();
  }, [params.id]);

  return (
    <>
      <Typography component="h4" variant="h4">
        Paciente a modificar
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Card>
          <CardContent>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={4} sm={4}>
                <TextField
                  label="Nombre"
                  type="text"
                  name="nombre"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  label="Apellido"
                  type="text"
                  name="apellido"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={4} sm={4}>
                <TextField
                  label="DNI"
                  type="text"
                  name="dni"
                  margin="dense"
                  fullWidth
                  variant="outlined"
                  helperText="Campo obligatorio"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                ></TextField>
              </Grid>
            </Grid>
            <br></br>
            <Grid item xs={8}>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineTwoToneIcon />}
              >
                <Link to={"/eventos/new/paciente/" + params.id}>Agregar evento</Link>
              </Button>
            </Grid>
            <br></br>
            <Grid container direction="row" spacing={2}>
              <Grid item>
                <IconButton aria-label="save" size="large" onClick={update}>
                  <SaveIcon color="info" fontSize="inherit" />
                  <Typography color={"black"} variant="h6" align="left">
                    &nbsp;Guardar
                  </Typography>
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default ModificarPaciente;
