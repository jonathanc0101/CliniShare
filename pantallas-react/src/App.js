import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { CheckBox } from "@mui/icons-material";

function App() {
  const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // const [checked, setChecked] = useState(true);

  // const handleChangeCheck = (event) => {
  //   setChecked(event.target.checked);
  // };

  return (
    <div className="App">
      <header className="App-header">
        <Typography component="h2" variant="h2">
          Nuevo evento
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Card>
            <CardContent>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={4} sm={4}>
                  <TextField
                    label="Identificador"
                    type="text"
                    name="identificador"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                    label="Título"
                    type="text"
                    name="titulo"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                  ></TextField>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Fecha del evento"
                        inputFormat="MM/DD/YYYY"
                        value={value}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <hr></hr>
                <Grid item xs={3}>
                  <FormControlLabel
                    value="importante"
                    control={<Checkbox />}
                    label="Evento importante"
                  />
                </Grid>
              </Grid>
              <hr></hr>Médico N°
              <Grid container direction="row" spacing={2}>
                <Grid item xs={3} sm={3}>
                  <TextField
                    label="Nombre"
                    type="text"
                    name="nombre"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    label="Apellido"
                    type="text"
                    name="apellido"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    label="DNI"
                    type="text"
                    name="DNI"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    label="Matricula"
                    type="text"
                    name="matricula"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                  ></TextField>
                </Grid>
              </Grid>
              <hr></hr>Paciente N°
              <Grid container direction="row" spacing={2}>
                <Grid item xs={3} sm={3}>
                  <TextField
                    label="Nombre"
                    type="text"
                    name="nombre"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    label="Apellido"
                    type="text"
                    name="apellido"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                  ></TextField>
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    label="DNI"
                    type="text"
                    name="DNI"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                  ></TextField>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={12} lg={6}>
                  Descripción
                  <TextareaAutosize
                    aria-label="maximum height"
                    placeholder="Descripción"
                    style={{ width: 1249, height: 100 }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </header>
    </div>
  );
}

export default App;
