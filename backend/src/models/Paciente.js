import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import {Sequelize} from "sequelize";
import { Evento } from "./Evento.js";

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
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    fechaModificacion: {
      //fecha de la ultima modificación por el medico que lo cargó
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now')
    },
  },
  {
    timestamps: false,
  }
);

//relacionando con evento
Paciente.hasMany(Evento,{
  foreignKey: 'pacienteId',
  sourceKey: 'id',
  allowNull:false,
})

Evento.belongsTo(Paciente,{
  foreignKey: 'pacienteId',
  targetId: 'id',
  allowNull:false,
})