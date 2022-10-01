import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Evento } from "./Evento.js";
// import { Task } from "./Task.js";

export const HistoriaClinica = sequelize.define(
  "historiasClinicas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: true,
  }
);

//relacionando con evento
HistoriaClinica.hasMany(Evento,{
  foreignKey: 'historiaClinicaId',
  sourceKey: 'id'
})

Evento.belongsTo(HistoriaClinica,{
  foreignKey: 'historiaClinicaId',
  targetId: 'id'
})