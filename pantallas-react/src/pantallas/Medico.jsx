import React from "react";

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
  import "../App.css";
  import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
  import dayjs from "dayjs";
  import Stack from "@mui/material/Stack";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { useState } from "react";
  import { CheckBox } from "@mui/icons-material"


function Medico() {

    const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));

    const handleChange = (newValue) => {
      setValue(newValue);
    };
  
  return (
    <>
        <Typography component="h2" variant="h2">
          Nuevo Paciente
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Card>
            <CardContent>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={4} sm={4}>
                  <TextField
                    label="Nombre"
                    type="text"
                    name="Nombre"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                  ></TextField>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <TextField
                    label="Apellido"
                    type="text"
                    name="Apellido"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                  ></TextField>
                </Grid>
                <Grid item xs={4} sm={4}>
                <TextField
                    label="DNI"
                    type="text"
                    name="DNI"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    helperText="Campo obligatorio"
                  ></TextField>
                </Grid>
              </Grid>
            
            </CardContent>
          </Card>
        </Box>
    </>
  )
}

export default Medico