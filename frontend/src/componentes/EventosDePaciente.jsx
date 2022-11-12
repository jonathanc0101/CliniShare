import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { api } from "../API backend/api";
import Grid from "@mui/material/Unstable_Grid2";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { TablePagination } from "@mui/material";
import EditOffIcon from "@mui/icons-material/EditOff";

function EventosDePaciente(params) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [eventos, setEventos] = useState([]);
  const [eventosVacios, setEventosVacios] = useState(false);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - eventos.length) : 0;

  const usuario = JSON.parse(
    window.localStorage.getItem("loggedCliniShareAppUser")
  );

  const formatearFecha = (fechaDeEvento) => {
    let fecha = new Date(fechaDeEvento);
    let dia = `${fecha.getDate()}`.padStart(2, "0");
    let mes = `${fecha.getMonth() + 1}`.padStart(2, "0");
    let anio = fecha.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    return fechaFormateada;
  };

  useEffect(() => {
    const obtenerEventosPorPacienteId = async () => {
      const response = await api.obtenerEventosCompletosPorPacienteId(
        params.id
      );

      if (response.data.length !== 0) {
        setEventos(response.data);
      } else {
        setEventosVacios(true);
      }
    };
    obtenerEventosPorPacienteId();
  }, [params.id]);

  return (
    <>
      {eventos?.length ? (
        <Grid>
          <TableContainer
            sx={{ maxHeight: 248, maxWidth: 1360 }}
            style={{ border: "1px solid #0c5774" }}
          >
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      width: "2%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                    align="center"
                  >
                    Importante
                  </TableCell>
                  <TableCell
                    style={{
                      width: "20%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Título
                  </TableCell>
                  <TableCell
                    style={{
                      width: "8%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Fecha
                  </TableCell>
                  <TableCell
                    style={{
                      width: "30%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Descripción
                  </TableCell>
                  <TableCell
                    style={{
                      width: "15%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Médico
                  </TableCell>
                  <TableCell
                    style={{
                      width: "2%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                    align="center"
                  >
                    Editar
                  </TableCell>
                  <TableCell
                    style={{
                      width: "2%",
                      backgroundColor: "#0c5774",
                      fontWeight: "bold",
                      color: "white",
                    }}
                    align="center"
                  >
                    Ver
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventos
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((evento) => (
                    <TableRow
                      key={evento.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        {evento.importante ? (
                          <CheckCircleOutlineRoundedIcon></CheckCircleOutlineRoundedIcon>
                        ) : (
                          "No"
                        )}
                      </TableCell>
                      <TableCell>{evento.titulo}</TableCell>
                      <TableCell>{formatearFecha(evento.fecha)}</TableCell>
                      <TableCell>{evento.descripcion}</TableCell>
                      <TableCell>
                        {evento.medico.nombre} {evento.medico.apellido}
                      </TableCell>

                      {evento.medico.id === usuario.medico.medicoId ? (
                        <TableCell align="center" component="th" scope="row">
                          <Link to={"/eventos/id/" + evento.id}>
                            <EditIcon color="info"></EditIcon>
                          </Link>
                        </TableCell>
                      ) : (
                        <TableCell align="center" component="th" scope="row">
                          <EditOffIcon color="disabled"></EditOffIcon>
                        </TableCell>
                      )}

                      <TableCell align="center" component="th" scope="row">
                        <Link to={"/eventos/ver/id/" + evento.id}>
                          <VisibilityIcon color="info"></VisibilityIcon>
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
          <TablePagination
            size="small"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={eventos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      ) : (
        <>
          <p style={{ color: "GrayText" }}>No hay ningún evento</p>
          <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </>
      )}
    </>
  );
}

export default EventosDePaciente;
