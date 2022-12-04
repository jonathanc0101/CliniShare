import { Button, IconButton } from "@mui/material";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import BotonVolver from "./Botones/BotonVolver";
import PDFFile from "./PDFFIle";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const DescargarPDF = ({ paciente }) => {
  return ( 
    <div>
 
      <PDFDownloadLink document={<PDFFile paciente={paciente} />} fileName="FORM">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <FileDownloadIcon />
        </IconButton>
      </PDFDownloadLink>
    </div>
  );
};

export default DescargarPDF;
