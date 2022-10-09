import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import {Sequelize} from "sequelize";

export const ConexionActiva = sequelize.define("conexionActiva",{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    nombreUsuario:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    idMedico:{
        type: Sequelize.UUID,
        allowNull: false,
    },
    ip:{
        type: DataTypes.STRING,
        allowNull: false
    },
    activa:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    timestamps: true
});