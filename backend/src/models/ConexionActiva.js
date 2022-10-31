import { DataTypes ,Sequelize} from "sequelize";
import { sequelize } from "../database/database.js";

export const ConexionActiva = sequelize.define("conexionesActivas",{
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
    medicoId:{
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
    freezeTableName: true,
    timestamps: true
});