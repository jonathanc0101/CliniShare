import { Button } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "./PDFFIle";

const VerPDF = () => {
  return (
    <div>
      <PDFDownloadLink document={<PDFFile />} fileName="FORM">
        {({ loading }) =>
          loading ? (
            <Button>Loading documento...</Button>
          ) : (
            <Button>Descargar</Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default VerPDF;
