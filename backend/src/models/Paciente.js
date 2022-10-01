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
      type: DataTypes.STRING,
      unique:true
    },
    activo:{
      type: DataTypes.BOOLEAN,
      defaultValue:true,
    }
  },
  {
    timestamps: true,
  }
);

//relacionando con paciente
Paciente.hasOne(HistoriaClinica,{
  foreignKey: 'pacienteDni',
  sourceKey: 'dni'
})

HistoriaClinica.belongsTo(Paciente,{
  foreignKey: 'pacienteDni',
  targetId: 'dni'
})