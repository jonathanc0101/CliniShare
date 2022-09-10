import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    "clinisharedb", 
    "clinishare", 
    "password", 
    {
    host: "localhost",
    dialect: "postgres",
    }
);
