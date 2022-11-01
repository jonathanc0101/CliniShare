import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { api } from "../../API backend/api";
import MenuAppBar from "../MenuAppBar";
import Menu from "../Menu";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ListadoMedicos() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [searchMedicos, setSearchMedicos] = useState("");
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    obtenerMedicos();
  }, []);

  const obtenerMedicos = async () => {
    const medicosObtenidos = await api.obtenerMedicos();
    setMedicos(medicosObtenidos.data);
  };

  return (
    <>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
        <Grid xs={12}>
          <Item>
            <MenuAppBar></MenuAppBar>
          </Item>
        </Grid>
      </Grid>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Menu></Menu>

        <Grid xs={10}>
          {/* <div className="App">
            <input
              type="text"
              placeholder="Search..."
              onChange={(event) => {
                setSearchMedicos(event.target.value);
              }}
            /> */}
          <div className="App-search">
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              {/* <InputLabel>Search...</InputLabel> */}

              <OutlinedInput
                id="outlined-adornment-search"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon></SearchIcon>
                  </InputAdornment>
                }
                onChange={(event) => {
                  setSearchMedicos(event.target.value);
                }}
                placeholder="Buscar..."
              />
            </FormControl>
          </div>
          <br></br>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 320, maxWidth: 1060 }}
          >
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>DNI</TableCell>
                  <TableCell>Ver</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((medico) => {
                    if (searchMedicos === "") {
                      return medico;
                    } else if (
                      medico.nombre
                        .toLowerCase()
                        .includes(searchMedicos.toLowerCase())
                    ) {
                      return medico;
                    }
                  })
                  .map((medico) => (
                    <TableRow
                      key={medico.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{medico.nombre}</TableCell>
                      <TableCell>{medico.apellido}</TableCell>
                      <TableCell>{medico.dni}</TableCell>

                      <TableCell>
                        {/* <Link to={"/medicos/ver/id/" + paciente.id}> */}
                          <VisibilityIcon color="info"></VisibilityIcon>
                        {/* </Link> */}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={medicos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ListadoMedicos;
