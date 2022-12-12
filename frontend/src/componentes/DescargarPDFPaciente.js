import { Button, IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { api } from "../API backend/api";
import PDFFilePaciente from "./PDFFilePaciente";

const DescargarPDFPaciente = ({ paciente, eventos }) => {
  console.log(paciente);
  // const [pacienteAux, setPacienteAux] = useState({});
  // useEffect(() => {
  //   (async () => {
  //     const pacienteRespuesta = await api.obtenerPacienteById(paciente.id);
  //     setPacienteAux((estadoAnterior) => {
  //       return { ...estadoAnterior, ...pacienteRespuesta };
  //     });
  //   })();
  // }, [paciente.id]);

  const nombrePDF =
    "Historia clínica-" + paciente.nombre + " " + paciente.apellido;

  //   console.log(pacienteAux);
  console.log(nombrePDF);
  return (
    <div>
      <PDFDownloadLink
      style={{textDecoration:"inherit"}}
        document={<PDFFilePaciente paciente={paciente} eventos={eventos} />}
        fileName={nombrePDF}
      >
        <Box textAlign={"left"}>
        <Button
          variant="contained"
          size="medium"
          style={{ fontWeight: "bold"}}
        >
          Descargar historia clínica
        </Button>
        </Box>
      </PDFDownloadLink>
    </div>
  );
};

export default DescargarPDFPaciente;
