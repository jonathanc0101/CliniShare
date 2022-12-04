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
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "Times-Roman",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
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
    padding: 0,
  },
  header: {
    borderTop: "none",
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    padding: 0,
  },
  encabezado: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    width: "30%",
    fontWeight: "bold",
    padding: 0,
  },
  rowImportante: {
    width: "2%",
    border: "1px solid",
    margin: 14,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowTitulo: {
    width: "20%",
    border: "1px solid",
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowFecha: {
    width: "8%",
    border: "1px solid",
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowFechaVencimiento: {
    width: "8%",
    border: "1px solid",
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowDescripcion: {
    width: "30%",
    border: "1px solid",
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
  rowMedico: {
    width: "15%",
    border: "1px solid",
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    lineHeight: "0",
  },
});

const PDFFile = ({ paciente }) => {
  const formatearFecha = (fechaNacimiento) => {
    let fecha = new Date(fechaNacimiento);
    let dia = `${fecha.getDate()}`.padStart(2, "0");
    let mes = `${fecha.getMonth() + 1}`.padStart(2, "0");
    let anio = fecha.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    return fechaFormateada;
  };

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
        <Text style={styles.header}>Datos del paciente:</Text>
        <Text style={styles.text}>Nombre:&nbsp;{paciente.nombre}</Text>
        <Text style={styles.text}>Apellido:&nbsp;{paciente.apellido}</Text>
        <Text style={styles.text}>Nro de documento:&nbsp;{paciente.dni}</Text>
        <Text style={styles.text}>
          Fecha de nacimiento:&nbsp;{formatearFecha(paciente.fechaNacimiento)}
        </Text>

        <Text style={styles.header}>Historia clínica:</Text>
        <View style={stylesTable.table}>
          <View style={stylesTable.row}>
            <Text style={stylesTable.rowTitulo}>Título</Text>
            <Text style={stylesTable.rowFecha}>Fecha</Text>
            <Text style={stylesTable.rowDescripcion}>Descripción</Text>
            <Text style={stylesTable.rowMedico}>Médico</Text>
          </View>
          {eventos.map((row, i) => (
            <View key={i} style={stylesTable.row} wrap={false}>
              {/* <Text style={stylesTable.rowImportante}>
                {row.importante ? "Si" : "NO"}
              </Text> */}
              <Text style={stylesTable.rowTitulo}>{row.titulo}</Text>
              <Text style={stylesTable.rowFecha}>
                {formatearFecha(row.fecha)}
              </Text>
              {/* <Text style={stylesTable.rowFechaVencimiento}>
                {row.fechaVencimiento !== null
                  ? formatearFecha(row.fechaVencimiento)
                  : "Sin fecha"}
              </Text> */}
              <Text style={stylesTable.rowDescripcion}>{row.descripcion}</Text>
              <Text style={stylesTable.rowMedico}>
                {row.medico.nombre} {row.medico.apellido}
              </Text>
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
