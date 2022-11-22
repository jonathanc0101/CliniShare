import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function Sincronizacion() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={5}>
          <Grid xs={12}>
            <Item>1</Item>
          </Grid>
        </Grid>
        <Grid container rowSpacing={5}>
          <Grid xs={6}>
            <Paper square={true}>
              <Item>2</Item>
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper square={true}>
              <Item>3</Item>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Sincronizacion;
