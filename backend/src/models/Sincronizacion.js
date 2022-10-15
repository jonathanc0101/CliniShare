import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Sincronizacion = sequelize.define("sincronizaciones",{
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
    freezeTableName: true,
    timestamps: false
});

