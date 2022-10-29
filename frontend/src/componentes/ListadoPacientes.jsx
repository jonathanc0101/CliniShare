import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { api } from "../API backend/api";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Menu from "./Menu";
import { styled } from "@mui/material/styles";
import {
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  TablePagination,
} from "@mui/material";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import MenuAppBar from "./MenuAppBar";
import SearchIcon from "@mui/icons-material/Search";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ListadoPacientes() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [searchPacientes, setSearchPacientes] = useState("");
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    obtenerPacientes();
  }, []);

  const obtenerPacientes = async () => {
    const response = await api.obtenerPacientes();
    setPacientes(response.data);
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
                setSearchPacientes(event.target.value);
              }}
            /> */}
          <div className="App-search">
            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              {/* <InputLabel>Search...</InputLabel> */}

              <OutlinedInput
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon></SearchIcon>
                  </InputAdornment>
                }
                onChange={(event) => {
                  setSearchPacientes(event.target.value);
                }}
                placeholder="Buscar..."
              />
            </FormControl>
          </div>
          <br></br>

          <Link
            to={"/pacientes/new/"}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineTwoToneIcon />}
            >
              Agregar paciente
            </Button>
          </Link>
          <br></br>

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
                  <TableCell>Editar</TableCell>
                  <TableCell>Ver</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pacientes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((paciente) => {
                    if (searchPacientes === "") {
                      return paciente;
                    } else if (
                      paciente.nombre
                        .toLowerCase()
                        .includes(searchPacientes.toLowerCase())
                    ) {
                      return paciente;
                    }
                  })
                  .map((paciente) => (
                    <TableRow
                      key={paciente.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{paciente.nombre}</TableCell>
                      <TableCell>{paciente.apellido}</TableCell>
                      <TableCell>{paciente.dni}</TableCell>
                      <TableCell component="th" scope="row">
                        <Link to={"/pacientes/id/" + paciente.id}>
                          <EditIcon color="info"></EditIcon>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={"/pacientes/ver/id/" + paciente.id}>
                          <VisibilityIcon color="info"></VisibilityIcon>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={pacientes.length}
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

export default ListadoPacientes;
