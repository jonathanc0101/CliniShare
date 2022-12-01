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

function RenglonOpcion({titulo, val1, val2}) {



  return (
    <>

        <Grid container direction="row" spacing={0}>
          <Grid xs={6}>
          <Typography>{titulo}</Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  name={titulo}
                />
              }
              label={val1}
              labelPlacement="start"
            />
          </Grid>
          <Grid xs={6}>
          <Typography>{titulo}</Typography>
          
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  name={titulo}
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
