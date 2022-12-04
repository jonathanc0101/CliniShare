import { Page, Document, Text, StyleSheet, View } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { api } from "../API backend/api";

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

const stylesTable = StyleSheet.create({
  table: {
    width: "100%",
    border: "1px solid",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    borderTop: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  // So Declarative and unDRY 👌
  row1: {
    width: "30%",
    border: "1px solid",
  },
  row2: {
    width: "30%",
    border: "1px solid",
  },
  row3: {
    width: "30%",
    border: "1px solid",
  },
  row4: {
    width: "20%",
    border: "1px solid",
  },
  row5: {
    width: "27%",
    border: "1px solid",
  },
});

const PDFFile = ({ paciente }) => {
  console.log("PACIENTE en PDF: ", paciente);

  // let eventos = [];
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const obtenerEventosPorPacienteId = async () => {
      const response = await api.obtenerEventosCompletosPorPacienteId(
        paciente.id
      );

      if (response.data.length !== 0) {
        setEventos(response.data);
      }
    };
    obtenerEventosPorPacienteId();
  }, [paciente.id]);

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.header}></Text>
        <Text style={styles.text}>Datos del paciente:</Text>
        <Text style={styles.text}>Nombre:&nbsp;{paciente.nombre}</Text>
        <Text style={styles.text}>Apellido:&nbsp;{paciente.apellido}</Text>
        <Text style={styles.text}>Nro de documento:&nbsp;{paciente.dni}</Text>
        <Text style={styles.text}>
          Fecha de nacimiento:&nbsp;{paciente.fechaNacimiento}
        </Text>

        <View style={stylesTable.table}>
          <View style={[stylesTable.row, stylesTable.bold, stylesTable.header]}>
            <Text style={stylesTable.row1}>Título</Text>
            <Text style={stylesTable.row2}>Descripción</Text>
            <Text style={stylesTable.row3}>Fecha</Text>
          </View>
          {eventos.map((row, i) => (
            <View key={i} style={stylesTable.row} wrap={false}>
              <Text style={stylesTable.row1}>{row.titulo}</Text>
              <Text style={stylesTable.row2}>{row.descripcion}</Text>
              <Text style={stylesTable.row3}>{row.fecha}</Text>
            </View>
          ))}
        </View>
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
