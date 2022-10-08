import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Sincronizacion } from "./Sincronizacion.js";
import { Evento } from "./Evento.js";
import {Sequelize} from "sequelize";
import {Paciente} from "./Paciente.js";

export const Medico = sequelize.define(
  "medicos",
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
    matricula: {
      type: DataTypes.STRING,
      unique: true,
    },
    fechaModificacion: {
      //fecha de la ultima modificación por si mismo
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now')
    },
  },

  {
    timestamps: true,
  }
);

//ownership de paciente
Medico.hasMany(Paciente, {
  foreignKey: "ownerId",
  sourceKey: "id",
});

Paciente.belongsTo(Medico,{
  foreignKey: "ownerId",
  sourceKey: "id",
});

//relacionando con evento
Medico.hasMany(Evento, {
  foreignKey: "medicoId",
  sourceKey: "id",
});

Evento.belongsTo(Medico, {
  foreignKey: "medicoId",
  targetId: "id",
});

//relacionando con sincronizacion
Medico.hasMany(Sincronizacion, {
  foreignKey: "medicoId",
  sourceKey: "id",
});

Sincronizacion.belongsTo(Medico, {
  foreignKey: "medicoId",
  targetId: "id",
});
