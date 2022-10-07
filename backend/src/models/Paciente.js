import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { HistoriaClinica } from "./HistoriaClinica.js";
import {Sequelize} from "sequelize";

export const Paciente = sequelize.define(
  "pacientes",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellido: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.STRING,
      unique: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fechaModificacion: {
      //fecha de la ultima modificación por el medico que lo cargó
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now')
    },
  },
  {
    timestamps: true,
  }
);

//relacionando con paciente
Paciente.hasOne(HistoriaClinica, {
  foreignKey: "pacienteDni",
  sourceKey: "dni",
});

HistoriaClinica.belongsTo(Paciente, {
  foreignKey: "pacienteDni",
  targetId: "dni",
});
