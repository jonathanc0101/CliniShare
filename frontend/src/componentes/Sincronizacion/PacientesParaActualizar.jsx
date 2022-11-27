import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import MenuAppBar from "../Menu/MenuAppBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import BotonVolver from "../Botones/BotonVolver";

function PacientesParaActualizar() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [pacientesAActualizar, setPacientesAActualizar] = useState([
    { id:"", nombre: "", apellido: "", dni: "" },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - pacientesAActualizar.length)
      : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const pacientesData = [
      { id: "1", nombre: "Nicole", apellido: "Alvarado", dni: "43032135" },
      { id: "2", nombre: "Gianella", apellido: "Zeballos", dni: "43036123" },
      { id: "3", nombre: "Teodoro", apellido: "Fernández", dni: "41238023" },
      { id: "4", nombre: "Ismael", apellido: "Cruz", dni: "40026199" },
    ];
    setPacientesAActualizar(pacientesData);
  }, []);

  return (
    <>
      <Grid container direction="row">
        <Grid item xs={4} sm={12}>
          <MenuAppBar></MenuAppBar>
        </Grid>
      </Grid>
      <br></br>
      <Grid container direction="row" spacing={2} justifyContent={"center"}>
        {/* TABLA PACIENTES */}
        <TableContainer
          sx={{ maxWidth: "100%", height: "auto" }}
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
                    width: "4%",
                    textAlign: "center",
                    backgroundColor: "#E9E9E9",
                    fontWeight: "bold",
                  }}
                >
                  Ver datos
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pacientesAActualizar
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
                    <TableCell align="center">
                      <Link to={"/sincronizacion/paciente/" + paciente.id}>
                      <Tooltip title="Ver datos">
                        <VisibilityIcon color="info"></VisibilityIcon>
                      </Tooltip>
                      </Link>
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
      </Grid>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={pacientesAActualizar.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Registros por página:"}
        labelDisplayedRows={() => {
          return `Registros: ${page * rowsPerPage + 1} – ${
            page * rowsPerPage + rowsPerPage
          } de ${
            pacientesAActualizar.length !== -1
              ? pacientesAActualizar.length
              : `more than ${rowsPerPage}`
          }`;
        }}
      />
      <BotonVolver></BotonVolver>
    </>
  );
}

export default PacientesParaActualizar;
