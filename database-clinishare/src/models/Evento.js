import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Evento = sequelize.define("evento",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo:{
        type: DataTypes.STRING,
    },
    fecha:{
        type: DataTypes.DATE,
    },
    descripcion:{
        type: DataTypes.STRING,
    },
    importante:{
        type: DataTypes.BOOLEAN,
    }
},{
    timestamps: true
});