import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Menu from "../Menu/Menu";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TablePagination,
  Tooltip,
} from "@mui/material";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import MenuAppBar from "../Menu/MenuAppBar";
import SearchIcon from "@mui/icons-material/Search";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { api } from "../../API backend/api";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DescargarPDF from "../DescargarPDF";

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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pacientes.length) : 0;

  useEffect(() => {
    obtenerPacientes();
  }, []);

  const obtenerPacientes = async () => {
    const response = await api.obtenerPacientes();
    setPacientes(response.data);
  };
  return (
    <>
      <Grid container direction="row">
        <Grid item xs={10} sm={12}>
          <MenuAppBar></MenuAppBar>
        </Grid>
      </Grid>
      <br></br>
      <Grid container direction="row" spacing={2}>
      <Menu></Menu>
      {/* BUSCAR PACIENTE */}

      <Grid item xs={4} sm={4}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>{" "}
          <Box textAlign={"left"}>
            <OutlinedInput
              id="outlined-adornment-search"
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon></SearchIcon>
                </InputAdornment>
              }
              onChange={(event) => {
                setSearchPacientes(event.target.value);
              }}
              placeholder="Buscar paciente..."
            />
          </Box>
        </Grid>
      {/* BOTÓN AGREGAR PACIENTE */}
      <Grid item xs={4} sm={5.6}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <Box textAlign="right">
            <Link
              to={"/pacientes/new/"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Tooltip title="Agregar paciente">
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<AddCircleOutlineTwoToneIcon />}
                  style={{ fontWeight: "bold" }}
                >
                  Agregar paciente
                </Button>
              </Tooltip>
            </Link>
          </Box>
        </Grid>
      </Grid>

      <Grid container direction="row" spacing={2}>
      <Grid xs={2} ></Grid>

        {/* TABLA PACIENTES */}
        <Grid xs={10}>

          <TableContainer
            sx={{ maxHeight: 330, maxWidth: 1100 }}
            style={{ border: "1px solid gray" }}
          >
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      width: "20%",
                      backgroundColor: "#E9E9E9",
                      fontWeight: "bold",
                    }}
                  >
                    Nombre
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      backgroundColor: "#E9E9E9",
                      fontWeight: "bold",
                    }}
                  >
                    Apellido
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      backgroundColor: "#E9E9E9",
                      fontWeight: "bold",
                    }}
                  >
                    DNI
                  </TableCell>
                  <TableCell
                    style={{
                      width: "2%",
                      textAlign: "center",
                      backgroundColor: "#E9E9E9",
                      fontWeight: "bold",
                    }}
                  >
                    Editar
                  </TableCell>
                  <TableCell
                    style={{
                      width: "2%",
                      textAlign: "center",
                      backgroundColor: "#E9E9E9",
                      fontWeight: "bold",
                    }}
                  >
                    Ver
                  </TableCell>
                  <TableCell
                    style={{
                      width: "12%",
                      textAlign: "center",
                      backgroundColor: "#E9E9E9",
                      fontWeight: "bold",
                    }}
                  >
                    Agregar evento
                  </TableCell>
                  <TableCell
                    style={{
                      width: "0%",
                      textAlign: "center",
                      backgroundColor: "#E9E9E9",
                      fontWeight: "bold",
                    }}
                  >
                    Descargar
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pacientes
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((paciente) => (
                    <TableRow
                      key={paciente.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{paciente.nombre}</TableCell>
                      <TableCell>{paciente.apellido}</TableCell>
                      <TableCell>{paciente.dni}</TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <Link to={"/pacientes/id/" + paciente.id}>
                          <Tooltip title="Editar paciente">
                            <EditIcon color="info"></EditIcon>
                          </Tooltip>
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <Link to={"/pacientes/ver/id/" + paciente.id}>
                          <Tooltip title="Ver paciente">
                            <VisibilityIcon color="info"></VisibilityIcon>
                          </Tooltip>
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <Link to={"/eventos/new/paciente/" + paciente.id}>
                          <Tooltip title="Agregar evento">
                            <PostAddIcon color="info"></PostAddIcon>
                          </Tooltip>
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        {/* <Link to={"/pacientes/descargar/id/" + paciente.id}>
                          <Tooltip title="Descargar historia clínica">
                            <FileDownloadIcon color="info"></FileDownloadIcon>
                          </Tooltip>
                        </Link> */}
                        {/* <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                        >
                          <DescargarPDF></DescargarPDF>
                          <FileDownloadIcon />
                        </IconButton> */}
                        <DescargarPDF paciente={paciente}></DescargarPDF>
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6}></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination             sx={{ maxWidth: 1080 }}

            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={pacientes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={"Registros por página:"}
            labelDisplayedRows={() => {
              return `Registros: ${page * rowsPerPage + 1} – ${
                page * rowsPerPage + rowsPerPage
              } de ${
                pacientes.length !== -1
                  ? pacientes.length
                  : `more than ${rowsPerPage}`
              }`;
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ListadoPacientes;
