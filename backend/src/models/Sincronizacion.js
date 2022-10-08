import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Sincronizacion = sequelize.define("sincronizacion",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
    },
},{
    timestamps: false
});

