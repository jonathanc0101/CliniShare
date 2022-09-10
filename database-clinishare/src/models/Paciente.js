import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { HistoriaClinica } from "./HistoriaClinica.js";
// import { Task } from "./Task.js";

export const Paciente = sequelize.define(
  "pacientes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellido: {
      type: DataTypes.STRING,
    },
    dni: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  }
);

//relacionando con paciente
Paciente.hasOne(HistoriaClinica,{
  foreignKey: 'pacienteId',
  sourceKey: 'id'
})

HistoriaClinica.belongsTo(Paciente,{
  foreignKey: 'pacienteId',
  targetId: 'id'
})