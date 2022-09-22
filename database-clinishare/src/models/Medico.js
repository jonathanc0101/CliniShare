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
      unique:true
    },
  },
  {
    timestamps: true,
  }
);

//relacionando con evento
Medico.hasMany(Evento,{
    foreignKey: 'medicoDni',
    sourceKey: 'dni'
})

Evento.belongsTo(Medico,{
    foreignKey: 'medicoDni',
    targetId: 'dni'
})

//relacionando con sincronizacion
Medico.hasMany(Sincronizacion,{
  foreignKey: 'medicoDni',
  sourceKey: 'dni'
})

Sincronizacion.belongsTo(Medico,{
  foreignKey: 'medicoDni',
  targetId: 'dni'
})