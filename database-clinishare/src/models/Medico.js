import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Sincronizacion } from "./Sincronizacion.js";
import { Evento } from "./Evento.js";

// import { Task } from "./Task.js";

export const Medico = sequelize.define(
  "medicos",
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
    matricula: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

//relacionando con evento
Medico.hasMany(Evento,{
    foreignKey: 'medicoId',
    sourceKey: 'id'
})

Evento.belongsTo(Medico,{
    foreignKey: 'medicoId',
    targetId: 'id'
})

//relacionando con sincronizacion
Medico.hasMany(Sincronizacion,{
  foreignKey: 'medicoId',
  sourceKey: 'id'
})

Sincronizacion.belongsTo(Medico,{
  foreignKey: 'medicoId',
  targetId: 'id'
})