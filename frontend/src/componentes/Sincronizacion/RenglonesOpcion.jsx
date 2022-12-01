import React from "react";
import RenglonOpcion from "./RenglonOpcion";

function RenglonesOpcion({ paciente, conflicto }) {
  let datosProcesados = [];

  for (let atributo in paciente) {
    console.log(atributo);
    let valor = paciente[atributo];

    datosProcesados.push({
      titulo: atributo,
      val1: valor,
      val2: conflicto[atributo],
    });
  }
  return (
    <>
      {datosProcesados.map((dato) => {
        return (
          <RenglonOpcion
            titulo={dato.titulo}
            val1={dato.val1}
            val2={dato.val2}
          ></RenglonOpcion>
        );
      })}
    </>
  );
}

export default RenglonesOpcion;
