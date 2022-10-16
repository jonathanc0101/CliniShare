import { DataTypes,Sequelize } from "sequelize";
import { sequelize } from "../database/database.js";


export const MedicoUsuario = sequelize.define(
  "medicosUsuarios",
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
      allowNull: false,
    },
    fechaModificacion: {
      //fecha de la ultima modificación por si mismo
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("now"),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  },

);

