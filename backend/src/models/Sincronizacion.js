import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Sincronizacion = sequelize.define("sincronizacion",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha:{
        type: DataTypes.DATE,
    },
},{
    timestamps: false
});

