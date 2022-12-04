import { Button, IconButton } from "@mui/material";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import BotonVolver from "./Botones/BotonVolver";
import PDFFile from "./PDFFIle";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useState } from "react";

const DescargarPDF = ({ paciente }) => {
  const nombrePDF =
    "Historia clínica-" + paciente.nombre + " " + paciente.apellido;

  const [verPDF, setVerPDF] = useState(false);

  const MenuPrueba = () => {
    

  };
  return (
    <div style={{ minHeight: "100vh" }}>
      <Button
        variant="dark"
        onClick={() => {
          setVerPDF(true);
        }}
      >Ver</Button>      
      {verPDF ? (
        <PDFViewer style={{ width: "100%", height: "90vh" }}>
          <PDFFile paciente={paciente} />
        </PDFViewer>
      ) : null}
      {/* <PDFDownloadLink
        document={<PDFFile paciente={paciente} />}
        fileName={nombrePDF}
      >
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <FileDownloadIcon />
        </IconButton>
      </PDFDownloadLink> */}
    </div>
  );
};

export default DescargarPDF;
