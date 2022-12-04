import { Page, Document, Text, StyleSheet, View } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      rigth: 0,
      textAlign: "center",
      color: "grey",
    },
  },
});

const bebe = { nombre: "teodoro", apellido: "fernandez" };

const PDFFile = () => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.header}></Text>
        <Text tyle={styles.text}>PDF desde react</Text>
        <Text tyle={styles.text}>Nombre:</Text>
        <Text tyle={styles.text}>{bebe.nombre}</Text>
        <Text tyle={styles.text}>Apellido:</Text>

        <Text tyle={styles.text}>{bebe.apellido}</Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        ></Text>
      </Page>
    </Document>
  );
};

export default PDFFile;
