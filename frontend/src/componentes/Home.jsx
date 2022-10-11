import { Box} from "@mui/material";
import Menu from "./Menu";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Home() {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
          <Grid xs={12}>
          <Item>
            {/* <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button>
                <Link to="/eventos/new" className="btn btn-dark">
                  Agregar
                </Link>
              </Button>
              <Button>
                <Link to="/eventos/id" className="btn btn-dark">
                  Modificar
                </Link>
              </Button>
            </ButtonGroup> */}
          </Item>
          </Grid>
        </Grid>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Menu></Menu>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
