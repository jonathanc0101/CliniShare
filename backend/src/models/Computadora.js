import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import Sequelize from "sequelize";

export const Computadora  = sequelize.define("computadoras",{
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
},{
    freezeTableName: true,
    timestamps: false
});

